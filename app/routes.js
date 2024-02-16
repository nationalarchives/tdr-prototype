//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const filters = require("./filters")
require("./routes-history")
const tdrMetadataRecords = require("./tdr-metadata-records")
const tdrSettings = require("./data/settings.json")

const closureMetadataSummaryExampleData1 = require("./data/closure-metadata-summary-example-01.json");
const closureMetadataSummaryExampleData2 = require("./data/closure-metadata-summary-example-02.json");
const descriptiveMetadataSummaryExampleData = require("./data/descriptive-metadata-summary-example-01.json");
const descriptiveMetadataSummaryExampleData2 = require("./data/descriptive-metadata-summary-example-02.json");
const testMetadata1000 = require("./data/test-metadata-1000.json");
const testMetadata150 = require("./data/test-metadata-150.json");
const onsMetadata = require("./data/ons-data.json");

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
    if (tdrMetadataRecords.validateFileSelection(req) === false) {
      res.render("metadata/descriptive-metadata/file-level", { error: "no-selection"});
    } else {
      tdrMetadataRecords.populateWithDescriptive(req, res);
      res.redirect("/metadata/descriptive-metadata/add-descriptive");
    }
  }
);

router.get(
  "/metadata/descriptive-metadata/confirm-add-descriptive",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }
    tdrMetadataRecords.persistDescriptiveData(req);
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
    if(tdrMetadataRecords.validateAddClosure(req, res) === false){
      res.render("metadata/closure-metadata/add-closure", { error: "missing-fields"});
    } else {
      tdrMetadataRecords.persistClosureData(req, res)
      res.redirect("/metadata/closure-metadata/review-metadata");
    }
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
      tdrMetadataRecords.populateWithClosureData(req, res);
      res.redirect("/metadata/closure-metadata/add-closure");
    }
  }
);

router.get(
  "/metadata/closure-metadata/confirm-file-level",
  function (req, res) {
    req.session.data.closedFiles = req.session.data.closedFiles || {};

    // TO DO - See if this can work with a redirect, instead of render
    if (tdrMetadataRecords.validateFileSelection(req) === false) {
      res.render("/metadata/closure-metadata/file-level", { error: "no-selection"});
      return
    }

    const selected = req.session.data["file-selection"];
    const allClosed = selected.every(fileId => req.session.data.closedFiles[fileId] !== undefined);
    if (allClosed === false) {
      res.redirect(`/metadata/closure-metadata/closure-status`);
    } else {
      tdrMetadataRecords.populateWithClosureData(req, res);
      res.redirect(`/metadata/closure-metadata/add-closure`);
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
    data.closedFiles = closureMetadataSummaryExampleData1;

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

  const tplArgs = tdrMetadataRecords.table(req, baseURL, recordsMetadata);
  let versionTemplate = (version) ?  `${baseURL}/index` : '/TDR-3581/v01/index';

  res.render(versionTemplate, tplArgs);
});

/*
 * TDR-3486 - Easily find and review LDM
 */
router.get( "/TDR-3486/metadata/last-modified-dates/check-and-correct", (req, res) => {
  const tplArgs = tdrMetadataRecords.table(req, req.path, testMetadata1000);
  res.render(req.path, tplArgs);
});

router.get( "/TDR-3486/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  const data = tdrMetadataRecords.editPageData(req, testMetadata1000)
  res.render('/TDR-3486/metadata/last-modified-dates/edit', data);
});

router.post( "/TDR-3486/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  tdrMetadataRecords.addCorrectedDate(req, testMetadata1000)
  res.redirect("/TDR-3486/metadata/last-modified-dates/check-and-correct?"+req.session.data.queryParamsString);
})


/*
 * TDR-3675 - Composite for review
 */

const records = filters.onsMetadataFilter(onsMetadata);

// DATES
router.get("/TDR-3675/metadata/last-modified-dates/check-and-correct", (req, res) => {
  const tplArgs = tdrMetadataRecords.table(req, req.path, records);
  res.render(req.path, tplArgs);
});

router.get( "/TDR-3675/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  const data = tdrMetadataRecords.editPageData(req, records)
  res.render('/TDR-3675/metadata/last-modified-dates/edit', data);
});

router.post( "/TDR-3675/metadata/last-modified-dates/edit/:nameAndPath", (req, res) => {
  tdrMetadataRecords.addCorrectedDate(req, records)
  res.redirect("/TDR-3675/metadata/last-modified-dates/check-and-correct?"+req.session.data.queryParamsString);
})

// CLOSED RECORDS
router.get( "/TDR-3675/metadata/closed-records/add", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get( "/TDR-3675/metadata/closed-records/add/static/", (req, res) => {
  const data = req.session.data;
  data.closedFiles = closureMetadataSummaryExampleData2;

  res.render("/TDR-3675/metadata/closed-records/add", {
    records : records,
    data : data
  });
});

router.get( "/TDR-3675/metadata/closed-records/choose-a-record", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get(
  "/TDR-3675/metadata/closed-records/confirm-file-level",
  function (req, res) {
    req.session.data.closedFiles = req.session.data.closedFiles || {};

    // TO DO - See if this can work with a redirect, instead of render
    if (tdrMetadataRecords.validateFileSelection(req) === false) {
      res.render("/TDR-3675/metadata/closed-records/file-level", { error: "no-selection"});
      return
    }

    const selected = req.session.data["file-selection"];
    const allClosed = selected.every(fileId => req.session.data.closedFiles[fileId] !== undefined);
    if (allClosed === false) {
      res.redirect(`/TDR-3675/metadata/closed-records/closure-status`);
    } else {
      tdrMetadataRecords.populateWithClosureData(req, res);
      res.redirect(`/TDR-3675/metadata/closed-records/add-closure`);
    }
  }
);

router.get( "/TDR-3675/metadata/closed-records/closure-status", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get( "/TDR-3675/metadata/closed-records/confirm-closure-status", (req, res) => {
  if (req.session.data["confirm-closure"] === undefined) {
    res.render("metadata/closure-metadata/closure-status", {
      error: "no-confirmation",
    });
  } else {
    tdrMetadataRecords.setClosureStatus(req, res);
    tdrMetadataRecords.populateWithClosureData(req, res);
    res.redirect("/TDR-3675/metadata/closed-records/add-closure");
  }
});

router.get( "/TDR-3675/metadata/closed-records/add-closure", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get( "/TDR-3675/metadata/closed-records/confirm-add-closure", (req, res) => {
  if(tdrMetadataRecords.validateAddClosure(req, res) === false){
    res.render("/TDR-3675/metadata/closed-records/add-closure", {
      records : records,
      error: "missing-fields"
    });
  } else {
    tdrMetadataRecords.persistClosureData(req, res)
    res.redirect("/TDR-3675/metadata/closed-records/review-metadata");
  }
});

router.get( "/TDR-3675/metadata/closed-records/review-metadata", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get(
  "/TDR-3675/metadata/closed-records/edit-by-id/:fileId",
  function (req, res) {
    req.session.data["file-selection"] = [req.params.fileId]
    res.redirect("/TDR-3675/metadata/closed-records/confirm-file-level");
  }
);

router.get(
  "/TDR-3675/metadata/closed-records/view-by-id/:fileId",
  function (req, res) {
    req.session.data["file-selection"] = [req.params.fileId];
    for (var key in req.session.data["closedFiles"][req.params.fileId]) {
      req.session.data[key] = req.session.data["closedFiles"][req.params.fileId][key];
    }

    res.render("/TDR-3675/metadata/closed-records/review-metadata", {
      path: "/TDR-3675/metadata/closed-records",
      from: "/TDR-3675/metadata/closed-records/add",
      data: req.session.data,
      records : records
    });
  }
);

router.get(
  "/TDR-3675/metadata/closed-records/delete-by-id/:fileId",
  function (req, res) {
    req.session.data["file-selection"] = [req.params.fileId]
    res.render("/TDR-3675/metadata/closed-records/delete-metadata", {
      data: req.session.data,
      records : records
    });
  }
);

router.get(
  "/TDR-3675/metadata/closed-records/confirm-delete-metadata",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }

    const selected = req.session.data["file-selection"];
    const closedFiles = req.session.data["closedFiles"];

    Array.from(selected).forEach((file) => {
      delete closedFiles[selected];
    });

    res.redirect("/TDR-3675/metadata/closed-records/add");
  }
);

// DESCRIPTIVE RECORDS
router.get( "/TDR-3675/metadata/descriptive/add", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get( "/TDR-3675/metadata/descriptive/add/static", (req, res) => {
  const data = req.session.data;
  data.descriptiveFiles = descriptiveMetadataSummaryExampleData2;

  res.render("/TDR-3675/metadata/descriptive/add", {
    records : records,
    data : data
  });
});

router.get( "/TDR-3675/metadata/descriptive/choose-a-record", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get("/TDR-3675/metadata/descriptive/confirm-file-level", (req, res) => {
  if (tdrMetadataRecords.validateFileSelection(req) === false) {
    res.render("/TDR-3675/metadata/descriptive/choose-a-record", { error: "no-selection" });
  } else {
    tdrMetadataRecords.populateWithDescriptive(req, res);
    res.redirect("/TDR-3675/metadata/descriptive/add-descriptive");
  }
});

router.get("/TDR-3675/metadata/descriptive/add-descriptive", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get("/TDR-3675/metadata/descriptive/confirm-add-descriptive", (req, res) => {
  if (req.session.data["file-selection"] === undefined) {
    throw new Error("Missing file selection");
  }
  tdrMetadataRecords.persistDescriptiveData(req);
  res.redirect("/TDR-3675/metadata/descriptive/review-metadata");
});

router.get( "/TDR-3675/metadata/descriptive/review-metadata", (req, res) => {
  res.render(req.path, {
    records : records
  });
});

router.get(
  "/TDR-3675/metadata/descriptive/edit-by-id/:fileId",
  function (req, res) {
    req.session.data["file-selection"] = [req.params.fileId]
    res.redirect("/TDR-3675/metadata/descriptive/confirm-file-level");
  }
);
router.get(
  "/TDR-3675/metadata/descriptive/view-by-id/:fileId", (req, res) => {
  req.session.data["file-selection"] = [req.params.fileId];
  for (var key in req.session.data.descriptiveFiles[req.params.fileId]) {
    req.session.data[key] = req.session.data.descriptiveFiles[req.params.fileId][key];
  }

  res.render("/TDR-3675/metadata/descriptive/review-metadata", {
    path: "/TDR-3675/metadata/descriptive",
    from: "/TDR-3675/metadata/descriptive/summary",
    data: req.session.data,
    records : records
  });
});


router.post(
  "/prototype-versions/clear-data",
  function (req, res) {
    req.session.data = {};
    res.redirect("/prototype-versions/data-cleared");
  }
);

module.exports = router;
