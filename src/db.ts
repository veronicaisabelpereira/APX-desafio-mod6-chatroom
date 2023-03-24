import firebase from "firebase"; //importamos libreria firebase

const app = firebase.initializeApp({
  apiKey: "wNia4wtMoKXZOCkXXnCzTpGm32m9I41digs8N2Ln",
  databaseURL: "https://apx-dwf-m6-83a96-default-rtdb.firebaseio.com",
  authDomain: "apx-dwf-m6-83a96.firebaseapp.com",
}); // inicializamos guardando en la const app.
//Nos conectamos a nuestra base de datos utilizando informacion de la cuenta

const rtdb = firebase.database();

export { rtdb };
