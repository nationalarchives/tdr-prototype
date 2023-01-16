class Disclosure {
    constructor(button) {
        this.hide = () => {
            if (this.controlledNode)
                this.controlledNode.setAttribute("hidden", "");
        };
        this.show = () => {
            if (this.controlledNode)
                this.controlledNode.removeAttribute("hidden");
        };
        this.toggle = () => {
            if (this.button.getAttribute("aria-expanded") === "true") {
                this.button.setAttribute("aria-expanded", "false");
                this.hide();
            }
            else {
                this.button.setAttribute("aria-expanded", "true");
                this.show();
            }
        };
        this.button = button;
        const id = this.button.getAttribute("aria-controls");
        if (id == undefined) {
            return;
        }
        this.controlledNode = document.getElementById(id);
        this.hide();
        this.button.addEventListener("click", this.toggle);
    }
}
//# sourceMappingURL=disclosure.js.map