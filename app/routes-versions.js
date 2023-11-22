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
  try {
    // Get a particular design version.
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

    // Get features filtered by design version ID
    const responseFeature = await axios({
      method: "GET",
      url: "https://api.baserow.io/api/database/rows/table/204218/?user_field_names=true",
      params: {
        user_field_names: true,
        // filter by design version
        filter__field_1403529__link_row_has: response.data.id,
        filter__Active__boolean: true
      },
      headers: {
        Authorization: `Token ${process.env.BASEROW_API_TOKEN}`
      }
    });

    // Get jira tickets filtered by design version ID
    const responseJira = await axios({
      method: "GET",
      url: "https://api.baserow.io/api/database/rows/table/222103/?user_field_names=true",
      params: {
        user_field_names: true,
        // filter by design version
        filter__field_1545956__link_row_has: response.data.id,
      },
      headers: {
        Authorization: `Token ${process.env.BASEROW_API_TOKEN}`
      }
    });

    responseJira.data.results = responseJira.data.results.map((item)=>{
      item.url = item['URL Prefix'] + item['Jira Issue ID']
      return item;
    })

    res.render(`prototype-versions/design-version`, {
      data: response.data,
      features: responseFeature.data.results,
      jiraTickets: responseJira.data.results
    });

  } catch (error) {
    console.error(error);
    res.render(`prototype-versions/error`);
  }
});

module.exports = { versionRoutes: router };
