import * as express from "express";
import { baseDeDatos, rtdb } from "./db";
import { nanoid } from "nanoid";
import * as cors from "cors";


const app = express();
const port = process.env.PORT || 3000;
const ROOT_PATH = __dirname.replace("src/", "");

app.use(express.json());
app.use(cors());
const usersCollection = baseDeDatos.collection("/users");
const roomsCollection = baseDeDatos.collection("/rooms");

//endpoints

app.get("/env", (req, res) => {
  res.json({
    environment: process.env.ENV,
    back: process.env.BACKEND_URL,
  });
});

//
app.post("/singup", (req, res) => {
  const email = req.body.email;
  const nombre = req.body.nombre;

  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        usersCollection
          .add({
            email,
            nombre,
          })
          .then((newUserRef) => {
            res.json({
              id: newUserRef.id,
              new: true,
            });
          });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});
//

app.post("/auth", (req, res) => {
  const { email } = req.body;

  usersCollection
    .where("email", "==", email)
    .get()
    .then((searchResponse) => {
      if (searchResponse.empty) {
        res.status(400).json({
          message: "Not found",
        });
      } else {
        res.json({
          id: searchResponse.docs[0].id,
        });
      }
    });
});
//
app.post("/rooms", (req, res) => {
  const { userId } = req.body;
  usersCollection
    .doc(userId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        const refroomrtdb = rtdb.ref("rooms/" + nanoid(6));
        refroomrtdb
          .set({
            messages: [],
            owner: userId,
          })
          .then(() => {
            const idRoom = refroomrtdb.key;
            const newIdRoom = 1000 + Math.floor(Math.random() * 999);
            roomsCollection
              .doc(newIdRoom.toString())
              .set({
                rtdbRoomId: idRoom,
              })
              .then(() => {
                res.json({
                  id: newIdRoom.toString(),
                });
              });
          });
      } else {
        res.status(401).json({
          message: "No Existis",
        });
      }
    });
});
//
app.get("/rooms/:idRoom", (req, res) => {
  const { usersId } = req.query;
  const { idRoom } = req.params;

  usersCollection
    .doc(usersId.toString())
    .get()
    .then((doc) => {
      if (doc.exists) {
        roomsCollection
          .doc(idRoom)
          .get()
          .then((doc) => {
            const data = doc.data();
            res.json(data);
          });
      } else {
        res.status(401).json({
          message: "No Existis",
        });
      }
    });
});
//
app.post("/rooms/:rtdbRoom", (req, res) => {
  const { rtdbRoom } = req.params;
  const chatRoomRef = rtdb.ref("/rooms/" + rtdbRoom + "/messages");

  chatRoomRef.push(req.body, function (e) {
    res.json("todo ok.");
  });
});
app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(__dirname + "../dist/index.html");
});
app.use(express.static("dist"));
app.get("*", (req, res) => {
  res.sendFile(ROOT_PATH + "dist/index.html");
});

app.listen(port, () => {
  console.log(`Escuchando en http://localhost:${port}`);
});
