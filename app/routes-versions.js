const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const axios = require('axios');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const rootPath = __dirname+'/views/prototype-versions/versions';

// Loop through all directories and return index frontmatter only 
function extractAllIndexFm(rootPath){
  let allIndexFm = [];
  const subfolders = fs.readdirSync(rootPath);
  subfolders.forEach((subfolder) => {
    const indexPath = path.join(rootPath, subfolder, 'index.md');
    if (fs.statSync(indexPath).isFile()){
      const fileContent = fs.readFileSync(indexPath, 'utf8');
      const fm = matter(fileContent);
      fm.data.subfolder = subfolder;
      allIndexFm.push(fm.data)
    }
  });

  allIndexFm = allIndexFm.sort((a, b) => parseInt(b.subfolder) - parseInt(a.subfolder));

  return allIndexFm;
} 

// Go into provided directory and return index and journey (front matter and markdown)
function extractIndexAndJourneys(versionPath) { 
  const version = { index: {}, journeys:[] };
  let fileContent, fm;

  if (fs.statSync(versionPath).isDirectory()) {
    // Get index
    const indexPath = path.join(versionPath, 'index.md');
    fileContent = fs.readFileSync(indexPath, 'utf8');
    version.index = matter(fileContent);

    // Read all files inside the subfolder, filter out index 
    // and capture the rest.
    const files = fs.readdirSync(versionPath);
    files.forEach((file) => {
      const filePath = path.join(versionPath, file);
      if (fs.statSync(filePath).isFile() && file !== 'index.md' && path.extname(filePath) === '.md'){
        fileContent = fs.readFileSync(filePath, 'utf8');
        fm = matter(fileContent);
        const extractNumber = (filename) => parseInt((filename.match(/-(\d{1,2})\.md$/) || [])[1], 10) || null;
        fm.filenumber = extractNumber(file);
        fm.filename = file;
        version.journeys.push(matter(fileContent));
      }
    });
  }

  version.journeys = version.journeys.sort((a, b) => a.filenumber - b.filenumber);
  
  return version;
}

router.get("/prototype-versions/", async (req, res) => {
  try {
    const data = extractAllIndexFm(rootPath);

    res.render(`prototype-versions/index`, {
      data: data
    });

  } catch (error) {
    console.error(error);
    // res.render(`prototype-versions/error`);
  }
});

router.get("/prototype-version/:pr_number", async (req, res) => {
  try {
    const folderPath = path.join(rootPath, req.params.pr_number);
    const data = extractIndexAndJourneys(folderPath);

    res.render(`prototype-versions/version`, {
      index: data.index,
      journeys: data.journeys
    });

  } catch (error) {
    console.error(error);
    res.render(`prototype-versions/error`);
  }
});

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
    
    res.render(`prototype-versions/home`, {
      data: response.data.results
    });

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

router.post(
  "/prototype-versions/clear-data",
  function (req, res) {
    req.session.data = {};
    res.redirect("/prototype-versions/data-cleared");
  }
);

module.exports = { versionRoutes: router };
