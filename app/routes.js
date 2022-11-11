const express = require("express");
const router = express.Router();

// Add your routes here - above the module.exports line
const getKeys = (obj) => {
  let keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

router.get("/metadata/closure-metadata/clear", function (req, res) {
  delete req.session.data["file-selection"];
  delete req.session.data["closedFiles"];

  res.set("Content-Type", "text/html");
  res.send(Buffer.from("<h2>deleted closure session data</h2>"));
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
    if (req.session.data["confirm-closure"] === undefined) {
      res.render("metadata/closure-metadata/closure-status", {
        error: "no-confirmation",
      });
    } else {
      redirectAddClosure(req, res);
    }
  }
);

const redirectAddClosure = (req, res) => {
  const selected = req.session.data["file-selection"];
  const closed = req.session.data["closedFiles"];

  let matching = true;
  selected.forEach((selectedFile1) => {
    selected.forEach((selectedFile2) => {
      if (selectedFile1 !== selectedFile2) {
        matching =
          JSON.stringify(closed[selectedFile1]) ===
          JSON.stringify(closed[selectedFile2]);
      }
    });
  });

  if (matching == false) {
    req.session.data.error = "not-matching";
    // Clear form data so it does not prepopulate
    for (let key in req.session.data) {
      if (
        key.split("-")[0] === "addClosure" ||
        key.split("-")[0] === "addAlternative"
      ) {
        delete req.session.data[key];
      }
    }
  } else {
    delete req.session.data.error;
  }
  res.redirect("/metadata/closure-metadata/add-closure");
};

router.get(
  "/metadata/closure-metadata/confirm-file-level",
  function (req, res) {
    const selected = req.session.data["file-selection"];
    const closed = req.session.data["closedFiles"];

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
