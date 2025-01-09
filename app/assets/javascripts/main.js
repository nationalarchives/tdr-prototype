/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@nationalarchives/tdr-components/dist/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@nationalarchives/tdr-components/dist/index.js ***!
  \*********************************************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var r, n; }}(self,(()=>(()=>{"use strict";var e={806:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ButtonDisabled=void 0;t.ButtonDisabled=function(e){var t=this;this.initialiseListeners=function(){t.button.addEventListener("click",t.handleClick)},this.handleClick=function(e){"true"===t.button.getAttribute("aria-disabled")&&e.preventDefault()},this.button=e}},558:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MultiSelectSearch=void 0;t.MultiSelectSearch=function(e){var t,n,r,i,l,o=this;this.timeoutId=null,this.initialise=function(){var e;null===(e=o.filter)||void 0===e||e.addEventListener("keyup",(function(e){e instanceof KeyboardEvent&&o.handleKeyUp(e)})),o.list.addEventListener("change",o.processInputChange);var t=o.getSelectedItems().length,n=o.getVisibleItems().length;null!==o.selectedCount&&o.updateSelectedCount(o.selectedCount,t),null!==o.filterCount&&o.updateFilteredCount(o.filterCount,t,n)},this.handleKeyUp=function(e){e.stopPropagation(),"Enter"!==e.key?(clearTimeout(Number(o.timeoutId)),o.timeoutId=setTimeout(o.processKeyUpTimeout,300)):e.preventDefault()},this.cleanString=function(e){return(e=(e=(e=e.replace(/&/g,"and")).replace(/[’',:–-]/g,"")).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).trim().replace(/\s\s+/g," ").toLowerCase()},this.filterItems=function(e,t){var n=o.cleanString(e),r=o.getSelectedItems(),i=0;for(i=0;i<t.length;i++)-1!==o.labels[i].search(n)&&r.push(i);for(i=0;i<t.length;i++)o.list.children[i].classList.add("is-hidden");for(i=0;i<r.length;i++)o.list.children[r[i]].classList.remove("is-hidden")},this.updateSelectedCount=function(e,t){e.textContent="".concat(t," selected")},this.updateFilteredCount=function(e,t,n){var r="".concat(1===n?o.config.copySingle:o.config.copyMultiple," displayed"),i="".concat(1===t?o.config.copySingle:o.config.copyMultiple," selected"),l="".concat(n," ").concat(r,", ").concat(t," ").concat(i);e.innerHTML=l},this.setupHeight=function(){if(null!==o.container){var e=o.container.clientHeight,t=o.getAbsoluteHeight(o.list);if(t<e+50)o.container.style.height=t+"px";else{var n=o.getInViewport(o.list.children).pop();if(void 0!==n){var r=(null==n?void 0:n.offsetTop)+n.clientHeight/1.5;o.container.style.height=r+"px"}}}},this.getAbsoluteHeight=function(e){var t=window.getComputedStyle(e),n=parseFloat(t.marginTop)+parseFloat(t.marginBottom);return Math.ceil(e.offsetHeight+n)},this.isInViewport=function(e){if(null===o.container)return!1;var t=o.container.clientHeight,n=o.container.getBoundingClientRect().top;return e.getBoundingClientRect().top-n<t},this.getInViewport=function(e){return Array.from(e).filter(o.isInViewport)},this.getSelectedItems=function(){var e=[];return Array.from(o.inputs).forEach((function(t,n){t.checked&&e.push(n)})),e},this.getVisibleItems=function(){for(var e=[],t=0;t<o.list.children.length;t++)o.list.children[t].classList.contains("is-hidden")||e.push(t);return e},this.processKeyUpTimeout=function(){if(null!==o.filter){o.filterItems(o.filter.value,o.list.children);var e=o.getSelectedItems().length,t=o.getVisibleItems().length;null!==o.filterCount&&o.updateFilteredCount(o.filterCount,e,t)}},this.processInputChange=function(){var e=o.getSelectedItems().length,t=o.getVisibleItems().length;null!==o.selectedCount&&o.updateSelectedCount(o.selectedCount,e),null!==o.filterCount&&o.updateFilteredCount(o.filterCount,e,t)},this.container=e.querySelector(".js-container"),this.list=e.querySelector("ul"),this.inputs=e.querySelectorAll("input[type=checkbox]"),this.filter=e.querySelector("input[type=text]"),this.filterCount=e.querySelector(".js-filter-count"),this.selectedCount=e.querySelector(".js-selected-count"),this.config={copySingle:null!==(n=null===(t=e.dataset.copySingle)||void 0===t?void 0:t.trim())&&void 0!==n?n:"",copyMultiple:null!==(i=null===(r=e.dataset.copyMultiple)||void 0===r?void 0:r.trim())&&void 0!==i?i:""},this.labels=[];for(var u=0;u<this.list.children.length;u++)this.labels.push(this.cleanString(null!==(l=this.list.children[u].textContent)&&void 0!==l?l:""));e.setAttribute("data-module-active","true")}},922:(e,t)=>{var n,r;Object.defineProperty(t,"__esModule",{value:!0}),t.NestedNavigation=t.InputTypeHtmlAttrValue=t.InputType=void 0,function(e){e.radios="radios",e.checkboxes="checkboxes"}(n||(t.InputType=n={})),function(e){e.radios="radio",e.checkboxes="checkbox"}(r||(t.InputTypeHtmlAttrValue=r={}));t.NestedNavigation=function(e){var t=this;this.rememberExpanded=!1,this.getCurrentFocus=function(){return t.currentFocus},this.getTree=function(){return t.tree},this.initialiseFormListeners=function(e){null!==t.tree&&t.tree.addEventListener("keydown",(function(n){n instanceof KeyboardEvent&&t.handleKeyDown(n,e)}));var r=t.tree.querySelectorAll(".js-tree__expander--".concat(n.checkboxes));Array.from(r).forEach((function(n){n.addEventListener("click",(function(n){var r=n.currentTarget;r.id.includes("expander")||(r=r.previousElementSibling),t.handleExpanders(r,e),n.preventDefault(),n.stopPropagation()}))})),t.tree.querySelectorAll('[role="group"]').forEach((function(n){n.id.includes(e)&&t.updateExpanded(n,e)})),t.tree.querySelectorAll("[role=treeitem]").forEach((function(r){e===n.radios&&r.id.includes("folder")||r.id.includes(e)&&r.addEventListener("click",(function(n){n.currentTarget instanceof HTMLLIElement&&!(n.target instanceof HTMLLabelElement)&&(t.setSelected(n.currentTarget,e),t.setFocusToItem(n.currentTarget)),n.stopImmediatePropagation()}))})),t.removeFocusFromInputs(e);var i=t.tree.querySelector("[role=treeitem]");null!==i&&(i.tabIndex=0,t.currentFocus=i)},this.removeFocusFromInputs=function(e){t.tree.querySelectorAll("input[type=".concat(r[e],"]")).forEach((function(e){e.tabIndex=-1,e.setAttribute("aria-hidden","true")}))},this.updateFocus=function(e){null!=e?t.setFocusToItem(e):t.setFocusToItem(t.tree.firstElementChild)},this.updateExpanded=function(e,n){var r=e.getAttribute("id");null!==r&&(t.getExpanded(n).includes(r.replace("node-group","list"))||e.parentNode.setAttribute("aria-expanded","false"))},this.getExpanded=function(e){var t=localStorage.getItem("".concat(e,"-state"));return null!==t?JSON.parse(t).expanded:[]},this.allChildren=function(e,n){for(var r=e.children.length-1;r>=0;r--){var i=e.children.item(r);null!==i&&("LI"===i.nodeName&&n.push(i),Array.from(i.children).filter((function(e){return"UL"===e.nodeName})).forEach((function(e){return t.allChildren(e,n)})))}return n},this.toggleNode=function(e,n,r){var i=t.getExpanded(r);"false"===e.getAttribute("aria-expanded")?(e.setAttribute("aria-expanded","true"),i.push(n)):(e.setAttribute("aria-expanded","false"),i.splice(i.indexOf(n))),t.rememberExpanded&&localStorage.setItem("".concat(r,"-state"),JSON.stringify({expanded:i}))},this.displaySelected=function(e){var n;t.fileSelected=null!==(n=t.fileSelected)&&void 0!==n?n:document.getElementById("".concat(t.tree.id,"-selected")),e=""===e?"No file selected":e,null!==t.fileSelected&&(t.fileSelected.textContent=e)},this.setSelected=function(e,r){var i,l,o,u;if(e.querySelectorAll("ul").length>0&&r===n.radios)t.toggleNode(e,e.id,n.radios);else{var s="true"===e.getAttribute("aria-selected");e.setAttribute("aria-selected",s?"false":"true");var c=e.querySelector("input");null!==c&&(c.checked=!s);var a=e.querySelector("label");if(null!==(null===(i=null==a?void 0:a.firstChild)||void 0===i?void 0:i.textContent)?t.displaySelected(s?"":null!==(u=null===(o=null===(l=null==a?void 0:a.firstChild)||void 0===l?void 0:l.textContent)||void 0===o?void 0:o.trim())&&void 0!==u?u:""):t.displaySelected(""),r===n.checkboxes&&e.setAttribute("aria-checked",s?"false":"true"),r!==n.radios||s||t.tree.querySelectorAll("li[aria-selected=true]").forEach((function(t){if(t.id!==e.id){t.setAttribute("aria-selected","false");var n=t.querySelector("input");null!==n&&(n.checked=!1)}})),r===n.checkboxes){if(e.querySelectorAll("ul").length>0){var d=document.querySelector("#".concat(r,"-node-group-").concat(e.id.replace("".concat(r,"-list-"),"")));if(null!=d)for(var f=0,p=t.allChildren(d,[]);f<p.length;f++){var h=p[f];h.setAttribute("aria-selected",s?"false":"true"),h.setAttribute("aria-checked",s?"false":"true");var v=h.getElementsByTagName("input")[0];null!==v&&(v.checked=!s)}}var g=e.closest("[role=group]");t.setParentState(g)}}},this.setParentState=function(e){var n;if(null!==e){var r=t.allChildren(e,[]),i=r.filter((function(e){return"true"===e.getAttribute("aria-selected")})).length,l=e.parentNode;if(null!==l&&"tree"!==e.getAttribute("role")){i>0&&i<r.length&&l.setAttribute("aria-checked","mixed"),i===r.length&&(l.setAttribute("aria-checked","true"),l.setAttribute("aria-selected","true")),0===i&&(l.setAttribute("aria-selected","false"),l.setAttribute("aria-checked","false"));var o=null===(n=e.parentElement)||void 0===n?void 0:n.closest("[role=group]");null!=o&&t.setParentState(o)}}},this.setFocusToItem=function(e){Array.from(t.treeItems).forEach((function(e){e.tabIndex=-1})),null!=e&&(e.tabIndex=0,e.focus(),t.currentFocus=e)},this.setFocusToLastExpandedChild=function(e){if(null!==e&&"true"===e.getAttribute("aria-expanded")){var n=e.querySelector(":scope > ul > li:last-child");t.setFocusToLastExpandedChild(n)}else null!==e&&t.setFocusToItem(e)},this.setFocusToPreviousItem=function(e){if(null!==e){var n=e.closest("li");null!==n&&(null!==n.previousElementSibling?t.setFocusToLastExpandedChild(n.previousElementSibling):null!==n.parentElement&&t.setFocusToItem(n.parentElement.closest("li")))}},this.setFocusToNextParent=function(e){if("tree"!==e.getAttribute("role")){var n=e.closest("li");null!==n&&(null!==n.nextElementSibling?t.setFocusToItem(n.nextElementSibling):t.setFocusToNextParent(n.parentElement))}},this.setFocusToNextItem=function(e){if(null!=e){var n=e.closest("li");if(null!==n)if("true"===n.getAttribute("aria-expanded")){var r=n.querySelector("ul > li");null!==r&&t.setFocusToItem(r)}else null!==n.nextElementSibling?t.setFocusToItem(n.nextElementSibling):null!==n.parentElement&&t.setFocusToNextParent(n.parentElement)}},this.handleKeyDown=function(e,n){var r=!1;switch(e.key){case"Enter":case" ":null!==t.currentFocus&&(t.setSelected(t.currentFocus,n),t.setFocusToItem(t.currentFocus)),r=!0;break;case"ArrowUp":t.setFocusToPreviousItem(t.currentFocus),r=!0;break;case"ArrowDown":t.setFocusToNextItem(t.currentFocus),r=!0;break;case"ArrowRight":t.processArrowRightEvent(e,n),r=!0;break;case"ArrowLeft":t.processArrowLeftEvent(e,n),r=!0;break;case"Home":t.setFocusToItem(t.tree.firstElementChild),r=!0;break;case"End":t.processEndEvent(e),r=!0}r&&(e.preventDefault(),e.stopPropagation())},this.processEndEvent=function(e){for(var n,r=t.tree.lastElementChild;"true"===(null==r?void 0:r.getAttribute("aria-expanded"));)r=null===(n=r.lastElementChild)||void 0===n?void 0:n.lastElementChild;t.setFocusToItem(r),e.preventDefault()},this.processArrowLeftEvent=function(e,n){var r,i,l;if("true"===(null===(r=t.currentFocus)||void 0===r?void 0:r.getAttribute("aria-expanded")))t.toggleNode(t.currentFocus,t.currentFocus.id,n);else if("tree"!==(null===(i=t.currentFocus)||void 0===i?void 0:i.getAttribute("role"))){var o=null===(l=t.currentFocus)||void 0===l?void 0:l.parentElement;null!=o&&t.setFocusToItem(o.closest("li"))}e.preventDefault()},this.processArrowRightEvent=function(e,n){var r,i;"false"===(null===(r=t.currentFocus)||void 0===r?void 0:r.getAttribute("aria-expanded"))?t.toggleNode(t.currentFocus,t.currentFocus.id,n):"true"===(null===(i=t.currentFocus)||void 0===i?void 0:i.getAttribute("aria-expanded"))&&t.setFocusToNextItem(t.currentFocus),e.preventDefault()},this.handleExpanders=function(e,n){var r=e.id.replace("expander-","node-group-"),i=t.tree.querySelector("#".concat(r));if(null!==i){var l=i.parentNode;null!=l&&(t.toggleNode(l,e.id.replace("expander-",""),n),t.setFocusToItem(l))}},this.tree=e,this.treeItems=this.tree.querySelectorAll("[role=treeitem]"),this.currentFocus=null,this.rememberExpanded="true"===e.dataset.rememberExpanded}},976:function(e,t,n){var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n);var i=Object.getOwnPropertyDescriptor(t,n);i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[n]}}),Object.defineProperty(e,r,i)}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),t.ButtonDisabled=t.MultiSelectSearch=void 0,i(n(922),t);var l=n(558);Object.defineProperty(t,"MultiSelectSearch",{enumerable:!0,get:function(){return l.MultiSelectSearch}});var o=n(806);Object.defineProperty(t,"ButtonDisabled",{enumerable:!0,get:function(){return o.ButtonDisabled}})}},t={};return function n(r){var i=t[r];if(void 0!==i)return i.exports;var l=t[r]={exports:{}};return e[r].call(l.exports,l,l.exports,n),l.exports}(976)})()));

/***/ }),

/***/ "./app/assets/typescript/folder-upload.ts":
/*!************************************************!*\
  !*** ./app/assets/typescript/folder-upload.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***************************************!*\
  !*** ./app/assets/typescript/main.ts ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nationalarchives_tdr_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @nationalarchives/tdr-components */ "./node_modules/@nationalarchives/tdr-components/dist/index.js");
/* harmony import */ var _nationalarchives_tdr_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_nationalarchives_tdr_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _folder_upload__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./folder-upload */ "./app/assets/typescript/folder-upload.ts");



window.addEventListener("DOMContentLoaded", (event) => {
    const multiSelects = document.querySelectorAll("[data-module=multi-select-search]");
    multiSelects.forEach((ms) => {
        const multiSelectSearch = new _nationalarchives_tdr_components__WEBPACK_IMPORTED_MODULE_0__.MultiSelectSearch(ms);
        multiSelectSearch.initialise();
    });
    const tree = document.querySelector("[role=tree]");
    if (tree != null) {
        const nestedNavigation = new _nationalarchives_tdr_components__WEBPACK_IMPORTED_MODULE_0__.NestedNavigation(tree);
        nestedNavigation.initialiseFormListeners(_nationalarchives_tdr_components__WEBPACK_IMPORTED_MODULE_0__.InputType.radios);
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