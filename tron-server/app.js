//=============== EXTERNAL IMPORTS ===============//

const express = require('express');
const firebase = require('firebase');
const app = express();

//=============== INTERNAL IMPORTS ===============//

const routes = require('./routes/index');

//=============== FIREBASE CONFIG ===============//
const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "tron-io.firebaseapp.com",
    databaseURL: "https://tron-io.firebaseio.com",
    projectId: "tron-io",
    storageBucket: "",
    messagingSenderId: "38773464912"
};

firebase.initializeApp(config);

const db = firebase.database();

//=============== GLOBAL VARIABLES ===============//



//=============== MIDDLEWARES ===============//

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//================== PAGES ==================//

app.get('/', (req, res) => {
    res.send('HOME PAGE');
});

//================== ROUTES ==================//

app.use('/moto', routes.moto);

//=================== RUN APP ===================//

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
    console.log('READY');
});

//===============================================//