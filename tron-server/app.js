// ========================== EXTERNAL IMPORTS ========================== //

const express = require('express');

const app = express();

// ========================== INTERNAL IMPORTS ========================== //

const routes = require('./routes/index');

// ========================== MIDDLEWARES ========================== //

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// ========================== PAGES ========================== //

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

// ========================== ROUTES ========================== //

app.use('/moto', routes.moto);

// ========================== RUN APP ========================== //

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('READY');
});

// ============================================================= //
