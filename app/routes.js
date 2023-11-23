//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

require("./routes-history")
const tdrSettings = require("./data/settings.json")

const closureMetadataSummaryExampleData = require("./data/closure-metadata-summary-example-01.json");
const descriptiveMetadataSummaryExampleData = require("./data/descriptive-metadata-summary-example-01.json");
// const genericMetadata = require("./data/generic-metadata-consignment.json");
const genericMetadata = require("./data/generic-metadata-1000-plus-consignment.json");

const requireClosureFields = [
  "addClosure-foi-asserted-day",
  "addClosure-foi-asserted-month",
  "addClosure-foi-asserted-year",
  "addClosure-closure-start-day",
  "addClosure-closure-start-month",
  "addClosure-closure-start-year",
  "addClosure-closure-period",
  "addClosure-foi_id_selection",
  "addClosure-is-the-description-sensitive",
  "addClosure-is-the-title-sensitive",
];

const hasDescription = function (files, descriptiveFiles) {
  if (descriptiveFiles === undefined) return false;
  return Array.from(files).every((fileIndex) => {
    return (
      descriptiveFiles[fileIndex] &&
      descriptiveFiles[fileIndex]["addDescriptive-description"] &&
      descriptiveFiles[fileIndex]["addDescriptive-description"] !== ""
    );
  });
};

const populateWithDescriptive = (req, res) => {
  const selected = req.session.data["file-selection"];
  let descriptive = req.session.data["descriptiveFiles"];

  descriptive = clearEmpties(descriptive);
  let hasDescriptive = descriptive.hasOwnProperty(selected[0]);

  let notMatching = selected.some((selectedFile1) => {
    return selected.some((selectedFile2) => {
      // If any are not indentical
      return (
        JSON.stringify(descriptive[selectedFile1]) !==
        JSON.stringify(descriptive[selectedFile2])
      );
    });
  });

  // Clear form data so it does not prepopulate
  for (let key in req.session.data) {
    if (key.split("-")[0] === "addDescriptive") {
      delete req.session.data[key];
    }
  }
  if (notMatching == true) {
    req.session.data.error = "not-matching";
  } else {
    // Populate the fields data with stored.
    for (var key in descriptive[selected[0]]) {
      req.session.data[key] = descriptive[selected[0]][key];
    }
    req.session.data.status = hasDescriptive ? "has-data" : "no-data";

    delete req.session.data.error;
  }
};

const clearEmpties = (files) => {
  if (files === undefined) return {};

  for (const [fileKey, file] of Object.entries(files)) {
    for (const [fieldKey, fieldValue] of Object.entries(file)) {
      if (file[fieldKey] == "") {
        delete file[fieldKey];
      }
    }
  }

  return files;
};

const addNewClosure = (req, res) => {
  const selected = req.session.data["file-selection"];
  let closed = req.session.data["closedFiles"];

  // Add new selected files as empty objs to this array:
  selected
    .filter((fn) => closed[fn] === undefined)
    .forEach((newFile) => {
      closed[newFile] = {};
    });
};

const populateWithClosureData = (req, res) => {
  const selected = req.session.data["file-selection"];
  let closed = req.session.data["closedFiles"];
  closed = clearEmpties(closed);

  let isClosed = closed.hasOwnProperty(selected[0]);

  // Do the files we are about to show match? i.e. can we populate the form.
  let notMatching = selected.some((selectedFile1) => {
    return selected.some((selectedFile2) => {
      // If any are not indentical
      return (
        JSON.stringify(closed[selectedFile1]) !==
        JSON.stringify(closed[selectedFile2])
      );
    });
  });

  // Clear form data so it does not prepopulate
  for (let key in req.session.data) {
    if (key.split("-")[0] === "addClosure") {
      delete req.session.data[key];
    }
  }
  if (notMatching == true) {
    req.session.data.error = "not-matching";
  } else {
    // Populate the fields data with stored.
    for (var key in closed[selected[0]]) {
      req.session.data[key] = closed[selected[0]][key];
    }
    req.session.data.status = isClosed ? "Closed" : "Open";

    delete req.session.data.error;
  }

  // res.redirect(`/metadata/closure-metadata/${route}`);
};

// Add your routes here

router.get(
  "/metadata/descriptive-metadata/confirm-delete-metadata",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }

    const selected = req.session.data["file-selection"];
    const descriptiveData = req.session.data["descriptiveFiles"];

    Array.from(selected).forEach((file) => {
      delete descriptiveData[selected];
    });

    res.redirect("/metadata/descriptive-metadata/file-level");
  }
);

router.get(
  "/metadata/descriptive-metadata/confirm-file-level",
  function (req, res) {
    // if (req.session.data["file-selection"] === undefined) {
    //   throw new Error("Missing file selection");
    // }
    let selected = req.session.data["file-selection"];
    let doView = req.session.data["action"] === "view";

    if (
      (selected && typeof selected == "string") ||
      selected instanceof String
    ) {
      selected = [selected];
      req.session.data["file-selection"] = selected;
    }
    if (!req.session.data.descriptiveFiles)
      req.session.data.descriptiveFiles = {};

    if (selected === undefined || selected === "") {
      res.render("metadata/descriptive-metadata/file-level", {
        error: "no-selection",
      });
    } else {
      const selectedWithExistingData = selected.filter((fn) => {
        return req.session.data.descriptiveFiles[fn] !== undefined;
      });

      populateWithDescriptive(req, res);

      // Do selected files have existing data
      if (doView === true) {
        // Has existing data.
        res.redirect("/metadata/descriptive-metadata/summary-metadata");
      } else {
        res.redirect("/metadata/descriptive-metadata/add-descriptive");
      }
    }
  }
);

router.get(
  "/metadata/descriptive-metadata/confirm-add-descriptive",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }

    if (!req.session.data.descriptiveFiles)
      req.session.data.descriptiveFiles = {};

    for (let key in req.session.data) {
      if (key.split("-")[0] === "addDescriptive") {
        req.session.data["file-selection"].forEach((file, i) => {
          if (!(file in req.session.data.descriptiveFiles)) {
            req.session.data.descriptiveFiles[file] = {};
          }
          req.session.data.descriptiveFiles[file][key] = req.session.data[key];
        });
      }
    }

    res.redirect("/metadata/descriptive-metadata/review-metadata");
  }
);

router.get(
  "/metadata/closure-metadata/confirm-delete-metadata",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }

    const selected = req.session.data["file-selection"];
    const closedFiles = req.session.data["closedFiles"];

    Array.from(selected).forEach((file) => {
      delete closedFiles[selected];
    });

    res.redirect("/metadata/closure-metadata/summary");
  }
);

router.get(
  "/metadata/closure-metadata/confirm-add-closure",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }

    let required = requireClosureFields;
    if (
      hasDescription(
        req.session.data["file-selection"],
        req.session.data["descriptiveFiles"]
      ) == false
    ) {
      required = requireClosureFields.filter(
        (field) => field != "addClosure-is-the-description-sensitive"
      );
    }

    const complete = required.every((field) => {
      return (
        req.session.data[field] !== undefined && req.session.data[field] !== ""
      );
    });

    if (complete !== true) {
      res.render("metadata/closure-metadata/add-closure", {
        error: "missing-fields",
      });
      return;
    }

    if (!req.session.data.closedFiles) req.session.data.closedFiles = {};
    for (let key in req.session.data) {
      if (key.split("-")[0] === "addClosure") {
        req.session.data["file-selection"].forEach((file, i) => {
          if (!(file in req.session.data.closedFiles)) {
            req.session.data.closedFiles[file] = {};
          }
          req.session.data.closedFiles[file][key] = req.session.data[key];
        });
      }
    }

    res.redirect("/metadata/closure-metadata/review-metadata");
  }
);

router.get(
  "/metadata/closure-metadata/confirm-closure-status",
  function (req, res) {
    // if (req.session.data["file-selection"] === undefined) {
    //   throw new Error("Missing file selection");
    // }
    if (req.session.data["confirm-closure"] === undefined) {
      res.render("metadata/closure-metadata/closure-status", {
        error: "no-confirmation",
      });
    } else {
      addNewClosure(req, res);
      populateWithClosureData(req, res);
      res.redirect("/metadata/closure-metadata/add-closure");
    }
  }
);

router.get(
  "/metadata/closure-metadata/confirm-file-level",
  function (req, res) {
    let selected = req.session.data["file-selection"];
    let doView = req.session.data["action"] === "view";

    if (
      selected &&
      (typeof selected == "string" || selected instanceof String)
    ) {
      selected = [selected];
      req.session.data["file-selection"] = selected;
    }
    if (!req.session.data.closedFiles) req.session.data.closedFiles = {};

    if (selected === undefined || selected === "") {
      res.render("metadata/closure-metadata/file-level", {
        error: "no-selection",
      });
    } else {
      const selectedClosedFiles = selected.filter((fn) => {
        return req.session.data.closedFiles[fn] !== undefined;
      });

      // Are all files closed already? If so, straight to the main form.
      if (doView === true) {
        // Show summary page before main form
        populateWithClosureData(req, res);
        // redirect to summary
        res.redirect("/metadata/closure-metadata/summary-metadata");
      } else if (selectedClosedFiles.length === selected.length) {
        // Show summary page before main form
        populateWithClosureData(req, res);
        // redirect to summary
        res.redirect("/metadata/closure-metadata/add-closure");
      } else {
        res.redirect("/metadata/closure-metadata/closure-status");
      }
    }
  }
);

router.get(
  "/metadata/closure-metadata/view-by-id/:fileId",
  function (req, res) {

    let data = req.session.data;
    data["file-selection"] = [req.params.fileId];

    for (var key in req.session.data["closedFiles"][req.params.fileId]) {
      data[key] = req.session.data["closedFiles"][req.params.fileId][key];
    }

    res.render("/metadata/closure-metadata/review-metadata", {
      from: "/metadata/closure-metadata/summary",
      data: data
    });
  }
);

router.get(
  "/metadata/closure-metadata/edit-by-id/:fileId",
  function (req, res) {

    req.session.data["file-selection"] = [req.params.fileId]
    res.redirect("/metadata/closure-metadata/confirm-file-level");
  }
);

router.get(
  "/metadata/closure-metadata/delete-by-id/:fileId",
  function (req, res) {
    req.session.data["file-selection"] = [req.params.fileId]
    res.redirect("/metadata/closure-metadata/delete-metadata");
  }
);

router.get(
  "/metadata/descriptive-metadata/view-by-id/:fileId",
  function (req, res) {

    let data = req.session.data;
    data["file-selection"] = [req.params.fileId];

    for (var key in req.session.data["descriptiveFiles"][req.params.fileId]) {
      data[key] = req.session.data["descriptiveFiles"][req.params.fileId][key];
    }

    res.render("/metadata/descriptive-metadata/review-metadata", {
      from: "/metadata/descriptive-metadata/summary",
      data: data
    });
  }
);

router.get(
  "/metadata/descriptive-metadata/edit-by-id/:fileId",
  function (req, res) {

    req.session.data["file-selection"] = [req.params.fileId]
    res.redirect("/metadata/descriptive-metadata/confirm-file-level");
  }
);

router.get(
  "/metadata/descriptive-metadata/delete-by-id/:fileId",
  function (req, res) {
    req.session.data["file-selection"] = [req.params.fileId]
    res.redirect("/metadata/descriptive-metadata/delete-metadata");
  }
);


/*
 * Summary pages
 */
router.get(
  "/metadata/closure-metadata/:version?/summary/static/",
  function (req, res) {
    const data = req.session.data;
    data.closedFiles = closureMetadataSummaryExampleData;

    let versionUrl = (req.params.version) ?  `/metadata/closure-metadata/${req.params.version}/summary` : '/metadata/closure-metadata/summary';

    res.render(versionUrl, {
      data : data
    });
  }
);

router.get(
  "/metadata/descriptive-metadata/:version?/summary/static/",
  function (req, res) {
    const data = req.session.data;
    data.descriptiveFiles = descriptiveMetadataSummaryExampleData;

    let versionUrl = (req.params.version) ?  `/metadata/descriptive-metadata/${req.params.version}/summary` : '/metadata/descriptive-metadata/summary';

    res.render(versionUrl, {
      data : data
    });
  }
);

function findMatches(data, searchPattern, keys){
  const partialMatches = data.map(item => {
    const matches = [];

    keys.forEach(key => {
      const value = item[key];
      if (value) {
        let startIdx = -1;
        let endIdx = -1;
        let currentIndex = value.toLowerCase().indexOf(searchPattern.toLowerCase());

        while (currentIndex !== -1) {
          startIdx = currentIndex;
          endIdx = startIdx + searchPattern.length - 1;

          matches.push({
            indices: [[startIdx, endIdx]],
            value,
            key,
          });
          // Continue searching for the next occurrence
          currentIndex = value.indexOf(searchPattern, currentIndex + 1);
        }
      }
    });

    if (matches.length > 0) {
      return {
        item,
        matches,
      };
    }

    return null;
  }).filter(match => match !== null);

  return partialMatches
}

router.get(
  "/TDR-3581/:version?",
  function (req, res) {
    const perPage = 100
    const data = req.session.data;
    const version = req.params.version
    const filterByLetter = req.query.filterLetter
    const filterByDirectory = req.query.filterDirectory
    const searchPattern = req.query.search
    const searchFilePattern = req.query.searchName
    let page = req.query.pg

    data.recordsMetadata = genericMetadata
    data.recordsCount = genericMetadata.length

    data.directories = [...new Set(genericMetadata.map((item) => item.path))].sort().map(item => {
      return {text: item.split("/").join(" / "), value: item, selected: item === decodeURIComponent(filterByDirectory)}});

    data.directories.unshift({value: "", text:"Choose directory"})

    data.currentDirFilter = data.directories.find(item => item.selected === true)?.text
    data.currentAlphaFilter = ""

    const fuseOptions = {
      includeScore: true,
      includeMatches: true,
      findAllMatches: false,
      minMatchCharLength: 3,
      ignoreLocation: true,
      keys: [
        "name",
        "path"
      ]
    };

    // SEARCH
    if(searchPattern || searchFilePattern){
      const keys = searchFilePattern ? ['name'] : ['name', 'path'];
      const matches = findMatches(data.recordsMetadata, searchPattern||searchFilePattern, keys);
      data.recordsMetadata = []

      matches.forEach((res)=>{
        data.recordsMetadata.push(Object.assign(res.item, {matches:res.matches}))
      })
      data.searchPattern = searchPattern
      data.searchFilePattern = searchFilePattern
      data.recordsCount = data.recordsMetadata.length
    } else {
      data.recordsMetadata = data.recordsMetadata.map((item) =>{
        if(item.hasOwnProperty('matches')) delete item.matches;
        return item
      })
      data.searchPattern = "";
      data.searchFilePattern = "";
    }

    // FILTER BY LETTER
    if(filterByLetter){
      data.currentAlphaFilter = filterByLetter
      data.recordsMetadata = data.recordsMetadata.filter( r => String(r.name[0]).toLocaleLowerCase() == filterByLetter.toLocaleLowerCase())
    }

    // FILTER BY DIRECTORY
    if(filterByDirectory){
      data.recordsMetadata = data.recordsMetadata.filter( r => {
        return String(r.path).toLocaleLowerCase() == decodeURIComponent(filterByDirectory).toLocaleLowerCase()
      })
      data.recordsCount = data.recordsMetadata.length
    }

    // SORT
    if(["v01", "v03", "v05", "usability-testing-v1"].includes(version)){
      // by path, then name
      data.recordsMetadata = data.recordsMetadata.sort( (r1, r2) => {
        // Compare by path first
        if (r1.path < r2.path) return -1;
        if (r1.path > r2.path) return 1;

        // If paths are equal, compare by name
        if (r1.name < r2.name) return -1;
        if (r1.name > r2.name) return 1;

        // Objects are equal in both properties
        return 0;
      })
    }

    if(["v02", "v04", "v06"].includes(version)){
      // by name
      data.recordsMetadata = data.recordsMetadata.sort( (r1, r2) => {
        return r1.name > r2.name ? 1 : -1
      })
    }

    const searchQuery = searchPattern ? `&search=${searchPattern}` : "";
    const searchFileQuery = searchFilePattern ? `&searchName=${searchFilePattern}` : "";
    const filterQuery = filterByLetter ? `&filterLetter=${filterByLetter}` : "";
    const filterDirQuery = filterByDirectory ? `&filterDirectory=${filterByDirectory}` : "";
    const url = (pg) => `/TDR-3581/${version}?pg=${pg}${filterQuery}${searchQuery}${searchFileQuery}${filterDirQuery}`
    data.urlNoSearchFile = `/TDR-3581/${version}?pg=1${filterDirQuery}`
    data.urlNoDirectory = `/TDR-3581/${version}?pg=1${searchFileQuery}`


    // PAGINATE
    data.currentPage = page || 1;
    data.totalPages = Math.ceil(data.recordsMetadata.length / perPage);
    data.previousPage = (parseInt(data.currentPage) > 1) ? url(parseInt(data.currentPage)-1) : false;
    data.nextPage = parseInt(data.currentPage)+1 > data.totalPages ? false : url(parseInt(data.currentPage)+1);


    data.pages = []
    for(let i = 1; i <= data.totalPages; i++){
      data.pages.push({
        number: i,
        current: data.currentPage == i,
        href: url(i)
      })
    }

    if(data.pages.length === 0)
      data.pages = [{number: 1, current: true}]

    data.recordsMetadata = data.recordsMetadata.slice((data.currentPage-1)*perPage, data.currentPage*perPage);

    let versionTemplate = (version) ?  `/TDR-3581/${version}/index` : '/TDR-3581/v01/index';
    res.render(versionTemplate, {
      data : data
    });
  }
);

router.post(
  "/prototype-versions/clear-data",
  function (req, res) {
    req.session.data = {};
    res.redirect("/prototype-versions/data-cleared");
  }
);

router.use((req, res, next) => {
  req.session.data = {...req.session.data, ...tdrSettings};
  next()
})


module.exports = router;
