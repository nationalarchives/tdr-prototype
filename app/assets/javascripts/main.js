/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app/assets/typescript/folder-upload.ts":
/*!************************************************!*\
  !*** ./app/assets/typescript/folder-upload.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FolderUpload: () => (/* binding */ FolderUpload)
/* harmony export */ });
function isFile(entry) {
    return entry.file !== undefined;
}
function isDirectory(entry) {
    return !isFile(entry);
}
class FolderUpload {
    constructor(root) {
        this.initialise = () => {
            this.addDropzoneHighlighter();
            this.addButtonHighlighter();
            this.addFolderListener();
        };
        this.addFolderListener = () => {
            this.dropzone.addEventListener("drop", this.handleDroppedItems);
            this.itemRetriever.addEventListener("change", this.handleSelectedItems);
        };
        this.addDropzoneHighlighter = () => {
            this.dropzone.addEventListener("dragover", (ev) => {
                ev.preventDefault();
                this.dropzone.classList.add("drag-and-drop__dropzone--dragover");
            });
            this.dropzone.addEventListener("dragleave", () => {
                this.removeDragover();
            });
        };
        this.addButtonHighlighter = () => {
            const itemRetrieverLabel = this.itemRetriever.labels[0];
            this.itemRetriever.addEventListener("focus", () => {
                itemRetrieverLabel.classList.add("drag-and-drop__button--highlight");
            });
            this.itemRetriever.addEventListener("blur", () => {
                itemRetrieverLabel.classList.remove("drag-and-drop__button--highlight");
            });
        };
        this.removeDragover = () => {
            this.dropzone.classList.remove("drag-and-drop__dropzone--dragover");
        };
        this.handleDroppedItems = async (ev) => {
            var _a;
            ev.preventDefault();
            const items = (_a = ev.dataTransfer) === null || _a === void 0 ? void 0 : _a.items;
            const droppedItem = items[0];
            const webkitEntry = droppedItem.webkitGetAsEntry();
            const filesAndFolders = await this.getAllFiles(webkitEntry, []);
            this.displaySelectionSuccessMessage(webkitEntry.name, filesAndFolders.filter((f) => isFile(f)).length);
        };
        this.handleSelectedItems = async (ev) => {
            ev.preventDefault();
            const form = this.itemRetriever.closest("form");
            const selectedFiles = this.convertFilesToIfilesWithPath(form.files.files);
            const parentFolder = this.getParentFolderName(selectedFiles);
            this.displaySelectionSuccessMessage(parentFolder, selectedFiles.filter((f) => isFile(f)).length);
        };
        this.getEntryBatch = (reader) => {
            return new Promise((resolve) => {
                reader.readEntries((entries) => resolve(entries));
            });
        };
        this.getFileFromEntry = (entry) => {
            return new Promise((resolve) => {
                entry.file((file) => resolve({
                    file,
                    path: entry.fullPath,
                }));
            });
        };
        this.getEntriesFromReader = async (reader) => {
            let allEntries = [];
            let nextBatch = await this.getEntryBatch(reader);
            while (nextBatch.length > 0) {
                allEntries = allEntries.concat(nextBatch);
                nextBatch = await this.getEntryBatch(reader);
            }
            return allEntries;
        };
        this.getAllFiles = async (entry, fileInfoInput) => {
            const reader = entry.createReader();
            const entries = await this.getEntriesFromReader(reader);
            if (entry.isDirectory && entries.length === 0) {
                fileInfoInput.push({ path: entry.fullPath });
            }
            for (const entry of entries) {
                if (entry.isDirectory) {
                    await this.getAllFiles(entry, fileInfoInput);
                }
                else {
                    const file = await this.getFileFromEntry(entry);
                    fileInfoInput.push(file);
                }
            }
            return fileInfoInput;
        };
        this.displaySelectionSuccessMessage = (folderName, numberOfFiles) => {
            this.removeDragover();
            this.itemRetriever.blur();
            this.selected.classList.remove("govuk-visually-hidden");
            let selectedContentFragment = document.createRange()
                .createContextualFragment(this.selected.innerHTML);
            selectedContentFragment.querySelectorAll(".js-drag-and-drop-folder-name").forEach((el) => {
                el.textContent = folderName;
            });
            selectedContentFragment.querySelector(".js-drag-and-drop-no-of-files").textContent = numberOfFiles.toString();
            this.selected.innerHTML = "";
            this.selected.appendChild(selectedContentFragment);
        };
        this.itemRetriever = root.querySelector(".js-drag-and-drop-input");
        this.dropzone = root.querySelector(".js-drag-and-drop-zone");
        this.selected = root.querySelector(".js-drag-and-drop-selected");
    }
    getParentFolderName(folder) {
        const firstItem = folder.filter((f) => isFile(f))[0];
        const relativePath = firstItem.path;
        const splitPath = relativePath.split("/");
        return splitPath[0];
    }
    convertFilesToIfilesWithPath(files) {
        return [...files].map((file) => ({
            file,
            path: file.webkitRelativePath,
        }));
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***************************************!*\
  !*** ./app/assets/typescript/main.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
Object(function webpackMissingModule() { var e = new Error("Cannot find module '@nationalarchives/tdr-components'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _folder_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./folder-upload */ "./app/assets/typescript/folder-upload.ts");



window.addEventListener("DOMContentLoaded", (event) => {
    const multiSelects = document.querySelectorAll("[data-module=multi-select-search]");
    multiSelects.forEach((ms) => {
        const multiSelectSearch = new Object(function webpackMissingModule() { var e = new Error("Cannot find module '@nationalarchives/tdr-components'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(ms);
        multiSelectSearch.initialise();
    });
    const tree = document.querySelector("[role=tree]");
    if (tree != null) {
        const nestedNavigation = new Object(function webpackMissingModule() { var e = new Error("Cannot find module '@nationalarchives/tdr-components'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(tree);
        nestedNavigation.initialiseFormListeners(Object(function webpackMissingModule() { var e = new Error("Cannot find module '@nationalarchives/tdr-components'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).radios);
    }
    const folderUpload = document.querySelector("[data-tdr-module=folder-upload]");
    if (folderUpload) {
        const fu = new _folder_upload__WEBPACK_IMPORTED_MODULE_1__.FolderUpload(folderUpload);
        fu.initialise();
    }
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map