import { Router } from "@vaadin/router";
import "./pages/bienvenidos";
const root = document.querySelector("#root");

const router = new Router(root);
router.setRoutes([
  { path: "/", component: "pages-bienvenido" },
  { path: "/chatroom", component: "pages-chat" },
  { path: ".*", redirect: "/" },
]);
