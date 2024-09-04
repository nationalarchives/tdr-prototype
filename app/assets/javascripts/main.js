/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@nationalarchives/tdr-components/dist/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@nationalarchives/tdr-components/dist/index.js ***!
  \*********************************************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var s, i; }}(self,(()=>(()=>{"use strict";var e,t,i={d:(e,t)=>{for(var s in t)i.o(t,s)&&!i.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},s={};i.r(s),i.d(s,{ButtonDisabled:()=>n,InputType:()=>e,InputTypeHtmlAttrValue:()=>t,MultiSelectSearch:()=>l,NestedNavigation:()=>r}),function(e){e.radios="radios",e.checkboxes="checkboxes"}(e||(e={})),function(e){e.radios="radio",e.checkboxes="checkbox"}(t||(t={}));class r{constructor(i){this.rememberExpanded=!1,this.getCurrentFocus=()=>this.currentFocus,this.getTree=()=>this.tree,this.initialiseFormListeners=t=>{null!==this.tree&&this.tree.addEventListener("keydown",(e=>{e instanceof KeyboardEvent&&this.handleKeyDown(e,t)}));const i=this.tree.querySelectorAll(`.js-tree__expander--${e.checkboxes}`);Array.from(i).forEach(((e,i,s)=>{e.addEventListener("click",(e=>{let i=e.currentTarget;!1===i.id.includes("expander")&&(i=i.previousElementSibling),this.handleExpanders(i,t),e.preventDefault(),e.stopPropagation()}))})),this.tree.querySelectorAll('[role="group"]').forEach(((e,i,s)=>{e.id.includes(t)&&this.updateExpanded(e,t)})),this.tree.querySelectorAll("[role=treeitem]").forEach(((i,s,r)=>{t==e.radios&&!0===i.id.includes("folder")||i.id.includes(t)&&i.addEventListener("click",(e=>{e.currentTarget instanceof HTMLLIElement&&!(e.target instanceof HTMLLabelElement)&&(this.setSelected(e.currentTarget,t),this.setFocusToItem(e.currentTarget)),e.stopImmediatePropagation()}))})),this.removeFocusFromInputs(t);const s=this.tree.querySelector("[role=treeitem]");s&&(s.tabIndex=0,this.currentFocus=s)},this.removeFocusFromInputs=e=>{this.tree.querySelectorAll(`input[type=${t[e]}]`).forEach((e=>{e.tabIndex=-1,e.setAttribute("aria-hidden","true")}))},this.updateFocus=e=>{null!=e?this.setFocusToItem(e):this.setFocusToItem(this.tree.firstElementChild)},this.updateExpanded=(e,t)=>{const i=e.getAttribute("id");null!==i&&(this.getExpanded(t).includes(i.replace("node-group","list"))||e.parentNode.setAttribute("aria-expanded","false"))},this.getExpanded=e=>{const t=localStorage.getItem(`${e}-state`);return null!==t?JSON.parse(t).expanded:[]},this.allChildren=(e,t)=>{for(let i=e.children.length-1;i>=0;i--){const s=e.children.item(i);null!==s&&("LI"===s.nodeName&&t.push(s),Array.from(s.children).filter((e=>"UL"===e.nodeName)).forEach((e=>this.allChildren(e,t))))}return t},this.toggleNode=(e,t,i)=>{const s=this.getExpanded(i);"false"===e.getAttribute("aria-expanded")?(e.setAttribute("aria-expanded","true"),s.push(t)):(e.setAttribute("aria-expanded","false"),s.splice(s.indexOf(t))),1==this.rememberExpanded&&localStorage.setItem(`${i}-state`,JSON.stringify({expanded:s}))},this.displaySelected=e=>{this.fileSelected=this.fileSelected||document.getElementById(`${this.tree.id}-selected`),e=""===e?"No file selected":e,null!=this.fileSelected&&(this.fileSelected.textContent=e)},this.setSelected=(t,i)=>{var s,r;if(t.querySelectorAll("ul").length>0&&i==e.radios)return void this.toggleNode(t,t.id,e.radios);const l="true"===t.getAttribute("aria-selected");t.setAttribute("aria-selected",l?"false":"true");const n=t.querySelector("input");n&&(n.checked=!l);const o=t.querySelector("label");if(this.displaySelected(l?"":null===(r=null===(s=null==o?void 0:o.firstChild)||void 0===s?void 0:s.textContent)||void 0===r?void 0:r.trim()),i===e.checkboxes&&t.setAttribute("aria-checked",l?"false":"true"),i!==e.radios||l||this.tree.querySelectorAll("li[aria-selected=true]").forEach((e=>{if(e.id!==t.id){e.setAttribute("aria-selected","false");const t=e.querySelector("input");t&&(t.checked=!1)}})),i===e.checkboxes){if(t.querySelectorAll("ul").length>0){const e=document.querySelector(`#${i}-node-group-${t.id.replace(`${i}-list-`,"")}`);if(null!=e){const t=this.allChildren(e,[]);for(const e of t){e.setAttribute("aria-selected",l?"false":"true"),e.setAttribute("aria-checked",l?"false":"true");const t=e.getElementsByTagName("input")[0];t&&(t.checked=!l)}}}const e=t.closest("[role=group]");this.setParentState(e)}},this.setParentState=e=>{var t;if(null!==e){const i=this.allChildren(e,[]),s=i.filter((e=>"true"===e.getAttribute("aria-selected"))).length,r=e.parentNode;if(null!==r&&"tree"!==e.getAttribute("role")){s>0&&s<i.length&&r.setAttribute("aria-checked","mixed"),s===i.length&&(r.setAttribute("aria-checked","true"),r.setAttribute("aria-selected","true")),0===s&&(r.setAttribute("aria-selected","false"),r.setAttribute("aria-checked","false"));const l=null===(t=e.parentElement)||void 0===t?void 0:t.closest("[role=group]");null!=l&&this.setParentState(l)}}},this.setFocusToItem=e=>{Array.from(this.treeItems).forEach((e=>{e.tabIndex=-1})),null!=e&&(e.tabIndex=0,e.focus(),this.currentFocus=e)},this.setFocusToLastExpandedChild=e=>{if(e&&"true"===e.getAttribute("aria-expanded")){const t=e.querySelector(":scope > ul > li:last-child");this.setFocusToLastExpandedChild(t)}else e&&this.setFocusToItem(e)},this.setFocusToPreviousItem=e=>{if(null!=e){const t=e.closest("li");null!=(null==t?void 0:t.previousElementSibling)?this.setFocusToLastExpandedChild(t.previousElementSibling):null!=(null==t?void 0:t.parentElement)&&this.setFocusToItem(t.parentElement.closest("li"))}},this.setFocusToNextParent=e=>{if("tree"!=e.getAttribute("role")){const t=e.closest("li");null!=(null==t?void 0:t.nextElementSibling)?this.setFocusToItem(t.nextElementSibling):this.setFocusToNextParent(t.parentElement)}},this.setFocusToNextItem=e=>{if(null!=e){const t=e.closest("li");if(null!==t)if("true"===t.getAttribute("aria-expanded")){const e=t.querySelector("ul > li");null!==e&&this.setFocusToItem(e)}else null!==t.nextElementSibling?this.setFocusToItem(t.nextElementSibling):null!==t.parentElement&&this.setFocusToNextParent(t.parentElement)}},this.handleKeyDown=(e,t)=>{let i=!1;switch(e.key){case"Enter":case" ":this.setSelected(this.currentFocus,t),this.setFocusToItem(this.currentFocus),i=!0;break;case"ArrowUp":this.setFocusToPreviousItem(this.currentFocus),i=!0;break;case"ArrowDown":this.setFocusToNextItem(this.currentFocus),i=!0;break;case"ArrowRight":this.processArrowRightEvent(e,t),i=!0;break;case"ArrowLeft":this.processArrowLeftEvent(e,t),i=!0;break;case"Home":this.setFocusToItem(this.tree.firstElementChild),i=!0;break;case"End":this.processEndEvent(e),i=!0}!0===i&&(e.preventDefault(),e.stopPropagation())},this.processEndEvent=e=>{var t;let i=this.tree.lastElementChild;for(;"true"===(null==i?void 0:i.getAttribute("aria-expanded"));)i=null===(t=i.lastElementChild)||void 0===t?void 0:t.lastElementChild;this.setFocusToItem(i),e.preventDefault()},this.processArrowLeftEvent=(e,t)=>{var i,s,r;if("true"===(null===(i=this.currentFocus)||void 0===i?void 0:i.getAttribute("aria-expanded")))this.toggleNode(this.currentFocus,this.currentFocus.id,t);else if("tree"!==(null===(s=this.currentFocus)||void 0===s?void 0:s.getAttribute("role"))){const e=null===(r=this.currentFocus)||void 0===r?void 0:r.parentElement;null!=e&&this.setFocusToItem(e.closest("li"))}e.preventDefault()},this.processArrowRightEvent=(e,t)=>{var i,s;"false"===(null===(i=this.currentFocus)||void 0===i?void 0:i.getAttribute("aria-expanded"))?this.toggleNode(this.currentFocus,this.currentFocus.id,t):"true"===(null===(s=this.currentFocus)||void 0===s?void 0:s.getAttribute("aria-expanded"))&&this.setFocusToNextItem(this.currentFocus),e.preventDefault()},this.handleExpanders=(e,t)=>{const i=e.id.replace("expander-","node-group-"),s=this.tree.querySelector(`#${i}`);if(null!==s){const i=s.parentNode;null!=i&&(this.toggleNode(i,e.id.replace("expander-",""),t),this.setFocusToItem(i))}},this.tree=i,this.treeItems=this.tree.querySelectorAll("[role=treeitem]"),this.currentFocus=null,this.rememberExpanded="true"==i.dataset.rememberExpanded}}class l{constructor(e){this.timeoutId=null,this.initialise=()=>{var e;null===(e=this.filter)||void 0===e||e.addEventListener("keyup",(e=>{e instanceof KeyboardEvent&&this.handleKeyUp(e)})),this.list.addEventListener("change",this.processInputChange);const t=this.getSelectedItems().length,i=this.getVisibleItems().length;this.updateSelectedCount(this.selectedCount,t),this.updateFilteredCount(this.filterCount,t,i)},this.handleKeyUp=e=>{e.stopPropagation(),"Enter"!==e.key?(clearTimeout(Number(this.timeoutId)),this.timeoutId=setTimeout(this.processKeyUpTimeout,300)):e.preventDefault()},this.cleanString=e=>(e=(e=(e=e.replace(/&/g,"and")).replace(/[’',:–-]/g,"")).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).trim().replace(/\s\s+/g," ").toLowerCase(),this.filterItems=(e,t)=>{const i=this.cleanString(e),s=this.getSelectedItems();let r=0;for(r=0;r<t.length;r++)-1!==this.labels[r].search(i)&&s.push(r);for(r=0;r<t.length;r++)this.list.children[r].classList.add("is-hidden");for(r=0;r<s.length;r++)this.list.children[s[r]].classList.remove("is-hidden")},this.updateSelectedCount=(e,t)=>{e&&(e.textContent=`${t} selected`)},this.updateFilteredCount=(e,t,i)=>{const s=`${i} ${1===i?`${this.config.copySingle}displayed`:`${this.config.copyMultiple}displayed`}, ${t} ${1===t?`${this.config.copySingle}selected`:`${this.config.copyMultiple}selected`}`;e&&(e.innerHTML=s)},this.setupHeight=()=>{const e=this.container.clientHeight,t=this.getAbsoluteHeight(this.list);if(t<e+50)return void(this.container.style.height=t+"px");const i=this.getInViewport(this.list.children).pop(),s=i.offsetTop+i.clientHeight/1.5;this.container.style.height=s+"px"},this.getAbsoluteHeight=e=>{const t=window.getComputedStyle(e),i=parseFloat(t.marginTop)+parseFloat(t.marginBottom);return Math.ceil(e.offsetHeight+i)},this.isInViewport=e=>{const t=this.container.clientHeight,i=this.container.getBoundingClientRect().top;return e.getBoundingClientRect().top-i<t},this.getInViewport=e=>Array.from(e).filter(this.isInViewport),this.getSelectedItems=()=>{const e=[];return Array.from(this.inputs).forEach(((t,i)=>{1==t.checked&&e.push(i)})),e},this.getVisibleItems=()=>{const e=[];for(let t=0;t<this.list.children.length;t++)!1===this.list.children[t].classList.contains("is-hidden")&&e.push(t);return e},this.processKeyUpTimeout=e=>{this.filterItems(this.filter.value,this.list.children);const t=this.getSelectedItems().length,i=this.getVisibleItems().length;this.updateFilteredCount(this.filterCount,t,i)},this.processInputChange=e=>{const t=this.getSelectedItems().length,i=this.getVisibleItems().length;this.updateSelectedCount(this.selectedCount,t),this.updateFilteredCount(this.filterCount,t,i)},this.container=e.querySelector(".js-container"),this.list=e.querySelector("ul"),this.inputs=e.querySelectorAll("input[type=checkbox]"),this.filter=e.querySelector("input[type=text]"),this.filterCount=e.querySelector(".js-filter-count"),this.selectedCount=e.querySelector(".js-selected-count"),this.config={copySingle:e.dataset.copySingle?`${e.dataset.copySingle} `:"",copyMultiple:e.dataset.copyMultiple?`${e.dataset.copyMultiple} `:""},this.labels=[];for(let e=0;e<this.list.children.length;e++)this.labels.push(this.cleanString(this.list.children[e].textContent||""));e.setAttribute("data-module-active","true")}}class n{constructor(e){this.initialiseListeners=()=>{this.button.addEventListener("click",this.handleClick)},this.handleClick=e=>{"true"==this.button.getAttribute("aria-disabled")&&e.preventDefault()},this.button=e}}return s})()));

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
            console.log(form.files.files, this.itemRetriever.files);
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
                .createContextualFragment(this.selected.firstElementChild.innerHTML);
            selectedContentFragment.querySelector(".js-drag-and-drop-folder-name").textContent = folderName;
            selectedContentFragment.querySelector(".js-drag-and-drop-no-of-files").textContent = numberOfFiles.toString();
            this.selected.firstElementChild.innerHTML = "";
            this.selected.firstElementChild.appendChild(selectedContentFragment);
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