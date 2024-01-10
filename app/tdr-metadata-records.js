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

exports.persistDescriptiveData = function(req){

  req.session.data.descriptiveFiles = req.session.data.descriptiveFiles || {};

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

}

exports.populateWithDescriptive = function(req) {
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

exports.validateAddClosure = function (req) {
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

  return required.every((field) => {
    return (
      req.session.data[field] !== undefined && req.session.data[field] !== ""
    );
  });

}

exports.persistClosureData = function (req) {
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
}

exports.setClosureStatus = function (req) {
  const selected = req.session.data["file-selection"];
  let closed = req.session.data["closedFiles"];

  // Add new selected files as empty objs to this array:
  selected
    .filter((fn) => closed[fn] === undefined)
    .forEach((newFile) => {
      closed[newFile] = {};
    });
};

exports.populateWithClosureData = function(req) {
  const selected = req.session.data["file-selection"];
  let closed = req.session.data["closedFiles"];
  closed = clearEmpties(closed);

  let isClosed = closed.hasOwnProperty(selected[0]);

  // MULTIPLE FILE EDITING - Do the files we are about to show match?
  // i.e. if not we can't populate the form, so we leave it blank.
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
};

exports.validateFileSelection = function(req) {
  let selected = req.session.data["file-selection"];
  if (
    (selected && typeof selected == "string") ||
    selected instanceof String
  ) {
    selected = [selected];
    req.session.data["file-selection"] = selected;
  }

  if (!req.session.data.descriptiveFiles)
    req.session.data.descriptiveFiles = {};

  return !(selected === undefined || selected === "");
}

exports.editPageData = function(req, recordsMetadata) {
  const nameAndPath = req.params.nameAndPath;
  const record = recordsMetadata.find( item => nameAndPath == `${item.path}${item.name}` )

  return {
    path: record?.path,
    name: record?.name,
    extracted : {
      day: record ? record['ldm-extracted-day'] : '',
      month: record ? record['ldm-extracted-month']: '',
      year: record ? record['ldm-extracted-year'] : ''
    },
    corrected : {
      day: record ? record['ldm-corrected-day'] : '',
      month: record ? record['ldm-corrected-month']: '',
      year: record ? record['ldm-corrected-year'] : ''
    }
  }

};

exports.addCorrectedDate = function(req, dateData) {
  const nameAndPath = req.params.nameAndPath;
  const record = dateData.find( item => nameAndPath == `${item.path}${item.name}` )

  const correctedDay = req.body["correctedDate-day"];
  const correctedMonth = req.body["correctedDate-month"];
  const correctedYear = req.body["correctedDate-year"];

  if(correctedDay && correctedMonth && correctedYear){

    record["ldm-corrected-day"] = correctedDay
    record["ldm-corrected-month"] = correctedMonth
    record["ldm-corrected-year"] = correctedYear
  }

  return dateData;
};


exports.table = function(req, baseURL, recordsMetdata) {
  const perPage = 100
  const data = req.session.data;
  const sort = req.query.sort || "directory";
  const filterByLetter = req.query.filterLetter
  const filterByDirectory = req.query.filterDirectory
  const searchPattern = req.query.search?.trim()
  const searchFilePattern = req.query.searchName?.trim()
  let page = req.query.pg

  data.recordsMetadata = recordsMetdata;
  data.recordsCount = data.recordsMetadata.length;

  // Using Set to remove duplicates.
  data.directories = [...new Set(data.recordsMetadata.map((item) => item.path))].sort().map(item => {
    return {text: item.split("/").join(" / "), value: item, selected: item === decodeURIComponent(filterByDirectory)}
  });
  data.directories.unshift({value: "", text:""})

  data.currentDirFilter = data.directories.find(item => item.selected === true)?.text
  data.currentAlphaFilter = ""

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
    data.filterByDirectory = filterByDirectory;
  }

  // SORT
  if(sort == "directory"){
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

    data.sort = "directory"
  }

  if(sort == "file"){
    // by name
    data.recordsMetadata = data.recordsMetadata.sort( (r1, r2) => {
      return r1.name > r2.name ? 1 : -1
    })
    data.sort = "file"
  }

  const searchQuery = searchPattern ? `&search=${searchPattern}` : "";
  const searchFileQuery = searchFilePattern ? `&searchName=${searchFilePattern}` : "";
  const filterQuery = filterByLetter ? `&filterLetter=${filterByLetter}` : "";
  const filterDirQuery = filterByDirectory ? `&filterDirectory=${filterByDirectory}` : "";
  const url = (pg) => `${baseURL}?sort=${sort}&pg=${pg}${filterQuery}${searchQuery}${searchFileQuery}${filterDirQuery}`
  data.urlNoSearchFile = `${baseURL}?sort=${sort}&pg=1${filterDirQuery}`
  data.urlNoDirectory = `${baseURL}?sort=${sort}&pg=1${searchFileQuery}`


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

  return {
    data : data
  };
};


// module.exports = { table, addCorrectedDate, editPageData, confirmFileSelection };
