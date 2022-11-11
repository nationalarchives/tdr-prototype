const tree: HTMLUListElement | null = document.querySelector("[role=tree]");
const treeItems = document.querySelectorAll("[role=treeitem]");
let currentFocus: HTMLLIElement = null;

if (tree) {
  const getExpanded: () => string[] = () => {
    const storageItem = localStorage.getItem("state");
    if (storageItem) {
      return JSON.parse(storageItem).expanded;
    } else {
      return [];
    }
  };

  const allChildren: (
    ul: HTMLUListElement,
    elements: HTMLLIElement[]
  ) => HTMLLIElement[] = (ul, elements) => {
    for (let i = ul.children.length - 1; i >= 0; i--) {
      const item: HTMLLIElement | null = ul.children.item(
        i
      ) as HTMLLIElement | null;

      if (item && item.nodeName == "LI") {
        elements.push(item);
      }
      // If children includes a UL/role=group then get children
      Array.from(item.children)
        .filter((el) => el.nodeName == "UL")
        .forEach((el) => allChildren(el as HTMLUListElement, elements));
    }
    return elements;
  };

  const setSelected: (li: HTMLLIElement) => void = (li) => {
    const isSelected: Boolean = li.getAttribute("aria-selected") == "true";
    li.setAttribute("aria-selected", isSelected == false ? "true" : "false");
    li.setAttribute("aria-checked", isSelected == false ? "true" : "false");

    // If this is a folder, traverse down
    if (li.hasAttribute("aria-expanded")) {
      const childrenGroup: HTMLUListElement | null = document.querySelector(
        `#folder-group-${li.id}`
      );
      if (childrenGroup) {
        const children = allChildren(childrenGroup, []);
        for (let child of children) {
          child.setAttribute(
            "aria-selected",
            isSelected == false ? "true" : "false"
          );
          child.setAttribute(
            "aria-checked",
            isSelected == false ? "true" : "false"
          );
        }
      }
    }
    // Traverse up
    const parentGroup: HTMLUListElement | null = li.closest("[role=group]");
    setParentState(parentGroup);
  };

  const toggleFolder: (li: HTMLLIElement, id: string) => void = (li, id) => {
    const expanded = getExpanded();
    const buttonSpan: HTMLElement = document.querySelector(
      `#expander-${id} span`
    );

    if (li.getAttribute("aria-expanded") == "false") {
      // Expand
      li.setAttribute("aria-expanded", "true");
      expanded.push(id);
      buttonSpan.innerText = "Collapse";
    } else {
      // Collapse
      li.setAttribute("aria-expanded", "false");
      expanded.splice(expanded.indexOf(id));
      buttonSpan.innerText = "Expand";
    }
    localStorage.setItem("state", JSON.stringify({ expanded }));
  };

  const setParentState: (ul: HTMLUListElement | null) => void = (ul) => {
    // Gets all descendant checkboxes & sets UL parent checkbox accordingly
    if (ul) {
      const all = allChildren(ul, []);
      const countChecked = all.filter(
        (a) => a.getAttribute("aria-selected") == "true"
      ).length;
      const parentLI: HTMLLIElement | null = ul.parentNode as HTMLLIElement;
      if (parentLI && ul.getAttribute("role") != "tree") {
        // One or more children but less than all
        if (countChecked > 0 && countChecked < all.length) {
          parentLI.setAttribute("aria-checked", "mixed");
        }
        // All children checked
        if (countChecked == all.length) {
          parentLI.setAttribute("aria-checked", "true");
          parentLI.setAttribute("aria-selected", "true");
        }
        // None checked
        if (countChecked == 0) {
          parentLI.setAttribute("aria-selected", "false");
          parentLI.setAttribute("aria-checked", "false");
        }
        // Recursively call closest parent folder.
        const nextEl: HTMLUListElement | null | undefined =
          ul.parentElement?.closest("[role=group]");
        if (nextEl) {
          setParentState(nextEl);
        }
      }
    }
  };

  const setFocusToItem: (element: HTMLElement) => void = (element) => {
    Array.from(treeItems).forEach((item) => {
      (item as HTMLElement).tabIndex = -1;
    });
    if (element) {
      element.tabIndex = 0;
      element.focus();
      currentFocus = element as HTMLLIElement;
    }
  };

  const setFocusToPreviousItem: (li: HTMLLIElement) => void = (li) => {
    // Do you have a sibling
    if (li && li.previousElementSibling) {
      // Does sibling have an aria-expanded=true
      if (li.previousElementSibling.getAttribute("aria-expanded") == "true") {
        // Go to sibling's last child
        setFocusToItem(
          li.previousElementSibling.querySelector(":scope > ul > li:last-child")
        );
      } else {
        // Go to previous sibling
        setFocusToItem(li.previousElementSibling as HTMLElement);
      }
    } else if (li.parentElement) {
      // Go to parent
      setFocusToItem(li.parentElement.closest("li") as HTMLElement);
    }
  };

  const setFocusToNextItem: (li: HTMLLIElement) => void = (li) => {
    // Do you have a child
    if (li.getAttribute("aria-expanded") == "true") {
      // go to first child
      setFocusToItem(li.querySelector("ul > li"));
    } else {
      if (li.nextElementSibling) {
        // Go to next sibling
        setFocusToItem(li.nextElementSibling as HTMLElement);
      } else {
        // Go to parents next sibling
        const parent: HTMLLIElement | null = li.parentElement.closest("li");
        if (parent && parent.nextElementSibling) {
          setFocusToItem(parent.nextElementSibling as HTMLElement);
        }
      }
    }
  };

  document
    .querySelector("[role=tree]")
    .addEventListener("keydown", (ev: KeyboardEvent) => {
      const currentItem = document.activeElement;
      let li;
      // console.log(ev.key, ev.target);
      switch (ev.key) {
        case "Enter":
        case " ":
          // Check or uncheck checkbox
          setSelected(currentFocus);
          ev.preventDefault();
          break;

        case "ArrowUp":
          // Moves focus to the previous node that is focusable without opening or closing a node.
          setFocusToPreviousItem(currentFocus);
          ev.preventDefault();
          break;

        case "ArrowDown":
          // Moves focus to the next node that is focusable without opening or closing a node.
          setFocusToNextItem(currentFocus);
          ev.preventDefault();
          break;

        case "ArrowRight":
          if (currentFocus.getAttribute("aria-expanded") == "false") {
            // When focus is on a closed node, opens the node; focus does not move.
            toggleFolder(currentFocus, currentFocus.id);
          } else if (currentFocus.getAttribute("aria-expanded") == "true") {
            // When focus is on a open node, moves focus to the first child node.
            setFocusToNextItem(currentFocus);
          }
          // When focus is on an end node (a tree item with no children), does nothing.
          ev.preventDefault();
          break;

        case "ArrowLeft":
          // li = (ev.target as HTMLElement).closest("li");
          if (currentFocus.getAttribute("aria-expanded") == "true") {
            // When focus is on an open node, closes the node.
            toggleFolder(currentFocus, currentFocus.id);
          } else if (currentFocus.getAttribute("role") != "tree") {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            setFocusToItem(
              currentFocus.parentElement.closest("li") as HTMLElement
            );
          }
          // When focus is on a closed `tree`, does nothing.
          ev.preventDefault();
          break;

        case "Home":
          // Moves focus to the first node in the tree without opening or closing a node.
          setFocusToItem(tree.firstElementChild as HTMLLIElement);
          ev.preventDefault();
          break;

        case "End":
          // Moves focus to the last node in the tree that is focusable without opening the node.
          let lastLi: HTMLLIElement = tree.lastElementChild as HTMLLIElement;
          while (lastLi && lastLi.getAttribute("aria-expanded") == "true") {
            lastLi = lastLi.lastElementChild.lastElementChild as HTMLLIElement;
          }
          setFocusToItem(lastLi);
          ev.preventDefault();
          break;

        default:
          break;
      }
    });

  document
    .querySelectorAll("[role=tree] button")
    .forEach((expander, key, parent) => {
      if (expander) {
        expander.addEventListener("click", (ev) => {
          ev.preventDefault();
          if (ev.target instanceof Element) {
            const newId = ev.target.id.replace("expander-", "folder-group-");
            const folderGroup: HTMLUListElement | null = document.querySelector(
              `#${newId}`
            );
            if (folderGroup) {
              const parent: HTMLElement = folderGroup.parentNode as HTMLElement;
              toggleFolder(
                parent as HTMLLIElement,
                ev.target.id.replace("expander-", "")
              );
              setFocusToItem(parent);
            }
          }
        });
      }
    });

  // All folders start open so need hiding on first load.
  document.querySelectorAll('[role="group"]').forEach((value, key, parent) => {
    const id = value.getAttribute("id");
    if (id) {
      const expanded = getExpanded();

      if (!expanded.includes(id.replace("folder-group-", ""))) {
        (value.parentNode as HTMLElement).setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  });

  document
    .querySelectorAll("[role=treeitem]")
    .forEach((treeitem, key, parent) => {
      treeitem.addEventListener("click", (ev) => {
        if (ev.currentTarget instanceof HTMLLIElement) {
          setSelected(ev.currentTarget);
          setFocusToItem(ev.currentTarget);
        }
        ev.stopImmediatePropagation();
      });
    });

  /*
   * When tree receives focus from previous elements
   * focus on first selected node, else focus on
   * first node.
   * */
  tree.addEventListener("focus", () => {
    const firstSelected = document.querySelector(
      "[role=treeitem][aria-selected=true]"
    );
    if (firstSelected) {
      setFocusToItem(firstSelected as HTMLElement);
    } else {
      setFocusToItem(tree.firstElementChild as HTMLElement);
    }
  });

  /*
   * Convert all govuk checkboxes into spans to not
   * confuse screenreaders. `<input>` and `<label>`
   * both converted to spans and attributes copied
   * excluding those that do not exist on spans.
   * */
  // document
  //   .querySelectorAll("[role=tree] .govuk-checkboxes__item")
  //   .forEach((checkbox: HTMLElement) => {
  //     const input: HTMLInputElement = checkbox.querySelector("input");
  //     const label: HTMLLabelElement = checkbox.querySelector("label");

  //     const spanInput = document.createElement("span");
  //     for (const name of input.getAttributeNames()) {
  //       if (!["type"].includes(name)) {
  //         spanInput.setAttribute(name, input.getAttribute(name));
  //       }
  //       spanInput.setAttribute("aria-hidden", "true");
  //     }
  //     input.parentElement.appendChild(spanInput);
  //     spanInput.append(...Array.from(input.childNodes));
  //     input.remove();

  //     const spanLabel = document.createElement("span");
  //     for (const name of label.getAttributeNames()) {
  //       if (!["for"].includes(name)) {
  //         spanLabel.setAttribute(name, label.getAttribute(name));
  //       }
  //     }
  //     label.parentElement.appendChild(spanLabel);
  //     spanLabel.append(...Array.from(label.childNodes));
  //     label.remove();
  //   });
}
