module.exports = function (env) {
  /**
   * Instantiate object used to store the methods registered as a
   * 'filter' (of the same name) within nunjucks. You can override
   * gov.uk core filters by creating filter methods of the same name.
   * @type {Object}
   */
  var filters = {};

  /* ------------------------------------------------------------------
    add your methods to the filters obj below this comment block:
    @example:

    filters.sayHi = function(name) {
        return 'Hi ' + name + '!'
    }

    Which in your templates would be used as:

    {{ 'Paul' | sayHi }} => 'Hi Paul'

    Notice the first argument of your filters method is whatever
    gets 'piped' via '|' to the filter.

    Filters can take additional arguments, for example:

    filters.sayHi = function(name,tone) {
      return (tone == 'formal' ? 'Greetings' : 'Hi') + ' ' + name + '!'
    }

    Which would be used like this:

    {{ 'Joel' | sayHi('formal') }} => 'Greetings Joel!'
    {{ 'Gemma' | sayHi }} => 'Hi Gemma!'

    For more on filters and how to write them see the Nunjucks
    documentation.

  ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------
    keep the following line to return your filters to the app
  ------------------------------------------------------------------ */

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

  filters.langNameFromCode = function (code, languages) {
    const language = languages.find((l) => l.alpha2 === code);
    return language ? language.English : "";
  };

  filters.decodeFilename = function (encodedName) {
    const fileName = encodedName.split("-").pop();

    return decodeURI(fileName);
  };
  return filters;
};
