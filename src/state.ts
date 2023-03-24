import { rtdb } from "./db";
import map from "lodash/map";
const API_BASE_URL = "http://localhost:3000";

const state = {
  data: {
    email: "",
    fullName: "",
    userId: "",
    roomId: "",
    message: [],
    rtdbRoomId: "",
  },
  listeners: [],
  init() {
    const stateSave = localStorage.getItem("state");
  },
  listenRoom(callback?) {
    const cs = this.getState();
    const chatrooms = rtdb.ref("/rooms/" + cs.rtdbRoomId + "/messages");

    chatrooms.on("value", (snapshot) => {
      const valor = snapshot.val();
      const messageList = map(valor);

      cs.message = messageList;
      this.setState(cs);
    });
  },
  getState() {
    return this.data;
  },
  setName(name: string) {
    this.data.name = name;
  },
  setState(newState) {
    this.data = newState;
    for (let cb of this.listeners) {
      cb();
    }
    localStorage.setItem("state", JSON.stringify(newState));
  },
  pushMessage(message) {
    const cs = this.getState();
    fetch(API_BASE_URL + "/" + "rooms" + "/" + cs.rtdbRoomId, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        nombre: cs.fullName,
        message: message,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
      });
  },
  setEmailAndFullName(email: string, fullName: string) {
    const cs = this.getState();
    cs.email = email;
    cs.fullName = fullName;
    this.setState(cs);
  },
  createNewUser(callback) {
    const cs = this.getState();
    if (cs.email && cs.fullName) {
      fetch(API_BASE_URL + "/singup", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
          nombre: cs.fullName,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          callback();
        });
    } else {
      console.log("Ya esta Registrado");
      callback();
    }
  },
  signIn(callback?) {
    const cs = this.getState();
    if (cs.email) {
      fetch(API_BASE_URL + "/auth", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cs.email,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.userId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.log("El email no existe en la db");
      callback();
    }
  },
  askNewRoom(callback) {
    const cs = this.getState();
    if (cs.userId) {
      fetch(API_BASE_URL + "/rooms", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          userId: cs.userId,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          cs.roomId = data.id;
          this.setState(cs);
          callback();
        });
    } else {
      console.error("No existe el userId");
    }
  },
  accessToRoom(callback?) {
    const cs = this.getState();
    if (cs.roomId) {
      fetch(API_BASE_URL + "/rooms/" + cs.roomId + "?usersId=" + cs.userId)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          this.setState(cs);
          cs.rtdbRoomId = data.rtdbRoomId;
          this.listenRoom();
          callback();
        });
    } else {
      console.error("No existe el roomId");
    }
  },
  subscribe(cb) {
    const cs = this.getState();
    this.listeners.push(cb);
    console.log("El state a cambiado", cs);
  },
};

export { state };
