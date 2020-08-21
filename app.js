let express = require("express");
let firebase = require("firebase");
var firebaseConfig = {
  apiKey: "AIzaSyAT4-tadx6Y_QPwGWu6BqO9j7SWLFpMedg",
  authDomain: "test-20ebc.firebaseapp.com",
  databaseURL: "https://test-20ebc.firebaseio.com",
  projectId: "test-20ebc",
  storageBucket: "test-20ebc.appspot.com",
  messagingSenderId: "1017975822779",
  appId: "1:1017975822779:web:4e31a35d43a0dc1fbbcc9e",
  measurementId: "G-TMZGW3Z18W",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();
let app = express();
app.get("/oohyuti", (req, res) => {
  res.send("<h1>oohyuti");
});
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  let options = {
    root: __dirname,
    dotfiles: "ignore",
  };
  res.sendFile("/homepage.html", options);
});

app.get("/classA_backend", async (req, res) => {
  let data = await db.collection("classA").get();
  userArr = [];
  data.forEach((doc) => {
    userArr.push({
      id: doc.id,
      name: doc.data().name,
      age: doc.data().age,
      gender: doc.data().gender,
    });
  });
  res.render("classA", {
    users: userArr,
  });
});

app.get("/classA_frontend", (req, res) => {
  let options = {
    root: __dirname + "/public",
    dotfiles: "ignore",
  };
  console.log(__dirname + "/public");
  res.sendFile("/classA.html", options);
});

app.get("/who/:name", (req, res) => {
  var name = req.params.name;
  res.send(`This is ${name}`);
});

app.get("/API/deleteMember", (req, res) => {
  db.collection("classA").doc(req.query.id).delete();
  console.log(req.query.id);
  res.send(`delete Member id = ${req.query.id}!`);
});

app.get("/API/addMember", (req, res) => {
  db.collection("classA").add({
    name: req.query.name,
    gender: req.query.age,
    age: req.query.gender,
  });
  console.log("Add member !!");
  res.send("Add member success!");
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Listening");
});
