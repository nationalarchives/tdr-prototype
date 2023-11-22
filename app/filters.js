const govukPrototypeKit = require("govuk-prototype-kit");
const addFilter = govukPrototypeKit.views.addFilter;

const marked = require('marked');

const filters = {};

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

filters.markdown = function (markdown, inline=false) {

  marked.Renderer.prototype.paragraph = (text) => {
    return `<p class="govuk-body">${text}</p>\n`;
  };

  marked.Renderer.prototype.list = (body, ordered, start) => {
    const type = ordered ? 'ol' : 'ul';
    const startatt = (ordered && start !== 1) ? (' start="' + start + '"') : '';
    return '<' + type + startatt + ' class="govuk-list govuk-list--bullet">\n' + body + '</' + type + '>\n';
  }

  let html = "";
  if(inline == true){
    html = marked.parseInline(markdown, [])
  } else {
    html = marked.parse(markdown);
  }
  return html;
};

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

filters.getFileExtension = function (fileId, allFiles) {
  const filename = findById(allFiles, fileId)?.name;
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

filters.getMonthName = function (monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);
  return date.toLocaleString("en-GB", { month: "long" });
};

/*
 * dateString - expected format is YYYY-MM-DD
 */
filters.formatDate = function (dateString) {
  if(!dateString) return ""
  const [year, month, day] = dateString.split('-');

  const monthDate = new Date();
  monthDate.setMonth(parseInt(month)-1);
  return `${parseInt(day)} ${monthDate.toLocaleString("en-GB", { month: "short" })} ${parseInt(year)}`;
};

for (let name in filters) {
  addFilter(name, filters[name]);
}
