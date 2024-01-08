//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

require("./routes-history")
const metadataRecords = require("./tdr-metadata-records")
const tdrSettings = require("./data/settings.json")

const closureMetadataSummaryExampleData = require("./data/closure-metadata-summary-example-01.json");
const descriptiveMetadataSummaryExampleData = require("./data/descriptive-metadata-summary-example-01.json");
const testMetadata1000 = require("./data/test-metadata-1000.json");
const testMetadata150 = require("./data/test-metadata-150.json");

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


// Middleware

const targetURLs = [
  "/TDR-3486/metadata/last-modified-dates/check-and-correct",
  "/TDR-3486/metadata/last-modified-dates/edit/",
  "/TDR-3675/metadata/last-modified-dates/check-and-correct",
  "/TDR-3675/metadata/last-modified-dates/edit/",
]

// Custom middleware to process query parameters for specific URLs
const processQueryParams = (req, res, next) => {

  const contains = targetURLs.find(url =>req.path.startsWith(url))
  if (contains) {
    const queryParamsString = Object.entries(req.query)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
    req.session.data.queryParamsString = queryParamsString;
  }

  next();
};

router.use(processQueryParams)
router.use((req, res, next) => {
  req.session.data = {...req.session.data, ...tdrSettings};
  next()
})

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

/*
 * TDR-3581 - Review and navigate many rows
 */
router.get( "/TDR-3581/:version?", (req, res) => {
  const version = req.params.version;
  const baseURL = `/TDR-3581/${version}`;
  const recordsMetadata = ["ut-1", "ut-2"].includes(version) ?  testMetadata150 : testMetadata1000;

  const tplArgs = metadataRecords.table(req, baseURL, recordsMetadata);
  let versionTemplate = (version) ?  `${baseURL}/index` : '/TDR-3581/v01/index';

  res.render(versionTemplate, tplArgs);
});

/*
 * TDR-3486 - Easily find and review LDM
 */
router.get( "/TDR-3486/metadata/last-modified-dates/check-and-correct", (req, res) => {
  const tplArgs = metadataRecords.table(req, req.path, testMetadata1000);
  res.render(req.path, tplArgs);
});

router.get( "/TDR-3486/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  const data = metadataRecords.editPageData(req, testMetadata1000)
  res.render('/TDR-3486/metadata/last-modified-dates/edit', data);
});

router.post( "/TDR-3486/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  metadataRecords.addCorrectedDate(req, testMetadata1000)
  res.redirect("/TDR-3486/metadata/last-modified-dates/check-and-correct?"+req.session.data.queryParamsString);
})


/*
 * TDR-3675 - Composite for review
 */
router.get( "/TDR-3675/metadata/last-modified-dates/check-and-correct", (req, res) => {
  const tplArgs = metadataRecords.table(req, req.path, testMetadata1000);
  res.render(req.path, tplArgs);
});

router.get( "/TDR-3675/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  const data = metadataRecords.editPageData(req, testMetadata1000)
  res.render('/TDR-3675/metadata/last-modified-dates/edit', data);
});

router.post( "/TDR-3675/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  metadataRecords.addCorrectedDate(req, testMetadata1000)
  res.redirect("/TDR-3675/metadata/last-modified-dates/check-and-correct?"+req.session.data.queryParamsString);
})



router.post(
  "/prototype-versions/clear-data",
  function (req, res) {
    req.session.data = {};
    res.redirect("/prototype-versions/data-cleared");
  }
);



module.exports = router;
