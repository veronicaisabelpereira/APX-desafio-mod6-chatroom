import { state } from "../../state";
export class Input extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  connectedCallback() {}
  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    const nameLabel = this.getAttribute("nameLabel");
    const typeInput = this.getAttribute("typeInput");

    div.innerHTML = `
        <label class="label" for="${nameLabel}">${nameLabel}</label>
        <input class="input is-normal is-rounded" type="${typeInput}" id="${nameLabel}" name="${nameLabel}">
      `;
    const style = document.createElement("style");
    style.innerHTML = `
      @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
      `;
    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}
customElements.define("custom-input", Input);
