export class DisclosureMenuShowHide {
  private readonly button: HTMLElement;
  private readonly controlledNode: HTMLElement | null;
  private readonly parentRowClass: string = "";

  constructor(button: HTMLElement) {
    this.button = button;
    const id: string | undefined = this.button.getAttribute("aria-controls");

    if (id == undefined) {
      return;
    }

    // If there is a parentRowClass on the button data
    // attribute then we will toggle that on the nearest
    // parent <tr>
    this.parentRowClass = button.dataset['parentRowClass'];

    this.controlledNode = document.getElementById(id);
    this.button.addEventListener("click", this.toggle);

    this.button.removeAttribute('hidden');
    this.controlledNode.classList.add('active');
    this.hide();
  }

  hide: () => void = () => {
    this.button.setAttribute("aria-expanded", "false");
    if (this.controlledNode) this.controlledNode.setAttribute("hidden", "");
    if(this.parentRowClass){
      this.button.closest("tr").classList.remove(this.parentRowClass)
    }

    document.documentElement.removeEventListener("click", this.hideOnBodyClick);
    document.documentElement.removeEventListener("keydown", this.handleKeyEvent);
    this.controlledNode.removeEventListener("focusout", this.hideOnFocusOut);
  };

  show: () => void = () => {
    this.button.setAttribute("aria-expanded", "true");
    if (this.controlledNode) this.controlledNode.removeAttribute("hidden");
    if(this.parentRowClass){
      this.button.closest("tr").classList.add(this.parentRowClass)
    }

    document.documentElement.addEventListener("click", this.hideOnBodyClick);
    document.documentElement.addEventListener("keydown", this.handleKeyEvent);
    this.controlledNode.addEventListener("focusout", this.hideOnFocusOut);
  };

  hideOnBodyClick: (e: Event) => void = (e) => {
    const path = e.composedPath();
    if(path.some(p => p == this.button || p == this.controlledNode) === false){
      this.hide();
    }
  }

  hideOnFocusOut: (e: FocusEvent) => void = (e) => {
    if(this.controlledNode.contains(e.relatedTarget as HTMLElement) === false && e.relatedTarget !== this.button){
      this.hide();
    }
  }

  handleKeyEvent: (e: KeyboardEvent) => void = (e) => {
    if(e.code === "Escape"){
      this.button.focus();
      this.hide();
    }
  }

  toggle: () => void = () => {
    if (this.button.getAttribute("aria-expanded") === "true") {
      this.hide();
    } else {
      this.show();
    }
  };
}
