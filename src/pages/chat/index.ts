import { state } from "../../state";
type Message = {
  nombre: string;
  message: string;
};
class Chat extends HTMLElement {
  message: Message[] = [];
  connectedCallback() {
    state.subscribe(() => {
      this.render();
      const cs = state.getState();
      this.message = cs.message;
      const form: HTMLFormElement = this.querySelector(
        ".form"
      ) as HTMLFormElement;
      form!.addEventListener("submit", (e) => {
        e.preventDefault();
        const target = e.target as any;
        let valor = target.text.value;
        state.pushMessage(valor);
        if (valor !== "") {
          (e.target as any).text.value = "";
        }
      });
    });
    this.render();
  }
  render() {
    const currentState = state.getState();
    this.message = currentState.message;
    const hola = this.message.map((msg) => {
      return msg.message;
    });
    console.log(hola);

    this.classList.add("body");
    this.innerHTML = `
            <div class="header">
            <svg xmlns="http://www.w3.org/2000/svg" class=" icon-tabler icon-tabler-brand-whatsapp" width="72" height="72" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" />
            <path d="M9 10a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
          </svg>
               <h1>Messenger</h1>
            </div>
            <div class="contenedor">
               <div class="description-chat">
                  <div>
                     <h2 class="chat">Chat</h2>
                     <h3>Room Id: <span>${state.data.rtdbRoomId}</span></h3>
                  </div>
                  <h4 class="chat-Name">${state.data.fullName}</h4>
               </div>
               <div class ="message">
                  ${this.message
                    .map((msg) => {
                      return `
                     <div class=${
                       msg.nombre === state.data.fullName ? "me" : "you"
                     } style="margin-bottom:10px">
                        <p style="font-size:12px">${
                          msg.nombre === state.data.fullName ? "Tú" : msg.nombre
                        }:</p>
                        <h3 style="display: inline-block">${msg.message}</h3>
                     </div>`;
                    })
                    .join("")}
               </div>
               <form class="form">
                  <input type="text" id="text" class="text" name="text" required>
                  <div class="btn">
                     <button type="submit" class="button is-info is-medium">Enviar</button>
                  </div>
               </form>
            </div>
         `;
    const style = document.createElement("style");
    style.innerHTML = `
         .body{
            height:100vh;
         }
         .header{
            background-color:#3488ce;
            margin:0;
            height:10vh;
            color:#ffF;
            display:flex;
            align-items:center;
            justify-content:end;
            padding-right:20px;
         }
         .contenedor{
            width:80%;
            margin:auto;
         }
         .description-chat{
            display:flex;
            justify-content:space-between;
            text-align:end;
         }
         .description-chat div{
            display:flex;
            flex-direction:column;
            align-items:start;
            weight:400;
         }
         .description-chat div span{
            color:#3e8ed0;
         }
         .chat{
            font-size:3.5rem;
            font-weight:bold;
            font-family: 'Poppins';
            margin-bottom:0;
            margin-top:35px;
            
         }
         .chat-Name{
            font-size:1.2rem;
         }
 
        .message{
            margin-top: 15px;
            margin-bottom: 15px;
            background-color:#F8F8F8;
            padding:10px;
            width: 100%;
            height: 55vh;
            display: flex;
            flex-direction: column;
            align-items: end;
            overflow: auto;
         }
        .me{
           float:right;
         }
         .me h3{
            padding:8px;
            background-color:#B9E97C;
            border-radius:10px;
        }
        .you{
            display: block;
            width: 100%;
         }
         .you h3{
            padding:5px;     
            background-color:#D8D8D8;
            border-radius:10px;
         }
         .form{
            display:flex;
            flex-direction:column;
            height:100%;
         }
         .text{
            font-size:1.3rem;
            height:30px;
            margin-bottom:1rem;
            border-radius:8px;
            text-indent:10px;
         }
         .btn{
            display:flex;
            justify-content:center;
            width:auto;
         }
      `;
    this.appendChild(style);
    const chat = this.querySelector(".message")!;
    chat.scrollTo({
      top: 1000,
      left: 0,
      behavior: "auto",
    });
  }
}

customElements.define("pages-chat", Chat);
