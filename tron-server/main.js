const express = require('express');
const firebase = require('firebase');
const app = express();

// Initialize Firebase
const config = {
    apiKey: "AIzaSyA2VQu4E8T12NEI_oW281ZQjKlR-2UC1iA",
    authDomain: "tron-io.firebaseapp.com",
    databaseURL: "https://tron-io.firebaseio.com",
    projectId: "tron-io",
    storageBucket: "",
    messagingSenderId: "38773464912"
};

firebase.initializeApp(config);

const db = firebase.database();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.set('port', process.env.PORT || 3000);

let coord1 = {
    x: 0,
    y: 0
}

let coord2 = {
    x: 0,
    y: 0
}

app.get('/1', (req, res) => {
    res.send(coord1);
});

app.get('/2', (req, res) => {
    res.send(coord2);
});

app.get('/set1', (req, res) => {
    coord1.x = req.query.x;
    coord1.y = req.query.y;
    res.send('');
});

app.get('/set2', (req, res) => {
    coord2.x = req.query.x;
    coord2.y = req.query.y;
    res.send('');
});

app.listen(app.get('port'), () => {
    console.log('READY');
});