class Disclosure {
  private readonly button: HTMLElement;
  private readonly controlledNode: HTMLElement | null;

  constructor(button: HTMLElement) {
    this.button = button;
    const id: string | undefined = this.button.getAttribute("aria-controls");

    if (id == undefined) {
      return;
    }

    this.controlledNode = document.getElementById(id);
    this.hide();
    this.button.addEventListener("click", this.toggle);
  }

  hide: () => void = () => {
    if (this.controlledNode) this.controlledNode.setAttribute("hidden", "");
  };

  show: () => void = () => {
    if (this.controlledNode) this.controlledNode.removeAttribute("hidden");
  };

  toggle: () => void = () => {
    if (this.button.getAttribute("aria-expanded") === "true") {
      this.button.setAttribute("aria-expanded", "false");
      this.hide();
    } else {
      this.button.setAttribute("aria-expanded", "true");
      this.show();
    }
  };
}
