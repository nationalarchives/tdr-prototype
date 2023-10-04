import { MultiSelectSearch } from "@nationalarchives/tdr-components";
import { NestedNavigation, InputType } from "@nationalarchives/tdr-components";
import { FolderUpload } from "./folder-upload";
import { DisclosureRowExpander } from "./disclosure-row-expander";
import { DisclosureMenuShowHide } from "./disclosure-menu-show-hide";

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
});
