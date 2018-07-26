const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

//================== MIDLEWARE STATIC ==================//

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/css'));

//================== ROUTES ==================//

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

//================== RUN APP ==================//

app.listen(app.get('port'), () => {
    console.log('READY');
});

//==============================================//