// const genericMetadata = require("./data/test-metadata.json");
const testMetadata1000 = require("./data/test-metadata-1000.json");
const testMetadata150 = require("./data/test-metadata-150.json");

const editPageData = (req, recordsMetadata) => {
  const nameAndPath = req.params.nameAndPath;
  const record = recordsMetadata.find( item => nameAndPath == `${item.path}${item.name}` )

  return {
    path: record?.path,
    name: record?.name,
    extracted : {
      day: record ? record['ldm-extracted-day'] : '',
      month: record ? record['ldm-extracted-month']: '',
      year: record ? record['ldm-extracted-year'] : ''
    },
    corrected : {
      day: record ? record['ldm-corrected-day'] : '',
      month: record ? record['ldm-corrected-month']: '',
      year: record ? record['ldm-corrected-year'] : ''
    }
  }

};

const addCorrectedDate = (req, dateData) => {
  const nameAndPath = req.params.nameAndPath;
  const record = dateData.find( item => nameAndPath == `${item.path}${item.name}` )

  const correctedDay = req.body["correctedDate-day"];
  const correctedMonth = req.body["correctedDate-month"];
  const correctedYear = req.body["correctedDate-year"];

  if(correctedDay && correctedMonth && correctedYear){

    record["ldm-corrected-day"] = correctedDay
    record["ldm-corrected-month"] = correctedMonth
    record["ldm-corrected-year"] = correctedYear
  }

  return dateData;
};

function findMatches(data, searchPattern, keys){
  const partialMatches = data.map(item => {
    const matches = [];

    keys.forEach(key => {
      const value = item[key];
      if (value) {
        let startIdx = -1;
        let endIdx = -1;
        let currentIndex = value.toLowerCase().indexOf(searchPattern.toLowerCase());

        while (currentIndex !== -1) {
          startIdx = currentIndex;
          endIdx = startIdx + searchPattern.length - 1;

          matches.push({
            indices: [[startIdx, endIdx]],
            value,
            key,
          });
          // Continue searching for the next occurrence
          currentIndex = value.indexOf(searchPattern, currentIndex + 1);
        }
      }
    });

    if (matches.length > 0) {
      return {
        item,
        matches,
      };
    }

    return null;
  }).filter(match => match !== null);

  return partialMatches
}

const table = function (req, baseURL, recordsMetdata) {
  const perPage = 100
  const data = req.session.data;
  const version = req.params.version
  const sort = req.query.sort || "directory";
  const filterByLetter = req.query.filterLetter
  const filterByDirectory = req.query.filterDirectory
  const searchPattern = req.query.search?.trim()
  const searchFilePattern = req.query.searchName?.trim()
  let page = req.query.pg

  data.recordsMetadata = recordsMetdata;
  data.recordsCount = data.recordsMetadata.length;

  // Using Set to remove duplicates.
  data.directories = [...new Set(data.recordsMetadata.map((item) => item.path))].sort().map(item => {
    return {text: item.split("/").join(" / "), value: item, selected: item === decodeURIComponent(filterByDirectory)}
  });
  data.directories.unshift({value: "", text:""})

  data.currentDirFilter = data.directories.find(item => item.selected === true)?.text
  data.currentAlphaFilter = ""

  // SEARCH
  if(searchPattern || searchFilePattern){
    const keys = searchFilePattern ? ['name'] : ['name', 'path'];
    const matches = findMatches(data.recordsMetadata, searchPattern||searchFilePattern, keys);
    data.recordsMetadata = []

    matches.forEach((res)=>{
      data.recordsMetadata.push(Object.assign(res.item, {matches:res.matches}))
    })
    data.searchPattern = searchPattern
    data.searchFilePattern = searchFilePattern
    data.recordsCount = data.recordsMetadata.length
  } else {
    data.recordsMetadata = data.recordsMetadata.map((item) =>{
      if(item.hasOwnProperty('matches')) delete item.matches;
      return item
    })
    data.searchPattern = "";
    data.searchFilePattern = "";
  }

  // FILTER BY LETTER
  if(filterByLetter){
    data.currentAlphaFilter = filterByLetter
    data.recordsMetadata = data.recordsMetadata.filter( r => String(r.name[0]).toLocaleLowerCase() == filterByLetter.toLocaleLowerCase())
  }

  // FILTER BY DIRECTORY
  if(filterByDirectory){
    data.recordsMetadata = data.recordsMetadata.filter( r => {
      return String(r.path).toLocaleLowerCase() == decodeURIComponent(filterByDirectory).toLocaleLowerCase()
    })
    data.recordsCount = data.recordsMetadata.length
  }

  // SORT
  if(sort == "directory"){
    // by path, then name
    data.recordsMetadata = data.recordsMetadata.sort( (r1, r2) => {
      // Compare by path first
      if (r1.path < r2.path) return -1;
      if (r1.path > r2.path) return 1;

      // If paths are equal, compare by name
      if (r1.name < r2.name) return -1;
      if (r1.name > r2.name) return 1;

      // Objects are equal in both properties
      return 0;
    })
  }

  if(sort == "file"){
    // by name
    data.recordsMetadata = data.recordsMetadata.sort( (r1, r2) => {
      return r1.name > r2.name ? 1 : -1
    })
  }

  const searchQuery = searchPattern ? `&search=${searchPattern}` : "";
  const searchFileQuery = searchFilePattern ? `&searchName=${searchFilePattern}` : "";
  const filterQuery = filterByLetter ? `&filterLetter=${filterByLetter}` : "";
  const filterDirQuery = filterByDirectory ? `&filterDirectory=${filterByDirectory}` : "";
  const url = (pg) => `${baseURL}?sort=${sort}&pg=${pg}${filterQuery}${searchQuery}${searchFileQuery}${filterDirQuery}`
  data.urlNoSearchFile = `${baseURL}?sort=${sort}&pg=1${filterDirQuery}`
  data.urlNoDirectory = `${baseURL}?sort=${sort}&pg=1${searchFileQuery}`


  // PAGINATE
  data.currentPage = page || 1;
  data.totalPages = Math.ceil(data.recordsMetadata.length / perPage);
  data.previousPage = (parseInt(data.currentPage) > 1) ? url(parseInt(data.currentPage)-1) : false;
  data.nextPage = parseInt(data.currentPage)+1 > data.totalPages ? false : url(parseInt(data.currentPage)+1);


  data.pages = []
  for(let i = 1; i <= data.totalPages; i++){
    data.pages.push({
      number: i,
      current: data.currentPage == i,
      href: url(i)
    })
  }

  if(data.pages.length === 0)
    data.pages = [{number: 1, current: true}]

  data.recordsMetadata = data.recordsMetadata.slice((data.currentPage-1)*perPage, data.currentPage*perPage);

  return {
    data : data
  };
};


module.exports = { table, addCorrectedDate, editPageData };
