let express = require('express')
let app = express();
let firebase = require('firebase')
var firebaseConfig = {
    apiKey: "AIzaSyAT4-tadx6Y_QPwGWu6BqO9j7SWLFpMedg",
    authDomain: "test-20ebc.firebaseapp.com",
    databaseURL: "https://test-20ebc.firebaseio.com",
    projectId: "test-20ebc",
    storageBucket: "test-20ebc.appspot.com",
    messagingSenderId: "1017975822779",
    appId: "1:1017975822779:web:4e31a35d43a0dc1fbbcc9e",
    measurementId: "G-TMZGW3Z18W"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
app.set('view engine', 'ejs');//觀看渲染的引勤是誰 
app.get('/', async function(req, res){
    let data = await db.collection('classA').get();
    let userArr=[];
    data.docs.forEach((doc)=>{
        userArr.push(doc.data().name);
    });

//原本該要打views/default 但views裡的東西不需要再多加路徑 ejs會自己去找
    res.render("default", {
        users: userArr,
        title: "This is root page!"
    })
})
app.listen(3000, () => {
    console.log("render_test server is running at http://127.0.0.1:3000")
})