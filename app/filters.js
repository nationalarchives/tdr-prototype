const govukPrototypeKit = require("govuk-prototype-kit");
const addFilter = govukPrototypeKit.views.addFilter;

const filters = {};
const requiredClosureFields = [
  "addClosure-foi-asserted-day",
  "addClosure-foi-asserted-month",
  "addClosure-foi-asserted-year",
  "addClosure-closure-start-day",
  "addClosure-closure-start-month",
  "addClosure-closure-start-year",
  "addClosure-closure-period",
  "addClosure-foi_id_selection",
];

function findById(data, id) {
  function iter(a) {
    if (a.id == id) {
      result = a;
      return true;
    }
    return Array.isArray(a.children) && a.children.some(iter);
  }

  let result;
  data.some(iter);
  return result;
}

filters.isFieldMissing = function (fields, data) {
  fields = Array.isArray(fields) ? fields : [fields];

  return fields.some((field) => {
    return data[field] === undefined || data[field] === "";
  });
};

filters.notMatchingDescription = function (files, descriptiveFiles) {
  return Array.from(files).some((selectedFile1) => {
    return Array.from(files).some((selectedFile2) => {
      // If any are not indentical
      if (selectedFile1 != selectedFile2)
        return (
          descriptiveFiles[selectedFile1]["addDescriptive-description"] !==
          descriptiveFiles[selectedFile2]["addDescriptive-description"]
        );
    });
  });
};

filters.hasDescription = function (files, descriptiveFiles) {
  if (descriptiveFiles === undefined) return false;
  return Array.from(files).every((fileIndex) => {
    return (
      descriptiveFiles[fileIndex] &&
      descriptiveFiles[fileIndex]["addDescriptive-description"] &&
      descriptiveFiles[fileIndex]["addDescriptive-description"] !== ""
    );
  });
};

filters.filterOpen = function (selection, closed) {
  if (selection === undefined) return [];
  return selection.filter((fn) => {
    return closed[fn] === undefined;
  });
};

filters.filterClosed = function (selection, closed) {
  if (selection === undefined) return [];
  return selection.filter((fn) => {
    return closed[fn] !== undefined;
  });
};

filters.getFilename = function (id, allFiles) {
  if (id === undefined) return;
  return findById(allFiles, id).name;
};

filters.getFilenames = function (selection, allFiles) {
  if (selection === undefined) return [];
  return selection.map((id) => findById(allFiles, id).name);
};

filters.getFileExtensionById = function (fileId, allFiles) {
  const filename = findById(allFiles, fileId)?.name;
  return filename ? filename.match(/\.[^/.]+$/, "") : "";
};

filters.getFileExtension = function (filename) {
  return filename ? filename.match(/\.[^/.]+$/, "") : "";
};

filters.langNameFromCode = function (code, languages) {
  const language = languages.find((l) => l.alpha2 === code);
  return language ? language.English : "";
};

filters.decodeFilename = function (encodedName) {
  const fileName = encodedName.split("-").pop();

  return decodeURI(fileName);
};

filters.getMonthName = function (monthNumber, len) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("en-GB", { month: len || "long" });
};

filters.addYearsToDate = function (ukDateStr, yearsToAdd) {
  const [day, month, year] = ukDateStr.split("/").map(Number);
  const dateObj = new Date(year, month - 1, day);
  dateObj.setFullYear(dateObj.getFullYear() + parseInt(yearsToAdd));
  return dateObj.toLocaleDateString("en-GB");
}

filters.sortBy = function(array, key) {
  return array.sort((a, b) => {
    return a[key].localeCompare(b[key]);
  })
}

filters.getPath = function(id, allFiles, currentPath = "") {
  for (const item of allFiles) {
    const newPath = currentPath ? currentPath + '/' + item.name : item.name;

    if (item.id === id) {
      return newPath;
    }

    if (item.children && item.children.length > 0) {
      const foundPath = filters.getPath(id, item.children, newPath);
      if (foundPath) {
        return foundPath;
      }
    }
  }

  return null;
}

filters.returnFileArray = function (dict, allFiles) {
  const copy = Object.values(dict);
  let i = 0;
  for(var key in dict){
    copy[i].id = key;
    copy[i].path = filters.getPath(key, allFiles);
    i++;
  }
  return copy;
};

filters.returnClosedRecordsArray = function (dict, allFiles) {
  dict = dict || {}
  const copy = Object.values(dict);
  let i = 0;
  for(var key in dict){
    const fileObj = filters.getFileObject(key, allFiles);
    copy[i].id = key;
    copy[i].path = fileObj.path;
    copy[i].name = fileObj.name;
    i++;
  }
  return copy;
};

filters.hasRequiredMetadata = function (record) {
  return requiredClosureFields.every(key => {
    return !!record[key];
  });
};

filters.split = function (str, by) {
  const arr = str.toString().split(by);
  if(arr[arr.length-1] == "")
    arr.pop()
  return arr;
};

function addSpanTags(inputString, indicesArray, className, offsetIndex) {
  let result = '';
  offset = offsetIndex || 0;

  // Iterate through the indices array and add <span> tags
  for (const indices of indicesArray) {
    const startIndex = indices[0];
    const endIndex = indices[1];

    if(startIndex >= offsetIndex){

      // Add the substring before the current set of indices
      result += inputString.substring(0, startIndex-offsetIndex);

      // Add the <span> tags around the current set of indices
      result += `<span class="${className}">${inputString.substring(startIndex-offsetIndex, endIndex-offsetIndex + 1)}</span>`;

      // Update the input string for the next iteration
      inputString = inputString.substring(endIndex-offsetIndex + 1);
    }
  }

  // Add the remaining substring after the last set of indices
  result += inputString;

  return result;
}

filters.highlightMatches = function (value, matches, key, offsetIndex, fullDirName) {

  if(!matches) return value;
  offsetIndex = offsetIndex >= 0 ? offsetIndex : false;

  let ms = matches.filter((match)=> {
      return match.key == key && (
        (offsetIndex == false && match.value == value) ||
        (offsetIndex >= 0 && match.value == fullDirName && value == match.value.substr(offsetIndex, value.length))
      )
  })

  return ms.length > 0 ? addSpanTags(value,  ms[0].indices, "highlight", offsetIndex) : value;
}

filters.countInDir = function (currDir, recordsMetadata, pathExcludesFilename) {
  if(currDir.charAt(currDir.length-1) == "/"){
    currDir = currDir.slice(0, -1);
  }
  return Object.entries(recordsMetadata).filter(([key, props]) => {
    let path = props.path
    if(path.charAt(path.length-1) == "/"){
      path = path.slice(0, -1);
    }
    if(!pathExcludesFilename){
      path = path.split("/");
      path.pop();
      path = path.join("/").trim()
    }
    return path == currDir;
  }).length;
};

filters.stringToArray = function (letters) {
  return Array.from(letters);
}

filters.convertFlatToTree = function(recordsData) {
  const result = [];

  recordsData.forEach(item => {
    const pathSegments = item.path.split('/').filter(item => item !== "");
    let currentLevel = result;

    pathSegments.forEach((segment, i) => {
      const foundChild = currentLevel.find(child => child.name === segment)
      if (!currentLevel.some(child => child.name === segment)) {
        currentLevel.push({
          children: [],
          name: segment,
          type:  "node"
        });
        currentLevel = currentLevel[currentLevel.length-1].children;
      } else {
        currentLevel = foundChild.children;
      }
    });

    currentLevel.push({
      name: item.name,
      type:  "item",
      path: item.path
    })
  });

  return result;
};

filters.getFileObject = function(fileId, data){
  return data.find(item => {
    return fileId === encodeURIComponent(item.path+item.name)
  });
}

for (let name in filters) {
  addFilter(name, filters[name]);
}

module.exports = { convertFlatToTree : filters.convertFlatToTree }
