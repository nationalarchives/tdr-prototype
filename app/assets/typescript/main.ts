import { MultiSelectSearch } from "@nationalarchives/tdr-components";
import { NestedNavigation, InputType } from "@nationalarchives/tdr-components";

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
});
