/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@nationalarchives/tdr-components/dist/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@nationalarchives/tdr-components/dist/index.js ***!
  \*********************************************************************/
/***/ ((module) => {

!function(e,t){if(true)module.exports=t();else { var i, s; }}(self,(()=>(()=>{"use strict";var e,t={d:(e,s)=>{for(var i in s)t.o(s,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:s[i]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},s={};t.r(s),t.d(s,{InputType:()=>e,MultiSelectSearch:()=>r,NestedNavigation:()=>i}),function(e){e.radios="radios",e.checkboxes="checkboxes"}(e||(e={}));class i{constructor(t){this.getCurrentFocus=()=>this.currentFocus,this.getTree=()=>this.tree,this.initialiseFormListeners=t=>{null!==this.tree&&this.tree.addEventListener("keydown",(e=>{e instanceof KeyboardEvent&&this.handleKeyDown(e,t)}));const s=Array.from(this.tree.querySelectorAll(`.js-${t}-directory`)),i=this.tree.querySelectorAll(`.js-tree__expander--${t}`);[...s,...Array.from(i)].forEach(((e,s,i)=>{e.addEventListener("click",(e=>{let s=e.currentTarget;!1===s.id.includes("expander")&&(s=s.previousElementSibling),this.handleExpanders(s,t),e.preventDefault(),e.stopPropagation()}))})),this.tree.querySelectorAll('[role="group"]').forEach(((e,s,i)=>{e.id.includes(t)&&this.updateExpanded(e,t)})),this.tree.querySelectorAll("[role=treeitem]").forEach(((s,i,r)=>{t==e.radios&&!0===s.id.includes("folder")||s.id.includes(t)&&s.addEventListener("click",(e=>{e.currentTarget instanceof HTMLLIElement&&(this.setSelected(e.currentTarget,t),this.setFocusToItem(e.currentTarget)),e.stopImmediatePropagation()}))}));const r=this.tree.querySelector("[role=treeitem]");r&&(r.tabIndex=0,this.currentFocus=r)},this.updateFocus=e=>{null!=e?this.setFocusToItem(e):this.setFocusToItem(this.tree.firstElementChild)},this.updateExpanded=(e,t)=>{const s=e.getAttribute("id");null!==s&&(this.getExpanded(t).includes(s.replace("node-group","list"))||e.parentNode.setAttribute("aria-expanded","false"))},this.getExpanded=e=>{const t=localStorage.getItem(`${e}-state`);return null!==t?JSON.parse(t).expanded:[]},this.allChildren=(e,t)=>{for(let s=e.children.length-1;s>=0;s--){const i=e.children.item(s);null!==i&&("LI"===i.nodeName&&t.push(i),Array.from(i.children).filter((e=>"UL"===e.nodeName)).forEach((e=>this.allChildren(e,t))))}return t},this.toggleNode=(e,t,s)=>{const i=this.getExpanded(s);"false"===e.getAttribute("aria-expanded")?(e.setAttribute("aria-expanded","true"),i.push(t)):(e.setAttribute("aria-expanded","false"),i.splice(i.indexOf(t))),localStorage.setItem(`${s}-state`,JSON.stringify({expanded:i}))},this.setSelected=(t,s)=>{if(null==t||t.id.includes("folder")&&s==e.radios)return null;const i="true"===t.getAttribute("aria-selected");if(t.setAttribute("aria-selected",i?"false":"true"),t.setAttribute("aria-checked",i?"false":"true"),s!==e.radios||i){if(t.hasAttribute("aria-expanded")){const e=document.querySelector(`#${s}-node-group-${t.id.replace(`${s}-list-`,"")}`);if(null!=e){const t=this.allChildren(e,[]);for(const e of t)e.setAttribute("aria-selected",i?"false":"true"),e.setAttribute("aria-checked",i?"false":"true")}}const e=t.closest("[role=group]");this.setParentState(e)}else this.tree.querySelectorAll("li[aria-selected=true]").forEach((e=>{e.id!==t.id&&(e.setAttribute("aria-selected","false"),e.setAttribute("aria-checked","false"))}))},this.setParentState=e=>{var t;if(null!==e){const s=this.allChildren(e,[]),i=s.filter((e=>"true"===e.getAttribute("aria-selected"))).length,r=e.parentNode;if(null!==r&&"tree"!==e.getAttribute("role")){i>0&&i<s.length&&r.setAttribute("aria-checked","mixed"),i===s.length&&(r.setAttribute("aria-checked","true"),r.setAttribute("aria-selected","true")),0===i&&(r.setAttribute("aria-selected","false"),r.setAttribute("aria-checked","false"));const l=null===(t=e.parentElement)||void 0===t?void 0:t.closest("[role=group]");null!=l&&this.setParentState(l)}}},this.setFocusToItem=e=>{Array.from(this.treeItems).forEach((e=>{e.tabIndex=-1})),null!=e&&(e.tabIndex=0,e.focus(),this.currentFocus=e)},this.setFocusToLastExpandedChild=e=>{if(e&&"true"===e.getAttribute("aria-expanded")){const t=e.querySelector(":scope > ul > li:last-child");this.setFocusToLastExpandedChild(t)}else e&&this.setFocusToItem(e)},this.setFocusToPreviousItem=e=>{if(null!=e){const t=e.closest("li");null!=(null==t?void 0:t.previousElementSibling)?this.setFocusToLastExpandedChild(t.previousElementSibling):null!=(null==t?void 0:t.parentElement)&&this.setFocusToItem(t.parentElement.closest("li"))}},this.setFocusToNextParent=e=>{if("tree"!=e.getAttribute("role")){const t=e.closest("li");null!=(null==t?void 0:t.nextElementSibling)?this.setFocusToItem(t.nextElementSibling):this.setFocusToNextParent(t.parentElement)}},this.setFocusToNextItem=e=>{if(null!=e){const t=e.closest("li");if(null!==t)if("true"===t.getAttribute("aria-expanded")){const e=t.querySelector("ul > li");null!==e&&this.setFocusToItem(e)}else null!==t.nextElementSibling?this.setFocusToItem(t.nextElementSibling):null!==t.parentElement&&this.setFocusToNextParent(t.parentElement)}},this.handleKeyDown=(e,t)=>{switch(e.key){case"Enter":case" ":this.setSelected(this.currentFocus,t),e.preventDefault();break;case"ArrowUp":this.setFocusToPreviousItem(this.currentFocus),e.preventDefault();break;case"ArrowDown":this.setFocusToNextItem(this.currentFocus),e.preventDefault();break;case"ArrowRight":this.processArrowRightEvent(e,t);break;case"ArrowLeft":this.processArrowLeftEvent(e,t);break;case"Home":this.setFocusToItem(this.tree.firstElementChild),e.preventDefault();break;case"End":this.processEndEvent(e)}},this.processEndEvent=e=>{var t;let s=this.tree.lastElementChild;for(;"true"===(null==s?void 0:s.getAttribute("aria-expanded"));)s=null===(t=s.lastElementChild)||void 0===t?void 0:t.lastElementChild;this.setFocusToItem(s),e.preventDefault()},this.processArrowLeftEvent=(e,t)=>{var s,i,r;if("true"===(null===(s=this.currentFocus)||void 0===s?void 0:s.getAttribute("aria-expanded")))this.toggleNode(this.currentFocus,this.currentFocus.id,t);else if("tree"!==(null===(i=this.currentFocus)||void 0===i?void 0:i.getAttribute("role"))){const e=null===(r=this.currentFocus)||void 0===r?void 0:r.parentElement;null!=e&&this.setFocusToItem(e.closest("li"))}e.preventDefault()},this.processArrowRightEvent=(e,t)=>{var s,i;"false"===(null===(s=this.currentFocus)||void 0===s?void 0:s.getAttribute("aria-expanded"))?this.toggleNode(this.currentFocus,this.currentFocus.id,t):"true"===(null===(i=this.currentFocus)||void 0===i?void 0:i.getAttribute("aria-expanded"))&&this.setFocusToNextItem(this.currentFocus),e.preventDefault()},this.handleExpanders=(e,t)=>{const s=e.id.replace("expander-","node-group-"),i=this.tree.querySelector(`#${s}`);if(null!==i){const s=i.parentNode;null!=s&&(this.toggleNode(s,e.id.replace("expander-",""),t),this.setFocusToItem(s))}},this.tree=t,this.treeItems=this.tree.querySelectorAll("[role=treeitem]"),this.currentFocus=null}}class r{constructor(e){this.timeoutId=null,this.initialise=()=>{var e;null===(e=this.filter)||void 0===e||e.addEventListener("keyup",(e=>{e instanceof KeyboardEvent&&this.handleKeyUp(e)})),this.list.addEventListener("change",this.processInputChange);const t=this.getSelectedItems().length,s=this.getVisibleItems().length;this.updateSelectedCount(this.selectedCount,t),this.updateFilteredCount(this.filterCount,t,s)},this.handleKeyUp=e=>{e.stopPropagation(),"Enter"!==e.key?(clearTimeout(Number(this.timeoutId)),this.timeoutId=setTimeout(this.processKeyUpTimeout,300)):e.preventDefault()},this.cleanString=e=>(e=(e=(e=e.replace(/&/g,"and")).replace(/[’',:–-]/g,"")).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).trim().replace(/\s\s+/g," ").toLowerCase(),this.filterItems=(e,t)=>{const s=this.cleanString(e),i=this.getSelectedItems();let r=0;for(r=0;r<t.length;r++)-1!==this.labels[r].search(s)&&i.push(r);for(r=0;r<t.length;r++)this.list.children[r].classList.add("is-hidden");for(r=0;r<i.length;r++)this.list.children[i[r]].classList.remove("is-hidden")},this.updateSelectedCount=(e,t)=>{e&&(e.textContent=`${t} selected`)},this.updateFilteredCount=(e,t,s)=>{const i=`${s} ${1===s?`${this.config.copySingle}displayed`:`${this.config.copyMultiple}displayed`}, ${t} ${1===t?`${this.config.copySingle}selected`:`${this.config.copyMultiple}selected`}`;e&&(e.innerHTML=i)},this.setupHeight=()=>{const e=this.container.clientHeight,t=this.getAbsoluteHeight(this.list);if(t<e+50)return void(this.container.style.height=t+"px");const s=this.getInViewport(this.list.children).pop(),i=s.offsetTop+s.clientHeight/1.5;this.container.style.height=i+"px"},this.getAbsoluteHeight=e=>{const t=window.getComputedStyle(e),s=parseFloat(t.marginTop)+parseFloat(t.marginBottom);return Math.ceil(e.offsetHeight+s)},this.isInViewport=e=>{const t=this.container.clientHeight,s=this.container.getBoundingClientRect().top;return e.getBoundingClientRect().top-s<t},this.getInViewport=e=>Array.from(e).filter(this.isInViewport),this.getSelectedItems=()=>{const e=[];return Array.from(this.inputs).forEach(((t,s)=>{1==t.checked&&e.push(s)})),e},this.getVisibleItems=()=>{const e=[];for(let t=0;t<this.list.children.length;t++)!1===this.list.children[t].classList.contains("is-hidden")&&e.push(t);return e},this.processKeyUpTimeout=e=>{this.filterItems(this.filter.value,this.list.children);const t=this.getSelectedItems().length,s=this.getVisibleItems().length;this.updateFilteredCount(this.filterCount,t,s)},this.processInputChange=e=>{const t=this.getSelectedItems().length,s=this.getVisibleItems().length;this.updateSelectedCount(this.selectedCount,t),this.updateFilteredCount(this.filterCount,t,s)},this.container=e.querySelector(".js-container"),this.list=e.querySelector("ul"),this.inputs=e.querySelectorAll("input[type=checkbox]"),this.filter=e.querySelector("input[type=text]"),this.filterCount=e.querySelector(".js-filter-count"),this.selectedCount=e.querySelector(".js-selected-count"),this.config={copySingle:e.dataset.copySingle?`${e.dataset.copySingle} `:"",copyMultiple:e.dataset.copyMultiple?`${e.dataset.copyMultiple} `:""},this.labels=[];for(let e=0;e<this.list.children.length;e++)this.labels.push(this.cleanString(this.list.children[e].textContent||""));e.setAttribute("data-module-active","true")}}return s})()));

/***/ }),

/***/ "./app/assets/typescript/folder-upload.ts":
/*!************************************************!*\
  !*** ./app/assets/typescript/folder-upload.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FolderUpload": () => (/* binding */ FolderUpload)
/* harmony export */ });
function isFile(entry) {
    return entry.file !== undefined;
}
function isDirectory(entry) {
    return !isFile(entry);
}
const displaySelectionSuccessMessage = (folderName, numberOfFiles) => {
};
class FolderUpload {
    constructor(root) {
        this.initialise = () => {
            this.addDropzoneHighlighter();
            this.addButtonHighlighter();
            this.addFolderListener();
        };
        this.addFolderListener = () => {
            this.dropzone.addEventListener("drop", this.handleDroppedItems);
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
            displaySelectionSuccessMessage(webkitEntry.name, filesAndFolders.filter((f) => isFile(f)).length);
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
        this.itemRetriever = root.querySelector(".js-drag-and-drop-input");
        this.dropzone = root.querySelector(".js-drag-and-drop-zone");
    }
    getParentFolderName(folder) {
        const firstItem = folder.filter((f) => isFile(f))[0];
        const relativePath = firstItem.path;
        const splitPath = relativePath.split("/");
        return splitPath[0];
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