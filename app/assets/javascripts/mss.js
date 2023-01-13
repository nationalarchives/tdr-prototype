class MultiSelectSearch {
    constructor(rootElement) {
        this.timeoutId = null;
        this.initialise = () => {
            var _a;
            (_a = this.filter) === null || _a === void 0 ? void 0 : _a.addEventListener("keyup", (ev) => {
                if (ev instanceof KeyboardEvent) {
                    this.handleKeyUp(ev);
                }
            });
            this.list.addEventListener("change", this.processInputChange);
            const numChecked = this.getSelectedItems().length;
            const numVisible = this.getVisibleItems().length;
            this.updateSelectedCount(this.selectedCount, numChecked);
            this.updateFilteredCount(this.filterCount, numChecked, numVisible);
        };
        this.handleKeyUp = (ev) => {
            ev.stopPropagation();
            if (ev.key !== "Enter") {
                clearTimeout(Number(this.timeoutId));
                this.timeoutId = setTimeout(this.processKeyUpTimeout, 300);
            }
            else {
                ev.preventDefault();
            }
        };
        this.cleanString = (searchText) => {
            searchText = searchText.replace(/&/g, "and");
            searchText = searchText.replace(/[’',:–-]/g, "");
            searchText = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            return searchText.trim().replace(/\s\s+/g, " ").toLowerCase();
        };
        this.filterItems = (filterText, listItems) => {
            const filterBy = this.cleanString(filterText);
            const visibleItems = this.getSelectedItems();
            let i = 0;
            for (i = 0; i < listItems.length; i++) {
                if (this.labels[i].search(filterBy) !== -1) {
                    visibleItems.push(i);
                }
            }
            for (i = 0; i < listItems.length; i++) {
                this.list.children[i].classList.add("is-hidden");
            }
            for (i = 0; i < visibleItems.length; i++) {
                this.list.children[visibleItems[i]].classList.remove("is-hidden");
            }
        };
        this.updateSelectedCount = (el, numChecked) => {
            if (el)
                el.textContent = `${numChecked} selected`;
        };
        this.updateFilteredCount = (el, numChecked, numVisible) => {
            const displayedCopy = numVisible === 1
                ? `${this.config.copySingle}displayed`
                : `${this.config.copyMultiple}displayed`;
            const selectedCopy = numChecked === 1
                ? `${this.config.copySingle}selected`
                : `${this.config.copyMultiple}selected`;
            const output = `${numVisible} ${displayedCopy}, ${numChecked} ${selectedCopy}`;
            if (el)
                el.innerHTML = output;
        };
        this.setupHeight = () => {
            const containerHeight = this.container.clientHeight;
            const listHeight = this.getAbsoluteHeight(this.list);
            if (listHeight < containerHeight + 50) {
                this.container.style.height = listHeight + "px";
                return;
            }
            const visibleItems = this.getInViewport(this.list.children);
            const lastVisibleItem = visibleItems.pop();
            const position = lastVisibleItem.offsetTop;
            const height = position + lastVisibleItem.clientHeight / 1.5;
            this.container.style.height = height + "px";
        };
        this.getAbsoluteHeight = (el) => {
            const styles = window.getComputedStyle(el);
            const margin = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
            return Math.ceil(el.offsetHeight + margin);
        };
        this.isInViewport = (listItem) => {
            const containerHeight = this.container.clientHeight;
            const containerOffsetTop = this.container.getBoundingClientRect().top;
            const distanceFromTopOfContainer = listItem.getBoundingClientRect().top;
            return distanceFromTopOfContainer - containerOffsetTop < containerHeight;
        };
        this.getInViewport = (list) => {
            return Array.from(list).filter(this.isInViewport);
        };
        this.getSelectedItems = () => {
            const selectedIndexes = [];
            Array.from(this.inputs).forEach((input, i) => {
                if (input.checked == true)
                    selectedIndexes.push(i);
            });
            return selectedIndexes;
        };
        this.getVisibleItems = () => {
            const visibleItems = [];
            for (let i = 0; i < this.list.children.length; i++) {
                if (this.list.children[i].classList.contains("is-hidden") === false) {
                    visibleItems.push(i);
                }
            }
            return visibleItems;
        };
        this.processKeyUpTimeout = (ev) => {
            this.filterItems(this.filter.value, this.list.children);
            const numChecked = this.getSelectedItems().length;
            const numVisible = this.getVisibleItems().length;
            this.updateFilteredCount(this.filterCount, numChecked, numVisible);
        };
        this.processInputChange = (ev) => {
            const numChecked = this.getSelectedItems().length;
            const numVisible = this.getVisibleItems().length;
            this.updateSelectedCount(this.selectedCount, numChecked);
            this.updateFilteredCount(this.filterCount, numChecked, numVisible);
        };
        this.container = rootElement.querySelector(".js-container");
        this.list = rootElement.querySelector("ul");
        this.inputs = rootElement.querySelectorAll("input[type=checkbox]");
        this.filter = rootElement.querySelector("input[type=text]");
        this.filterCount = rootElement.querySelector(".js-filter-count");
        this.selectedCount = rootElement.querySelector(".js-selected-count");
        this.config = {
            copySingle: rootElement.dataset.copySingle
                ? `${rootElement.dataset.copySingle} `
                : "",
            copyMultiple: rootElement.dataset.copyMultiple
                ? `${rootElement.dataset.copyMultiple} `
                : "",
        };
        this.labels = [];
        for (let i = 0; i < this.list.children.length; i++) {
            this.labels.push(this.cleanString(this.list.children[i].textContent || ""));
        }
        rootElement.setAttribute("data-module-active", "true");
    }
}
//# sourceMappingURL=mss.js.map