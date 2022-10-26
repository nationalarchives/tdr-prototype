const express = require("express");
const router = express.Router();

// Add your routes here - above the module.exports line
// Run this code when a form is submitted to 'juggling-balls-answer'
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
    } else if (req.session.data["cocao"] === "false") {
      req.session.data["error"] = "";
      res.redirect("/metadata/closure-metadata/file-level");
    } else {
      // req.session.files['cocao'] = undefined;
      res.redirect("/metadata/closure-metadata/T2-flour/huh");
    }
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

module.exports = router;
