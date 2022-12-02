window.GOVUK = window.GOVUK || {};
window.GOVUK.Modules = window.GOVUK.Modules || {};
console.log(window.GOVUK);

(function (Modules) {
  /* This JavaScript provides two functional enhancements to option-select components:
    1) A count that shows how many results have been checked in the option-container
    2) Open/closing of the list of checkboxes
  */
  function OptionSelect($module) {
    this.$optionSelect = $module;
    this.$options = this.$optionSelect.querySelectorAll(
      "input[type='checkbox']"
    );
    this.$optionsContainer = this.$optionSelect.querySelector(
      ".js-options-container"
    );
    this.$optionList = this.$optionsContainer.querySelector(
      ".js-auto-height-inner"
    );
    this.$allCheckboxes = this.$optionsContainer.querySelectorAll(
      ".govuk-checkboxes__item"
    );

    this.$filter = this.$optionSelect.querySelector(
      'input[name="option-select-filter"]'
    );

    this.checkedCheckboxes = [];
    this.checkboxLabels = [];
    this.showCheckboxes = [];
    this.filterTimeout = 0;
  }

  OptionSelect.prototype.init = function () {
    if (this.$filter) {
      this.$filterCount = document.getElementById(
        this.$filter.getAttribute("aria-describedby")
      );
      this.filterTextSingle =
        " " + this.$filterCount.getAttribute("data-single");
      this.filterTextMultiple =
        " " + this.$filterCount.getAttribute("data-multiple");
      this.filterTextSelected =
        " " + this.$filterCount.getAttribute("data-selected");

      this.getAllCheckedCheckboxes();

      for (var i = 0; i < this.$allCheckboxes.length; i++) {
        this.checkboxLabels.push(
          this.cleanString(this.$allCheckboxes[i].textContent)
        );
      }

      this.$filter.addEventListener("keyup", this.typeFilterText.bind(this));
    }

    this.setupHeight();
    this.updateCheckedCount();
    // this.updateFilteredCount();

    // Attach listener to update checked count
    this.$optionList.addEventListener(
      "change",
      this.updateCheckedCount.bind(this)
    );
  };

  OptionSelect.prototype.typeFilterText = function (event) {
    event.stopPropagation();
    var ENTER_KEY = 13;
    if (event.keyCode !== ENTER_KEY) {
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(
        function () {
          this.doFilter(this);
        }.bind(this),
        300
      );
    } else {
      event.preventDefault(); // prevents forms from being submitted when user presses ENTER
    }
  };

  OptionSelect.prototype.cleanString = function cleanString(text) {
    text = text.replace(/&/g, "and");
    text = text.replace(/[’',:–-]/g, ""); // remove punctuation characters
    text = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape special characters
    return text.trim().replace(/\s\s+/g, " ").toLowerCase(); // replace multiple spaces with one
  };

  OptionSelect.prototype.getAllCheckedCheckboxes =
    function getAllCheckedCheckboxes() {
      this.checkedCheckboxes = [];

      for (var i = 0; i < this.$options.length; i++) {
        if (this.$options[i].checked) {
          this.checkedCheckboxes.push(i);
        }
      }
    };

  OptionSelect.prototype.doFilter = function doFilter(obj) {
    console.log(this, obj);
    var filterBy = obj.cleanString(obj.$filter.value);
    // Copy checked checkboxes so they are always displayed.
    var showCheckboxes = obj.checkedCheckboxes.slice();

    var i = 0;
    for (i = 0; i < obj.$allCheckboxes.length; i++) {
      // If not checked or found by filter.
      if (
        showCheckboxes.indexOf(i) === -1 &&
        obj.checkboxLabels[i].search(filterBy) !== -1
      ) {
        showCheckboxes.push(i);
      }
    }

    // Hide all
    for (i = 0; i < obj.$allCheckboxes.length; i++) {
      obj.$allCheckboxes[i].style.display = "none";
    }

    // Show checked and found by filter
    for (i = 0; i < showCheckboxes.length; i++) {
      obj.$allCheckboxes[showCheckboxes[i]].style.display = "block";
    }

    this.showCheckboxes = showCheckboxes;
    obj.updateFilteredCount();
  };

  OptionSelect.prototype.updateFilteredCount = function updateFilteredCount() {
    var lenChecked =
      this.$optionsContainer.querySelectorAll("input:checked").length;
    var lenFound = this.showCheckboxes.length;
    var html =
      lenFound +
      (lenFound === 1 ? this.filterTextSingle : this.filterTextMultiple) +
      ", " +
      lenChecked +
      this.filterTextSelected;

    this.$filterCount.innerHTML = html;
  };

  OptionSelect.prototype.updateCheckedCount = function updateCheckedCount() {
    this.getAllCheckedCheckboxes();

    var checkedString = this.getCheckedString();
    var checkedStringElement = this.$optionSelect.querySelector(
      ".js-selected-counter"
    );

    if (checkedString) {
      if (checkedStringElement !== null) {
        checkedStringElement.textContent = checkedString;
      }
    }
  };

  OptionSelect.prototype.getCheckedString = function getCheckedString() {
    var checkedString = "";
    var count = this.$optionsContainer.querySelectorAll("input:checked").length;
    checkedString = count + " selected";

    return checkedString;
  };

  OptionSelect.prototype.setContainerHeight = function setContainerHeight(
    height
  ) {
    this.$optionsContainer.style.height = height + "px";
  };

  OptionSelect.prototype.isCheckboxVisible = function isCheckboxVisible(
    option
  ) {
    var initialOptionContainerHeight = this.$optionsContainer.clientHeight;
    var optionListOffsetTop = this.$optionList.getBoundingClientRect().top;
    // Using parentElement because the `input` is position:absolute.
    var distanceFromTopOfContainer =
      option.parentElement.getBoundingClientRect().top - optionListOffsetTop;
    return distanceFromTopOfContainer < initialOptionContainerHeight;
  };

  OptionSelect.prototype.getVisibleCheckboxes =
    function getVisibleCheckboxes() {
      var visibleCheckboxes = [];
      for (var i = 0; i < this.$options.length; i++) {
        if (this.isCheckboxVisible(this.$options[i])) {
          visibleCheckboxes.push(this.$options[i]);
        }
      }
      return visibleCheckboxes;
    };

  OptionSelect.prototype.setupHeight = function setupHeight() {
    var initialOptionContainerHeight = this.$optionsContainer.clientHeight;
    var height = this.$optionList.offsetHeight;

    // console.log(initialOptionContainerHeight, height);
    // check whether this is hidden by progressive disclosure,
    // because height calculations won't work
    // would use offsetParent === null but for IE10+
    var parent = this.$optionSelect.parentElement;
    var parentIsHidden = !(
      parent.offsetWidth ||
      parent.offsetHeight ||
      parent.getClientRects().length
    );
    if (parentIsHidden) {
      initialOptionContainerHeight = 200;
      height = 200;
    }

    // Resize if the list is only slightly bigger than its container
    if (height < initialOptionContainerHeight + 50) {
      this.setContainerHeight(height + 1);
      return;
    }

    // Resize to cut last item cleanly in half
    var visibleCheckboxes = this.getVisibleCheckboxes();

    var lastVisibleCheckbox = visibleCheckboxes[visibleCheckboxes.length - 1];
    var position = lastVisibleCheckbox.parentNode.offsetTop; // parent element is relative
    this.setContainerHeight(position + lastVisibleCheckbox.clientHeight / 1.5);
  };

  Modules.OptionSelect = OptionSelect;
})(window.GOVUK.Modules);
