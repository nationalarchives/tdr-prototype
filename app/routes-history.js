const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const readdirSync = require("fs").readdirSync;
const path = require("path");

const getDirectories = (source) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dir) => dir.name);

router.get("/prototype-history/", function (req, res) {
  res.render("prototype-history/index", {
    histories: getDirectories(
      path.resolve(__dirname, "assets/prototype-history/")
    ).reverse(),
  });
});

router.get("/prototype-history/:historyName/", function (req, res) {
  const structureJson = path.resolve(
    __dirname,
    `assets/prototype-history/${req.params.historyName}/service-structure.json`
  );
  const structure = require(structureJson);
  res.render(`prototype-history/batch-page`, { structure, ...req.params });
});

router.get(
  "/prototype-history/:historyName/page-id/:pageID",
  function (req, res) {
    const structureJson = path.resolve(
      __dirname,
      `assets/prototype-history/${req.params.historyName}/service-structure.json`
    );
    const structure = require(structureJson);
    const page = structure.find((page) => page.pageID == req.params.pageID);
    res.render(`prototype-history/single-page`, { ...req.params, ...page });
  }
);

router.get("/prototype-history/page-id/:pageID", function (req, res) {
  const historyDirectories = getDirectories(
    path.resolve(__dirname, "assets/prototype-history/")
  ).reverse();

  const historiesWithPage = historyDirectories.flatMap((dirname) => {
    const structure = require(path.resolve(
      __dirname,
      `assets/prototype-history/${dirname}/service-structure.json`
    ));
    let page = structure.find((page) => page.pageID == req.params.pageID);
    if (!page) return [];
    return Object.assign(page, { historyName: dirname });
  });

  res.render(`prototype-history/batch-page-by-id`, {
    histories: historiesWithPage,
    ...req.params,
  });
});

module.exports = { historyRoutes: router };
