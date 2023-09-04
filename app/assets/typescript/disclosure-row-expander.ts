export class DisclosureRowExpander {
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
    this.hide();
    this.button.addEventListener("click", this.toggle);
  }

  hide: () => void = () => {
    this.button.setAttribute("aria-expanded", "false");
    if (this.controlledNode) this.controlledNode.setAttribute("hidden", "");
    if(this.parentRowClass){
      this.button.closest("tr").classList.remove(this.parentRowClass)
    }
  };

  show: () => void = () => {
    this.button.setAttribute("aria-expanded", "true");
    if (this.controlledNode) this.controlledNode.removeAttribute("hidden");
    if(this.parentRowClass){
      this.button.closest("tr").classList.add(this.parentRowClass)
    }
  };

  toggle: () => void = () => {
    if (this.button.getAttribute("aria-expanded") === "true") {
      this.hide();
    } else {
      this.show();
    }
  };
}
