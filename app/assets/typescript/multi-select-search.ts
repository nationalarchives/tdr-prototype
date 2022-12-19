import { MultiSelectSearch } from "@nationalarchives/tdr-components";

window.onload = () => {
  const multiSelects: NodeListOf<HTMLElement> | null =
    document.querySelectorAll("[data-module=multi-select-search]");
  console.log(multiSelects);
  multiSelects.forEach((ms) => {
    const multiSelectSearch = new MultiSelectSearch(ms);
    multiSelectSearch.initialise();
  });
};
