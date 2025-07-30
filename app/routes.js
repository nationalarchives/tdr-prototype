//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

require("./routes-history")
require("./routes-versions")

const tdrSettings = require("./data/settings.json")

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
router.post('/judgments/*/is-original-v2.1-2.3', function(request, response) {

  var isOriginal = request.session.data['isOriginalJudgment'] == "yes"
  if (isOriginal == true){
    response.redirect("upload")
  } else {
    response.redirect("tell-us-more")
  }
})

router.post('/judgments/*/is-original-v2.2-2.4', function(request, response) {

  var isOriginal = request.session.data['isOriginalJudgment'] == "yes"
  if (isOriginal == true){
    response.redirect("before-uploading")
  } else {
    response.redirect("tell-us-more")
  }
})

router.post('/judgments/*/tell-us-more', function(request, response) {

  var documentType = request.session.data['documentType'];
  if (documentType == "something-else"){
    response.redirect("something-else");
  } else if (documentType == "press-summary"){
    response.redirect("provide-neutral-citation")
  } else if (documentType == "update"){
    response.redirect("what-has-changed")
  }
  
})

router.post('/judgments/*/tell-us-more-v4', function(request, response) {
  var documentType = request.session.data['documentType'];
  if (["original", 'update'].indexOf(documentType) >= 0){
    response.redirect("before-uploading");
  } else  if (documentType == "something-else"){
    response.redirect("something-else");
  } else if (documentType == "press-summary"){
    response.redirect("upload")
  }
})

router.post('/judgments/*/tell-us-more-v5', function(request, response) {
  var documentType = request.session.data['documentType'];
  if (["original", "update", "press-summary"].indexOf(documentType) >= 0){
    response.redirect("provide-neutral-citation");
  } else if (documentType == "something-else"){
    response.redirect("something-else");
  }
})
router.post('/judgments/*/tell-us-more-v6', function(request, response) {
  var documentType = request.session.data['documentType'];
  if (["update", "press-summary"].indexOf(documentType) >= 0){
    response.redirect("provide-neutral-citation");
  } else if (documentType == "original"){
    response.redirect("before-uploading");
  }
})



// test route 
router.post('/judgments/*/tell-us-more-v7', function(request, response) {
  var documentType = request.session.data['documentType'];
  var updateReasons = request.session.data['updateReason']; // Assuming 'updateReason' contains the selected checkboxes

  if (documentType == "original") {
    response.redirect("upload");
  } else if (documentType == "update") {
    // Check if at least one checkbox is selected
    if (updateReasons && updateReasons.length > 0) {
      response.redirect("provide-neutral-citation");
    } else {
      // Redirect to an error page if no checkboxes are selected
      response.redirect("tell-us-more-error");
    }
  } else if (documentType == "press-summary") {
    response.redirect("provide-neutral-citation");
  } else if (documentType == "something-else") {
    response.redirect("something-else");
  } else {
    // Handle unexpected document types or redirect to a default page
    response.redirect("default-page");
  }
})


router.post('/judgments/*/provide-neutral-citation-v1', function(request, response) {
  // Capture the values from the form submission
  var neutralCitation = request.body.neutralCitation;
  var noNcnCheckbox = request.body['no-ncn']; // Get the actual value
  
  // Use console.log to print the values to the console
  //console.log('Neutral Citation Value:', neutralCitation);
  //console.log('No NCN Checkbox Raw Value:', noNcnCheckbox);
  //console.log('No NCN Checkbox Selected:', noNcnCheckbox === 'no-ncn-select');
  
  // Check if the checkbox is selected (handle GDS checkbox array format)
  var isCheckboxSelected = Array.isArray(noNcnCheckbox) ? noNcnCheckbox.includes('no-ncn-select') : noNcnCheckbox === 'no-ncn-select';
  
  //console.log('Checkbox Selected:', isCheckboxSelected);
  
  // Check if the checkbox is selected or if there is at least one character in the textbox
  if (isCheckboxSelected || (neutralCitation && neutralCitation.trim().length >= 1)) {
    // Redirect to the 'upload' page if either condition is met
    response.redirect("upload");
  } else {
    // Redirect to the 'error' page if neither condition is met
    response.redirect("provide-neutral-citation-error");
  }
})
// end test 

router.post('/TUX-106/*/transfer-tasks-series', (req, res, next) => {
  if(req.session.data['csv-upload-status'] == "success"){
    const redirectTo = req.session.data['redirect-to'];
    delete req.session.data['redirect-to'];
    res.redirect(redirectTo);
  } else {
    res.redirect('/TUX-106/1-metadata-upload/transfer-tasks');
  }
})

router.post('/*/transfer-tasks', (req, res, next) => {

  const fieldChecks = req.body['prepare-records-complete'];

  let fieldComplete = false;
  const possibleFields = ['prepare-records-complete'];
  possibleFields.forEach(fieldName => {
    if(req.body[fieldName] !== undefined){
      fieldComplete = req.body[fieldName] == 'yes';
    }
  })

  if(req.session.data['redirect-to'] ){

    if (fieldComplete === true) {
      const redirectTo = req.session.data['redirect-to'];
      delete req.session.data['redirect-to'];
      res.redirect(redirectTo);
    } else {
      res.render(req.path)
    }
  } else {
    res.render(req.path)
  }
})


/*
 * When confirm closure has a radio button that redirects user to
 * an info page if they select 'no' which provides further info
 */
router.post(
  "/:ticketId/confirm-closure-v2",
  function(req, res){
    if(req.session.data["confirmClosureStatus"] == "no-1"){
      res.redirect(`/${req.params.ticketId}/confirm-closure-no-1`)
    } else if(req.session.data["confirmClosureStatus"] == "no-2"){
      res.redirect(`/${req.params.ticketId}/confirm-closure-no-2`);
    } else {
      res.redirect(`/${req.params.ticketId}/${req.session.data["confirmClosureStatus"]}`);
    }
  })

router.get(
  "/:ticketId/has-closed-records",
  function(req, res){

    // req.session.data[req.params.ticketId] = req.session.data[req.params.ticketId] || [];
    req.session.data['hasClosedRecords'] = req.session.data["has-closed-records"] == "true"

    res.redirect(`/${req.params.ticketId}/upload-checks`)
  })

router.post(
  "/:ticketId/metadata-route",
  function(req, res){

    const route = req.session.data['metadata-route']
    if(["TUX-53", "TUX-39"].includes(req.params.ticketId) || route == "csv"){
      res.redirect(`/${req.params.ticketId}/download-template`)
    } else if (route == "csv"){
      res.redirect(`/${req.params.ticketId}/upload-csv`)
    }

})

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

router.get("/metadata/descriptive-metadata/clear", function (req, res) {
  delete req.session.data["descriptiveFiles"];
  for (let key in req.session.data) {
    if (key.split("-")[0] === "addDescriptive") {
      delete req.session.data[key];
    }
  }

  res.set("Content-Type", "text/html");
  res.send(
    Buffer.from(
      "<h2>deleted description session data</h2><br><br><a href='/metadata/descriptive-metadata/file-level'>Return to file selection</a>"
    )
  );
});

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

    res.redirect("/metadata/closure-metadata/file-level");
  }
);

router.get("/metadata/closure-metadata/clear", function (req, res) {
  delete req.session.data["file-selection"];
  delete req.session.data["closedFiles"];

  for (let key in req.session.data) {
    if (key.split("-")[0] === "addClosure") {
      delete req.session.data[key];
    }
  }

  res.set("Content-Type", "text/html");
  res.send(
    Buffer.from(
      "<h2>deleted closure session data</h2><br><br><a href='/metadata/closure-metadata/file-level'>Return to file selection</a>"
    )
  );
});

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

/* baking-powder closure */
router.get(
  "/metadata/closure-metadata/baking-powder/confirm-closure-redir",
  function (req, res) {}
);

router.get(
  "/metadata/closure-metadata/baking-powder/confirm-closure-status",
  function (req, res) {
    // file[] is open/undefined && data[] is open/undefined
    // ( intention is to continue without confirmation - needs error warning )
    if (req.session.data["closure"]["baking-powder"] === undefined) {
      req.session.data["error"] = "no-confirmation";
      res.redirect(
        "/metadata/closure-metadata/baking-powder/check-closure-status"
      );
    } else if (req.session.data["closure"]["baking-powder"][0] === "true") {
      req.session.data["error"] = "";
      res.redirect("/metadata/closure-metadata/baking-powder/add-closure");
    } else if (req.session.data["closure"]["baking-powder"] === "delete") {
      req.session.data["error"] = "";
      delete req.session.data["is-the-title-sensitive"];
      res.redirect("/metadata/closure-metadata/file-level");
    } else {
      res.redirect("/metadata/closure-metadata/baking-powder/huh");
    }
  }
);

router.get(
  "/metadata/closure-metadata/baking-powder/add-closure-confirm/",
  function (req, res) {
    if (req.session.data["exemption-code-redir"] == "true") {
      res.redirect("/metadata/closure-metadata/baking-powder/add-multiple-FOI");
    } else if (
      req.session.data["is-the-title-sensitive"] &&
      req.session.data["is-the-description-sensitive"]
    ) {
      if (
        req.session.data["is-the-title-sensitive"] == "yes" ||
        req.session.data["is-the-description-sensitive"] == "yes"
      ) {
        req.session.data["error"] = "";
        res.redirect(
          "/metadata/closure-metadata/baking-powder/closure-alternative-title"
        );
      } else if (
        req.session.data["is-the-title-sensitive"] == "no" &&
        req.session.data["is-the-description-sensitive"] == "no"
      ) {
        req.session.data["error"] = "";
        res.redirect("/metadata/closure-metadata/baking-powder/closure-added");
      }
    } else {
      req.session.data["error"] = "no-alternative";
      res.redirect("/metadata/closure-metadata/baking-powder/add-closure");
    }
  }
);

router.get(
  "/metadata/closure-metadata/baking-powder/confirm-multiple-FOI/",
  function (req, res) {
    // req.session.data.foi_id_selection = JSON.parse(req.params.ids);
    res.redirect("/metadata/closure-metadata/baking-powder/add-closure");
  }
);

// XHR update
router.get(
  "/metadata/closure-metadata/baking-powder/add-multiple-FOI/update/:ids",
  function (req, res) {
    req.session.data.foi_id_selection = JSON.parse(req.params.ids);
    // To store sesssion data need an arbritrary redirect
    res.redirect("/metadata/closure-metadata/baking-powder/add-multiple-FOI");
  }
);

router.get(
  "/metadata/closure-metadata/baking-powder/add-multiple-FOI/clear",
  function (req, res) {
    req.session.data.foi_id_selection = [];
    res.redirect("/metadata/closure-metadata/baking-powder/add-multiple-FOI");
  }
);

router.get(
  "/metadata/closure-metadata/baking-powder/remove-FOI/:foiId",
  function (req, res) {
    req.session.data.foi_id_selection =
      req.session.data.foi_id_selection.filter(
        (code) => code !== req.params.foiId.toString()
      );
    res.redirect("/metadata/closure-metadata/baking-powder/add-closure");
  }
);

router.use((req, res, next) => {
  req.session.data = {...req.session.data, ...tdrSettings};
  next()
})


module.exports = router;
