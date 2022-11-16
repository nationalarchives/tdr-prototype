const express = require("express");
const router = express.Router();

router.get("/metadata/closure-metadata/clear", function (req, res) {
  delete req.session.data["file-selection"];
  delete req.session.data["closedFiles"];

  for (let key in req.session.data) {
    if (
      key.split("-")[0] === "addClosure" ||
      key.split("-")[0] === "addAlternative"
    ) {
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
  "/metadata/closure-metadata/confirm-closure-alternatives",
  function (req, res) {
    for (let key in req.session.data) {
      if (key.split("-")[0] === "addAlternative") {
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
  "/metadata/closure-metadata/confirm-add-closure",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }

    const formFieldsTotal = 10;
    const formFieldsComplete = [];
    for (let key in req.session.data) {
      if (key.split("-")[0] === "addClosure") {
        if (req.session.data[key] !== "") {
          formFieldsComplete.push(key);
        }
      }
    }

    if (formFieldsComplete.length < formFieldsTotal) {
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

    if (
      req.session.data["addClosure-is-the-title-sensitive"] == "yes" ||
      req.session.data["addClosure-is-the-description-sensitive"] == "yes"
    ) {
      res.redirect("/metadata/closure-metadata/closure-alternatives");
    } else {
      res.redirect("/metadata/closure-metadata/review-metadata");
    }
  }
);

router.get(
  "/metadata/closure-metadata/confirm-closure-status",
  function (req, res) {
    if (req.session.data["file-selection"] === undefined) {
      throw new Error("Missing file selection");
    }
    if (req.session.data["confirm-closure"] === undefined) {
      res.render("metadata/closure-metadata/closure-status", {
        error: "no-confirmation",
      });
    } else {
      redirectAddClosure(req, res);
    }
  }
);

const clearEmpties = (closedFiles) => {
  if (closedFiles === undefined) return {};

  for (const [fileKey, closedFile] of Object.entries(closedFiles)) {
    for (const [fieldKey, fieldValue] of Object.entries(closedFile)) {
      if (closedFile[fieldKey] == "") {
        delete closedFile[fieldKey];
      }
    }
  }

  return closedFiles;
};

const redirectAddClosure = (req, res) => {
  const selected = req.session.data["file-selection"];
  let closed = req.session.data["closedFiles"];

  // Add new selected files as empty objs to this array:
  selected
    .filter((fn) => closed[fn] === undefined)
    .forEach((newFile) => {
      closed[newFile] = {};
    });
  closed = clearEmpties(closed);

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
    if (
      key.split("-")[0] === "addClosure" ||
      key.split("-")[0] === "addAlternative"
    ) {
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
    delete req.session.data.error;
  }

  console.log(closed, req.session.data["addClosure-closure-period"]);

  res.redirect("/metadata/closure-metadata/add-closure");
};

router.get(
  "/metadata/closure-metadata/confirm-file-level",
  function (req, res) {
    let selected = req.session.data["file-selection"];
    const closed = req.session.data["closedFiles"];

    if (
      selected &&
      (typeof selected == "string" || selected instanceof String)
    ) {
      selected = [selected];
      req.session.data["file-selection"] = selected;
    }
    if (!req.session.data.closedFiles) req.session.data.closedFiles = {};

    if (selected === undefined) {
      res.render("metadata/closure-metadata/file-level", {
        error: "no-selection",
      });
    } else {
      const selectedClosedFiles = selected.filter((fn) => {
        return req.session.data.closedFiles[fn] !== undefined;
      });

      // Do the files we are about to show match? i.e. can we populate the form.
      if (selectedClosedFiles.length === selected.length) {
        redirectAddClosure(req, res);
      } else {
        res.redirect("/metadata/closure-metadata/closure-status");
      }
    }
  }
);

/* baking-powder closure */
router.get(
  "/metadata/closure-metadata/baking-powder/confirm-closure-redir",
  function (req, res) {
    // console.log(req.session.data);
  }
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
    // console.log(req.session.data.foi_id_selection);
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

module.exports = router;
