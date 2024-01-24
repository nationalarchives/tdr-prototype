import { MultiSelectSearch } from "@nationalarchives/tdr-components";
import { NestedNavigation, InputType } from "@nationalarchives/tdr-components";
import { FolderUpload } from "./folder-upload";
import { DisclosureRowExpander } from "./disclosure-row-expander";
import { DisclosureMenuShowHide } from "./disclosure-menu-show-hide";
import accessibleAutocomplete from 'accessible-autocomplete'


window.addEventListener("DOMContentLoaded", (event) => {
  /**
   * Multi-select search.
   */
  const multiSelects = document.querySelectorAll(
    "[data-module=multi-select-search]"
  );

  multiSelects.forEach((ms) => {
    const multiSelectSearch = new MultiSelectSearch(ms as HTMLElement);
    multiSelectSearch.initialise();
  });

  /**
   * Nested Navigation
   */
  const tree = document.querySelector("[role=tree]");
  if (tree != null) {
    const nestedNavigation = new NestedNavigation(tree as HTMLUListElement);
    nestedNavigation.initialiseFormListeners(InputType.radios);
  }

  /**
   * Folder upload
   */
  const folderUpload: HTMLElement = document.querySelector(
    "[data-tdr-module=folder-upload]"
  );
  if (folderUpload) {
    const fu: FolderUpload = new FolderUpload(folderUpload);
    fu.initialise();
  }

  /**
   * Disclosure - Table row expander
   * Button in each row shows secondary content in a row below the
   * containing row.
   */
    const tableRowExpanderButtons = document.querySelectorAll("[data-module=table-row-expander] button[aria-expanded][aria-controls]");

    tableRowExpanderButtons.forEach((btn:HTMLButtonElement) => {
      new DisclosureRowExpander(btn);
    })

  /**
   * Disclosure - Table menu show hide
   * Button in each row reveals menu, e.g. Actions menu.
   */
    const tableRowShowHideButtons = document.querySelectorAll("[data-module=table-row-menu-hide-show] button[aria-expanded][aria-controls]");
    tableRowShowHideButtons.forEach((btn:HTMLButtonElement) => {
      new DisclosureMenuShowHide(btn);
    })

  /**
   * Accessible Autocomplete
   *
   */
    const directorySelect = document.querySelector("#filter-by-dir.autocomplete")
    if(directorySelect){
      accessibleAutocomplete.enhanceSelectElement({
        selectElement: directorySelect,
        displayMenu: 'overlay',
        showAllValues: true,
        autoselect: false,
        confirmOnBlur: true,
        placeholder: 'Start typing...',
        dropdownArrow: function (config:any) {
          // return '<svg class="' + config.className + '" style="top: 8px;" viewBox="0 0 512 512" ><path d="M256,298.3L256,298.3L256,298.3l174.2-167.2c4.3-4.2,11.4-4.1,15.8,0.2l30.6,29.9c4.4,4.3,4.5,11.3,0.2,15.5L264.1,380.9  c-2.2,2.2-5.2,3.2-8.1,3c-3,0.1-5.9-0.9-8.1-3L35.2,176.7c-4.3-4.2-4.2-11.2,0.2-15.5L66,131.3c4.4-4.3,11.5-4.4,15.8-0.2L256,298.3  z"/></svg>'
          return ''
        }
      })
    }

});
