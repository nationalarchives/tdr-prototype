const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const axios = require('axios');

router.get("/prototype-versions-api/", async (req, res) => {
  try {
    const response = await axios({
      method: "GET",
      url: "https://api.baserow.io/api/database/rows/table/137070/",
      params: {
        user_field_names: true,
        order_by: "-Github PR Number",
      },
      headers: {
        Authorization: `Token ${process.env.BASEROW_API_TOKEN}`
      }
    });

    res.render(`prototype-versions/home`, {data: response.data.results});

  } catch (error) {
    console.error(error.status, error.statusText);
    res.render(`prototype-versions/error`);
  }
});

router.get("/prototype-versions-api/:pr_number", async (req, res) => {
  console.log(req.params)
  try {
    const response = await axios({
      method: "GET",
      url: `https://api.baserow.io/api/database/rows/table/137070/${req.params.pr_number}/`,
      params: {
        user_field_names: true
      },
      headers: {
        Authorization: `Token ${process.env.BASEROW_API_TOKEN}`
      }
    });

    const responseFeature = await axios({
      method: "GET",
      url: "https://api.baserow.io/api/database/rows/table/204218/?user_field_names=true",
      params: {
        user_field_names: true,
        filter__field_1403529__link_row_has: response.data.id,
        filter__Active__boolean: true
      },
      headers: {
        Authorization: `Token ${process.env.BASEROW_API_TOKEN}`
      }
    });

    res.render(`prototype-versions/design-version`, {data: response.data, features: responseFeature.data.results});

  } catch (error) {
    console.error(error);
    res.render(`prototype-versions/error`);
  }
});



// async function getDesignVersions() {
//   try {
//     const response = await axios({
//       method: "GET",
//       url: "https://api.baserow.io/api/database/rows/table/137070/?user_field_names=true",
//       headers: {
//         Authorization: process.env.BASEROW_API_TOKEN
//       }
//     });
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// }

// router.get(
//   "/prototype-history/:historyName/page-id/:pageID",
//   function (req, res) {
//     const structureJson = path.resolve(
//       __dirname,
//       `assets/prototype-history/${req.params.historyName}/service-structure.json`
//     );
//     const structure = require(structureJson);
//     const page = structure.find((page) => page.pageID == req.params.pageID);
//     res.render(`prototype-history/single-page`, { ...req.params, ...page });
//   }
// );

// router.get("/prototype-history/page-id/:pageID", function (req, res) {
//   const historyDirectories = getDirectories(
//     path.resolve(__dirname, "assets/prototype-history/")
//   ).reverse();

//   const historiesWithPage = historyDirectories.flatMap((dirname) => {
//     const structure = require(path.resolve(
//       __dirname,
//       `assets/prototype-history/${dirname}/service-structure.json`
//     ));
//     let page = structure.find((page) => page.pageID == req.params.pageID);
//     if (!page) return [];
//     return Object.assign(page, { historyName: dirname });
//   });

//   res.render(`prototype-history/batch-page-by-id`, {
//     histories: historiesWithPage,
//     ...req.params,
//   });
// });

module.exports = { versionRoutes: router };
