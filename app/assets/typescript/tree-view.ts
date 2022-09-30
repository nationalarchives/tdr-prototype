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
      if (parentCheckbox) {
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
}
