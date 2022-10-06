const tree: HTMLUListElement | null = document.querySelector("[role=tree]");

if (tree) {
  const getExpanded: () => string[] = () => {
    const storageItem = localStorage.getItem("state");
    if (storageItem) {
      return JSON.parse(storageItem).expanded;
    } else {
      return [];
    }
  };

  const allCheckboxes: (
    ul: HTMLUListElement,
    elements: HTMLInputElement[]
  ) => HTMLInputElement[] = (ul, elements) => {
    for (let i = ul.children.length - 1; i >= 0; i--) {
      const item: HTMLLIElement | null = ul.children.item(
        i
      ) as HTMLLIElement | null;
      if (item) {
        if (item.nodeName == "LI") {
          const itemCheckbox: HTMLInputElement | null = item.querySelector(
            "input[type=checkbox]"
          );
          if (itemCheckbox) {
            elements.push(itemCheckbox);
          }
        }
        // If children includes a UL/role=group then get children
        Array.from(item.children)
          .filter((el) => el.nodeName == "UL")
          .forEach((el) => allCheckboxes(el as HTMLUListElement, elements));
      }
    }
    return elements;
  };

  const setCheckbox: (input: HTMLInputElement) => void = (input) => {
    // If this is a folder, traverse down
    if (input.parentElement.closest("li").hasAttribute("aria-expanded")) {
      const childrenGroup: HTMLUListElement | null = document.querySelector(
        `#folder-group-${input.id}`
      );
      if (childrenGroup) {
        const checkboxes = allCheckboxes(childrenGroup, []);
        for (let checkbox of checkboxes) {
          checkbox.checked = input.checked;
          checkbox.indeterminate = false;
        }
      }
    }
    // Traverse up
    const parentGroup: HTMLUListElement | null = input.closest("[role=group]");
    setParentState(parentGroup);
  };

  const toggleFolder: (li: HTMLLIElement, id: string) => void = (li, id) => {
    const expanded = getExpanded();

    if (li.getAttribute("aria-expanded") == "false") {
      // Expand
      li.setAttribute("aria-expanded", "true");
      expanded.push(id);
    } else {
      // Collapse
      li.setAttribute("aria-expanded", "false");
      expanded.splice(expanded.indexOf(id));
    }
    localStorage.setItem("state", JSON.stringify({ expanded }));
  };

  const setParentState: (ul: HTMLUListElement | null) => void = (ul) => {
    // Gets all descendant checkboxes & sets UL parent checkbox accordingly
    if (ul) {
      const all = allCheckboxes(ul, []);
      const countChecked = all.filter(
        (a) => a.checked || a.indeterminate
      ).length;

      const parentCheckbox: HTMLInputElement | null =
        ul.parentNode!.querySelector("input[type=checkbox]");
      if (parentCheckbox && ul.getAttribute("role") != "tree") {
        // One or more children but less than all
        if (countChecked > 0 && countChecked < all.length) {
          parentCheckbox.indeterminate = true;
        }
        // All children checked
        if (countChecked == all.length) {
          parentCheckbox.indeterminate = false;
          parentCheckbox.checked = true;
        }
        // None checked
        if (countChecked == 0) {
          parentCheckbox.checked = false;
          parentCheckbox.indeterminate = false;
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
    const input: HTMLInputElement | null = element?.querySelector(
      "input[type=checkbox]"
    );
    if (input) {
      input.tabIndex = 0;
      input.focus();
    }
  };

  const setFocusToPreviousItem: (input: HTMLElement) => void = (input) => {
    const li: HTMLLIElement | null = input.closest("li");
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

  const setFocusToNextItem: (input: HTMLElement) => void = (input) => {
    const li: HTMLLIElement | null = input.closest("li");

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
      switch (ev.key) {
        case "Enter":
        case " ":
          // Check or uncheck checkbox
          const input = ev.target as HTMLInputElement;
          input.checked = !input.checked;
          input.indeterminate = false;
          setCheckbox(input);
          break;

        case "ArrowUp":
          // Moves focus to the previous node that is focusable without opening or closing a node.
          setFocusToPreviousItem(ev.target as HTMLElement);
          break;

        case "ArrowDown":
          // Moves focus to the next node that is focusable without opening or closing a node.
          setFocusToNextItem(ev.target as HTMLElement);
          break;

        case "ArrowRight":
          li = (ev.target as HTMLElement).closest("li");

          if (li.getAttribute("aria-expanded") == "false") {
            // When focus is on a closed node, opens the node; focus does not move.
            toggleFolder(
              li,
              (ev.target as HTMLElement).id.replace("expander-", "")
            );
          } else if (li.getAttribute("aria-expanded") == "true") {
            // When focus is on a open node, moves focus to the first child node.
            setFocusToNextItem(ev.target as HTMLElement);
          }
          // When focus is on an end node (a tree item with no children), does nothing.
          break;

        case "ArrowLeft":
          li = (ev.target as HTMLElement).closest("li");
          if (li.getAttribute("aria-expanded") == "true") {
            // When focus is on an open node, closes the node.
            toggleFolder(
              li,
              (ev.target as HTMLElement).id.replace("expander-", "")
            );
          } else if (li.getAttribute("role") != "tree") {
            // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
            setFocusToItem(li.parentElement.closest("li") as HTMLElement);
          }
          // When focus is on a closed `tree`, does nothing.
          break;

        case "Home":
          // Moves focus to the first node in the tree without opening or closing a node.
          break;

        case "End":
          // Moves focus to the last node in the tree that is focusable without opening the node.
          break;

        default:
          break;
      }
      ev.preventDefault();
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
    .querySelectorAll("[role=tree] [type=checkbox]")
    .forEach((checkBox, key, parent) => {
      checkBox.addEventListener("change", (ev) => {
        if (ev.target instanceof HTMLInputElement) {
          setCheckbox(ev.target);
        }
      });
    });
}
