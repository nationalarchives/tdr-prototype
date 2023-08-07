//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//
const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

require("./routes-history")

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

module.exports = router;
