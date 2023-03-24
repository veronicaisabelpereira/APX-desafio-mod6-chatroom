export class Buttom extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    const nameBtn = this.getAttribute("nameBtn");

    div.innerHTML = `
          <button type="submit" class="button is-info is-medium ">${nameBtn}</button>
       `;
    const style = document.createElement("style");
    style.innerHTML = `
       @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
       `;
    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}
customElements.define("custom-button", Buttom);
