const fileNavigationContainer: HTMLUListElement | null = document.querySelector(
  ".govuk-tna-tree__nested-file-list"
);

if (fileNavigationContainer) {
  const getExpanded: () => string[] = () => {
    const storageItem = localStorage.getItem("state");
    if (storageItem) {
      return JSON.parse(storageItem).expanded;
    } else {
      return [];
    }
  };

  const allCheckboxes: (
    input: HTMLInputElement,
    elements: HTMLInputElement[]
  ) => HTMLInputElement[] = ({ children }, elements) => {
    for (let i = children.length - 1; i >= 0; i--) {
      const item: HTMLInputElement | null = children.item(
        i
      ) as HTMLInputElement | null;
      if (item) {
        if (item.nodeName == "LI") {
          const itemCheckbox: HTMLInputElement | null = item.querySelector(
            ".govuk-checkboxes__input"
          );
          if (itemCheckbox) {
            elements.push(itemCheckbox);
          }
        } else {
          allCheckboxes(item, elements);
        }
      }
    }
    return elements;
  };

  // All folders start open so need hiding on first load.
  document.querySelectorAll('[role="group"]').forEach((value, key, parent) => {
    const id = value.getAttribute("id");
    if (id) {
      const expanded = getExpanded();

      if (
        id != "parent-list" &&
        !expanded.includes(id.replace("folder-group-", ""))
      ) {
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
          const ul: HTMLInputElement | null = ev.target.closest(
            ".govuk-tna-tree__nested-file-list"
          );

          if (ev.target.classList.contains("folder-checkbox")) {
            const nextFolder: HTMLInputElement | null = document.querySelector(
              `#folder-group-${ev.target.id}`
            );
            if (nextFolder) {
              const checkboxes = allCheckboxes(nextFolder, []);
              for (let checkbox of checkboxes) {
                checkbox.checked = ev.target.checked;
              }
            }
          }
          setState(ul);
        }
      });
    });

  document
    .querySelectorAll(".govuk-tna-tree__file-expander")
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
              const expanded = getExpanded();
              const parent: HTMLElement = folderGroup.parentNode as HTMLElement;
              if (parent.getAttribute("aria-expanded") == "false") {
                // Expand
                parent.setAttribute("aria-expanded", "true");
                expanded.push(ev.target.id.replace("expander-", ""));
              } else {
                // Collapse
                parent.setAttribute("aria-expanded", "false");
                expanded.splice(
                  expanded.indexOf(ev.target.id.replace("expander-", ""))
                );
              }
              localStorage.setItem("state", JSON.stringify({ expanded }));
            }
          }
        });
      }
    });

  const setState: (input: HTMLInputElement | null) => void = (input) => {
    if (input) {
      const all = allCheckboxes(input, []);
      const countChecked = all.filter(
        (a) => a.checked || a.indeterminate
      ).length;
      const parentCheckbox: HTMLInputElement | null =
        input.parentNode!.querySelector("input[type=checkbox]");
      if (parentCheckbox && input.id !== "parent-list") {
        if (countChecked > 0 && countChecked < all.length) {
          parentCheckbox.indeterminate = true;
        }
        if (countChecked == all.length) {
          parentCheckbox.indeterminate = false;
          parentCheckbox.checked = true;
        }
        if (countChecked == 0) {
          parentCheckbox.checked = false;
          parentCheckbox.indeterminate = false;
        }
        const nextEl: HTMLInputElement | null | undefined =
          input.parentElement?.closest(".govuk-tna-tree__nested-file-list");
        if (nextEl && nextEl.id != "parent-list") {
          setState(nextEl);
        }
      }
    }
  };

  document
    .querySelector("[role=tree]")
    .addEventListener("keydown", (ev: KeyboardEvent) => {
      const currentItem = document.activeElement;
      // console.log(ev.key);

      switch (ev.key) {
        case "RETURN":
        case "SPACE":
          // Check or uncheck checkbox
          break;

        case "ArrowUp":
          // Moves focus to the previous node that is focusable without opening or closing a node.
          break;

        case "ArrowDown":
          // Moves focus to the next node that is focusable without opening or closing a node.
          break;

        case "ArrowRight":
          // When focus is on a closed node, opens the node; focus does not move.
          // When focus is on a open node, moves focus to the first child node.
          // When focus is on an end node (a tree item with no children), does nothing.

          break;

        case "ArrowLeft":
          // When focus is on an open node, closes the node.
          // When focus is on a child node that is also either an end node or a closed node, moves focus to its parent node.
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
      // ev.preventDefault();
    });
}
