import "./pages/bienvenidos";
import "./pages/chat";
import "./components/titulo";
import "./router";
import "./db";
import { state } from "./state";

(function () {
  state.init();
  state.listenRoom();
})();
