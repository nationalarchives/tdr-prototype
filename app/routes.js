const express = require("express");
const router = express.Router();

// Add your routes here - above the module.exports line
router.get(
  "/metadata/closure-metadata/T2-flour/confirm-closure-status",
  function (req, res) {
    // file[] is open/undefined && data[] is open/undefined ( intention is to continue without confirmation - needs error warning )
    if (req.session.data["cocao"] === undefined) {
      // console.log("send to /check-closure-status?error=no-confirmation")
      req.session.data["error"] = "no-confirmation";
      res.redirect("/metadata/closure-metadata/T2-flour/check-closure-status");
    } else if (req.session.data["cocao"][0] === "true") {
      req.session.data["error"] = "";
      res.redirect("/metadata/closure-metadata/T2-flour/add-closure");
    } else if (req.session.data["cocao"] === "delete") {
      req.session.data["error"] = "";
      delete req.session.data["is-the-title-sensitive"];
      res.redirect("/metadata/closure-metadata/file-level");
    } else {
      // req.session.files['cocao'] = undefined;
      res.redirect("/metadata/closure-metadata/T2-flour/huh");
    }
  }
);

router.get(
  "/metadata/closure-metadata/T2-flour/add-closure-confirm/",
  function (req, res) {
    if (req.session.data["is-the-title-sensitive"] == "yes") {
      req.session.data["error"] = "";
      res.redirect(
        "/metadata/closure-metadata/T2-flour/closure-alternative-title"
      );
    } else if (req.session.data["is-the-title-sensitive"] == "no") {
      req.session.data["error"] = "";
      res.redirect("/metadata/closure-metadata/T2-flour/closure-added");
    } else {
      req.session.data["error"] = "no-alternative-choice";
      res.redirect("/metadata/closure-metadata/T2-flour/add-closure");
    }
  }
);

router.get(
  "/metadata/closure-metadata/T2-flour/confirm-multiple-FOI/",
  function (req, res) {
    // console.log(req.session.data.foi_id_selection);
    // req.session.data.foi_id_selection = JSON.parse(req.params.ids);
    res.redirect("/metadata/closure-metadata/T2-flour/add-closure");
  }
);

// XHR update
router.get(
  "/metadata/closure-metadata/T2-flour/add-multiple-FOI/update/:ids",
  function (req, res) {
    req.session.data.foi_id_selection = JSON.parse(req.params.ids);
    // To store sesssion data need an arbritrary redirect
    res.redirect("/metadata/closure-metadata/T2-flour/add-multiple-FOI");
  }
);

router.get(
  "/metadata/closure-metadata/T2-flour/add-multiple-FOI/clear",
  function (req, res) {
    req.session.data.foi_id_selection = [];
    res.redirect("/metadata/closure-metadata/T2-flour/add-multiple-FOI");
  }
);

router.get(
  "/metadata/closure-metadata/T2-flour/remove-FOI/:foiId",
  function (req, res) {
    req.session.data.foi_id_selection =
      req.session.data.foi_id_selection.filter(
        (code) => code !== req.params.foiId.toString()
      );
    res.redirect("/metadata/closure-metadata/T2-flour/add-closure");
  }
);

module.exports = router;
