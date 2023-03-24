export class Select extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const shadow = this.attachShadow({ mode: "open" });
    const div = document.createElement("div");
    const nameLabel = this.getAttribute("nameLabel");

    div.innerHTML = `
         <label class="label" for="${nameLabel}">${nameLabel}</label>
         <div class="control">
             <div class="select">
                <select class="input is-rounded" id="${nameLabel}" name="${nameLabel}">
                   <option value="NuevoRoom">Nuevo Room</option>
                   <option value="RoomExistente">Room Existente</option>
                </select>
             </div>
          </div>
       `;
    const style = document.createElement("style");
    style.innerHTML = `
       @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
       `;
    shadow.appendChild(div);
    shadow.appendChild(style);
  }
}
customElements.define("custom-select", Select);
