export class Titulo extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    const nameTitle = this.getAttribute("title");

    div.innerHTML = `
          <h1>${nameTitle}</h1>
       `;
    shadow.appendChild(div);
  }
}
customElements.define("custom-title", Titulo);
