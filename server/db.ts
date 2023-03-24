import * as admin from "firebase-admin";
import * as serviceAccount from "./firebase.json";

//inicializamos objeto admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any), //llave
  databaseURL: "https://apx-dwf-m6-83a96-default-rtdb.firebaseio.com", //url de base de datos
});

const baseDeDatos = admin.firestore();
const rtdb = admin.database();

export { baseDeDatos, rtdb };
