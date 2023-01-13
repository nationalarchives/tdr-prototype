var InputType;
(function (InputType) {
    InputType["radios"] = "radios";
    InputType["checkboxes"] = "checkboxes";
})(InputType || (InputType = {}));
class NestedNavigation {
    constructor(tree, treeItems) {
        this.getCurrentFocus = () => {
            return this.currentFocus;
        };
        this.getTree = () => {
            return this.tree;
        };
        this.initialiseFormListeners = (inputType) => {
            if (this.tree !== null) {
                this.tree.addEventListener("keydown", (ev) => {
                    if (ev instanceof KeyboardEvent) {
                        this.handleKeyDown(ev, inputType);
                    }
                });
            }
            const inputName = this.tree
                .querySelector(`input[type=${inputType == "radios" ? "radio" : "checkboxes"}]`)
                .getAttribute("name");
            this.hiddenElement.setAttribute("type", "hidden");
            this.hiddenElement.setAttribute("name", inputName);
            this.tree.appendChild(this.hiddenElement);
            const radioFolders = Array.from(document.querySelectorAll(`.js-${inputType}-directory`));
            const buttons = document.querySelectorAll(`.js-tree__expander--${inputType}`);
            const allExpanders = [...radioFolders, ...Array.from(buttons)];
            console.log(allExpanders);
            allExpanders.forEach((expander, _, __) => {
                expander.addEventListener("click", (ev) => {
                    let el = ev.currentTarget;
                    console.log(el);
                    if (el.id.includes("expander") === false) {
                        el = el.previousElementSibling;
                    }
                    this.handleExpanders(el, inputType);
                    ev.preventDefault();
                    ev.stopPropagation();
                });
            });
            document.querySelectorAll('[role="group"]').forEach((value, _, __) => {
                if (value.id.includes(inputType)) {
                    this.updateExpanded(value, inputType);
                }
            });
            document.querySelectorAll("[role=treeitem]").forEach((treeItem, _, __) => {
                if (inputType == InputType.radios &&
                    treeItem.id.includes("folder") === true)
                    return;
                if (treeItem.id.includes(inputType)) {
                    treeItem.addEventListener("click", (ev) => {
                        if (ev.currentTarget instanceof HTMLLIElement) {
                            this.setSelected(ev.currentTarget, inputType);
                            this.setFocusToItem(ev.currentTarget);
                        }
                        ev.stopImmediatePropagation();
                    });
                }
            });
            document
                .querySelectorAll(`[role=tree] .govuk-${inputType}__item`)
                .forEach((checkbox, _, __) => {
                const input = checkbox.querySelector("input");
                const label = checkbox.querySelector("label");
                if (input != null && label != null) {
                    this.replaceCheckboxWithSpan(input, label);
                }
            });
            this.tree.addEventListener("focus", () => {
                const firstSelected = document.querySelector("[role=treeitem][aria-selected=true]");
                this.updateFocus(firstSelected);
            });
        };
        this.cloneChildren = (parentFrom, copyTo) => {
            const children = parentFrom.childNodes;
            children.forEach((child) => {
                const clonedNode = child.cloneNode(true);
                copyTo.appendChild(clonedNode);
            });
        };
        this.replaceCheckboxWithSpan = (input, label) => {
            var _a;
            const spanInput = document.createElement("span");
            input.closest("li").dataset.value = input.value;
            for (const name of input.getAttributeNames()) {
                if (!["type", "tabindex"].includes(name)) {
                    const inputAttribute = input.getAttribute(name);
                    if (inputAttribute != null) {
                        spanInput.setAttribute(name, inputAttribute);
                    }
                }
                spanInput.setAttribute("aria-hidden", "true");
            }
            (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(spanInput);
            input.remove();
            const spanLabel = document.createElement("span");
            for (const name of label.getAttributeNames()) {
                if (!["for"].includes(name)) {
                    const labelAttribute = label.getAttribute(name);
                    if (labelAttribute != null) {
                        spanLabel.setAttribute(name, labelAttribute);
                    }
                }
            }
            if (label.hasChildNodes() == true) {
                this.cloneChildren(label, spanLabel);
            }
            if (label.parentElement != null) {
                label.parentElement.appendChild(spanLabel);
                label.remove();
            }
        };
        this.updateFocus = (element) => {
            if (element != null) {
                this.setFocusToItem(element);
            }
            else {
                this.setFocusToItem(this.tree.firstElementChild);
            }
        };
        this.updateExpanded = (value, inputType) => {
            const id = value.getAttribute("id");
            if (id !== null) {
                const expanded = this.getExpanded(inputType);
                if (!expanded.includes(id.replace("node-group", "list"))) {
                    value.parentNode.setAttribute("aria-expanded", "false");
                }
            }
        };
        this.getExpanded = (inputType) => {
            const storageItem = localStorage.getItem(`${inputType}-state`);
            if (storageItem !== null) {
                return JSON.parse(storageItem).expanded;
            }
            else {
                return [];
            }
        };
        this.allChildren = (ul, elements) => {
            for (let i = ul.children.length - 1; i >= 0; i--) {
                const item = ul.children.item(i);
                if (item !== null) {
                    if (item.nodeName === "LI") {
                        elements.push(item);
                    }
                    Array.from(item.children)
                        .filter((el) => el.nodeName === "UL")
                        .forEach((el) => this.allChildren(el, elements));
                }
            }
            return elements;
        };
        this.toggleNode = (li, id, inputType) => {
            const expanded = this.getExpanded(inputType);
            if (li.getAttribute("aria-expanded") === "false") {
                li.setAttribute("aria-expanded", "true");
                expanded.push(id);
            }
            else {
                li.setAttribute("aria-expanded", "false");
                expanded.splice(expanded.indexOf(id));
            }
            localStorage.setItem(`${inputType}-state`, JSON.stringify({ expanded }));
        };
        this.setSelected = (li, inputType) => {
            if (li == null ||
                (li.id.includes("folder") && inputType == InputType.radios)) {
                return null;
            }
            const isSelected = li.getAttribute("aria-selected") === "true";
            li.setAttribute("aria-selected", !isSelected ? "true" : "false");
            li.setAttribute("aria-checked", !isSelected ? "true" : "false");
            if (!isSelected) {
                this.hiddenElement.value = li.dataset.value;
            }
            else {
                this.hiddenElement.value = "";
            }
            if (inputType === InputType.radios && !isSelected) {
                document.querySelectorAll("li[aria-selected=true]").forEach((el) => {
                    if (el.id !== li.id) {
                        el.setAttribute("aria-selected", "false");
                        el.setAttribute("aria-checked", "false");
                    }
                });
            }
            else {
                if (li.hasAttribute("aria-expanded")) {
                    const childrenGroup = document.querySelector(`#${inputType}-node-group-${li.id.replace(`${inputType}-list-`, "")}`);
                    if (childrenGroup != null) {
                        const children = this.allChildren(childrenGroup, []);
                        for (const child of children) {
                            child.setAttribute("aria-selected", !isSelected ? "true" : "false");
                            child.setAttribute("aria-checked", !isSelected ? "true" : "false");
                        }
                    }
                }
                const parentGroup = li.closest("[role=group]");
                this.setParentState(parentGroup);
            }
        };
        this.setParentState = (ul) => {
            var _a;
            if (ul !== null) {
                const all = this.allChildren(ul, []);
                const countChecked = all.filter((a) => a.getAttribute("aria-selected") === "true").length;
                const parentLI = ul.parentNode;
                if (parentLI !== null) {
                    if (ul.getAttribute("role") !== "tree") {
                        if (countChecked > 0 && countChecked < all.length) {
                            parentLI.setAttribute("aria-checked", "mixed");
                        }
                        if (countChecked === all.length) {
                            parentLI.setAttribute("aria-checked", "true");
                            parentLI.setAttribute("aria-selected", "true");
                        }
                        if (countChecked === 0) {
                            parentLI.setAttribute("aria-selected", "false");
                            parentLI.setAttribute("aria-checked", "false");
                        }
                        const nextEl = (_a = ul.parentElement) === null || _a === void 0 ? void 0 : _a.closest("[role=group]");
                        if (nextEl != null) {
                            this.setParentState(nextEl);
                        }
                    }
                }
            }
        };
        this.setFocusToItem = (element) => {
            Array.from(this.treeItems).forEach((item) => {
                item.tabIndex = -1;
            });
            if (element != null) {
                element.tabIndex = 0;
                element.focus();
                this.currentFocus = element;
            }
        };
        this.setFocusToPreviousItem = (input) => {
            if (input != null) {
                const li = input.closest("li");
                if ((li === null || li === void 0 ? void 0 : li.previousElementSibling) != null) {
                    if (li.previousElementSibling.getAttribute("aria-expanded") === "true") {
                        const lastChild = li.previousElementSibling.querySelector(":scope > ul > li:last-child");
                        if (lastChild !== null) {
                            this.setFocusToItem(lastChild);
                        }
                    }
                    else {
                        this.setFocusToItem(li.previousElementSibling);
                    }
                }
                else if ((li === null || li === void 0 ? void 0 : li.parentElement) != null) {
                    this.setFocusToItem(li.parentElement.closest("li"));
                }
            }
        };
        this.setFocusToNextItem = (input) => {
            if (input != null) {
                const li = input.closest("li");
                if (li !== null) {
                    if (li.getAttribute("aria-expanded") === "true") {
                        const firstChild = li.querySelector("ul > li");
                        if (firstChild !== null) {
                            this.setFocusToItem(firstChild);
                        }
                    }
                    else {
                        if (li.nextElementSibling !== null) {
                            this.setFocusToItem(li.nextElementSibling);
                        }
                        else if (li.parentElement !== null) {
                            const parent = li.parentElement.closest("li");
                            if ((parent === null || parent === void 0 ? void 0 : parent.nextElementSibling) != null) {
                                this.setFocusToItem(parent.nextElementSibling);
                            }
                        }
                    }
                }
            }
        };
        this.handleKeyDown = (ev, inputType) => {
            switch (ev.key) {
                case "Enter":
                case " ":
                    this.setSelected(this.currentFocus, inputType);
                    ev.preventDefault();
                    break;
                case "ArrowUp":
                    this.setFocusToPreviousItem(this.currentFocus);
                    ev.preventDefault();
                    break;
                case "ArrowDown":
                    this.setFocusToNextItem(this.currentFocus);
                    ev.preventDefault();
                    break;
                case "ArrowRight":
                    this.processArrowRightEvent(ev, inputType);
                    break;
                case "ArrowLeft":
                    this.processArrowLeftEvent(ev, inputType);
                    break;
                case "Home":
                    this.setFocusToItem(this.tree.firstElementChild);
                    ev.preventDefault();
                    break;
                case "End": {
                    this.processEndEvent(ev);
                    break;
                }
                default:
                    break;
            }
        };
        this.processEndEvent = (ev) => {
            var _a;
            let lastLi = this.tree
                .lastElementChild;
            while ((lastLi === null || lastLi === void 0 ? void 0 : lastLi.getAttribute("aria-expanded")) === "true") {
                lastLi = (_a = lastLi.lastElementChild) === null || _a === void 0 ? void 0 : _a.lastElementChild;
            }
            this.setFocusToItem(lastLi);
            ev.preventDefault();
        };
        this.processArrowLeftEvent = (ev, inputType) => {
            var _a, _b, _c;
            if (((_a = this.currentFocus) === null || _a === void 0 ? void 0 : _a.getAttribute("aria-expanded")) === "true") {
                this.toggleNode(this.currentFocus, this.currentFocus.id, inputType);
            }
            else if (((_b = this.currentFocus) === null || _b === void 0 ? void 0 : _b.getAttribute("role")) !== "tree") {
                const parent = (_c = this.currentFocus) === null || _c === void 0 ? void 0 : _c.parentElement;
                if (parent != null) {
                    this.setFocusToItem(parent.closest("li"));
                }
            }
            ev.preventDefault();
        };
        this.processArrowRightEvent = (ev, inputType) => {
            var _a, _b;
            if (((_a = this.currentFocus) === null || _a === void 0 ? void 0 : _a.getAttribute("aria-expanded")) === "false") {
                this.toggleNode(this.currentFocus, this.currentFocus.id, inputType);
            }
            else if (((_b = this.currentFocus) === null || _b === void 0 ? void 0 : _b.getAttribute("aria-expanded")) === "true") {
                this.setFocusToNextItem(this.currentFocus);
            }
            ev.preventDefault();
        };
        this.handleExpanders = (target, inputType) => {
            const newId = target.id.replace("expander-", "node-group-");
            const nodeGroup = document.querySelector(`#${newId}`);
            console.log(target.id, newId, nodeGroup);
            if (nodeGroup !== null) {
                const parent = nodeGroup.parentNode;
                if (parent != null) {
                    this.toggleNode(parent, target.id.replace("expander-", ""), inputType);
                    this.setFocusToItem(parent);
                }
            }
        };
        this.tree = tree;
        this.treeItems = treeItems;
        this.currentFocus = null;
        this.hiddenElement = document.createElement("input");
    }
}
//# sourceMappingURL=tree-view.js.map