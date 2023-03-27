import { Router } from "@vaadin/router";
import { state } from "../../state";

export class InitBievenidos extends HTMLElement {
  connectedCallback() {
    this.render();

    const select = this.querySelector("select")!;
    const roomIdValue = this.querySelector(".roomId") as any;

    if (select.value === "NuevoRoom") {
      roomIdValue.style.display = "none";
    }
    select.addEventListener("change", (e) => {
      e.preventDefault();
      const selectValue = (select as any).value;
      if (selectValue === "RoomExistente") {
        roomIdValue.style.display = "block";
      } else {
        roomIdValue.style.display = "none";
      }
    });

    const form = this.querySelector(".form");

    form!.addEventListener("submit", (e) => {
      e.preventDefault();

      const target = e.target as any;
      const name = target.name.value;
      const email = target.email.value;
      state.setEmailAndFullName(email, name);
      if (select.value === "NuevoRoom") {
        const carga = this.querySelector(".contenedor-loader") as HTMLElement;
        carga.style.display = "block";
        state.createNewUser(() => {
          state.signIn(() => {
            state.askNewRoom(() => {
              state.accessToRoom(() => {
                Router.go("/chatroom");
              });
            });
          });
        });
      } else {
        const rtdbRoom = target.roomId.value;
        state.data.rtdbRoomId = rtdbRoom;
        state.listenRoom();
        Router.go("/chatroom");
      }
    });
  }
  render() {
    const div = document.createElement("div");
    div.innerHTML = `
         <div class="header"></div>
         <div class="contenedor">
         <form class="box form"  >
         <custom-title class="title" title="Bienvenidxs"></custom-title>
                  <div>
                     <label class="label" for="email">Email</label>
                     <input class="input is-normal is-rounded" type="email" id="email" name="email" placeholder="Ingrese su Email:">
                  </div>
                  <div>
                     <label class="label" for="name">Tu nombre</label>
                     <input class="input is-normal is-rounded" type="text" id="name" name="name" placeholder="Ingrese su Nombre:">
                  </div>
                  <div>
                     <label class="label" for="room">Room</label>
                     <div class="control">
                        <div class="select">
                           <select class="input is-rounded" id="room" name="room">
                              <option value="NuevoRoom">Nuevo Room</option>
                              <option value="RoomExistente">Room Existente</option>
                           </select>
                        </div>
                     </div>
                  </div>
                  <div class="roomId">
                     <label class="label text" for="roomId">Room Id</label>
                     <input class="input is-normal is-rounded" type="text" id="roomId" name="roomId" placeholder="Apx2023">
                  </div>
                  <div class="btn">
                     <button type="submit" class="button is-info is-medium">Comenzar</button>
                  </div>
                  <div class="contenedor-loader" style="display:none">
                     <div class="carga"></div>
                  </div>
            </form>
         </div>        
      `;
    const style = document.createElement("style");
    style.innerHTML = `
      @import "https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css";
         *,*:before,*:after{
            margin:0;
            padding:0;
            outline:0;
            box-sizing:border-box;
         }
         .header{
            background-color:white;
            height:8vh;
         }
         .contenedor{
            font-family:'Poppins';  
            font-size:1.5rem;
            width:80vw;
            margin:0 auto
         }
         .form{
            display:flex;
            flex-direction:column;
            row-gap:20px;
         }
       
         .btn{
            display:flex;
            justify-content:center;
            width:auto;
         }
         .contenedor-loader{
            backdrop-filter: blur(2px);
            background-color:tranparent; 
            opacity:100%;
            position:absolute;
            top:0;
            right: 0;
            bottom:0;
            left:0;
            z-index:9;
            transition:all 1.5s;
            display:flex;
            align-items:center;
            justify-content:center
         }
         
         .carga,
         .carga:before,
         .carga:after{
            border-radius:50%;
            width:2.5em;
            height:2.5em;
            animation:carga 1.5s infinite ease-in-out;
         }
         .carga{
            color:#4685fa;
            font-size:13px;
            position:absolute;
            top:50vh;
            right: 50vw;
            animation-delay:-0.16s;
         }
         .carga:before,
         .carga:after{
            content:"";
            position:absolute;
            top:0;
         }
         .carga:before{
            left:-3.5em;
            animation-delay:-0.32s;
         
         }
         .carga:after{
            left:3.5em;
         }
         @keyframes carga{
            0%,
            80%,
            100%{
               box-shadow:0 2.5em 0 -1.3em;
            }
            40%{
               box-shadow:0 2.5em 0 0;
            }
         }
      `;
    this.appendChild(div);
    this.appendChild(style);
  }
}
customElements.define("pages-bienvenido", InitBievenidos);
