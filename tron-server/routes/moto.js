const express = require('express');
const app = express();
let motos, number;

init();

app.get('/number', (req, res) => {
    res.send('' + number);
    number++;
});

app.get('/clear', (req, res) => {
    init();
    res.send('OK');
});

app.get('/coords', (req, res) => {
    res.send(motos);
});

app.get('/coords/:moto', (req, res) => {
    res.send(motos[req.params.moto]);
});

app.get('/coords/:moto/:direction', (req, res) => {
    move(req.params.moto, req.params.direction, () => {
        res.send(motos);
    });
});

function init() {
    motos = [];
    number = 0;

    for (i = 0; i < 6; i++) {
        motos.push({
            name: '',
            coords: {
                x: 0,
                y: 0
            }
        });
    }
}

function move(moto, direction, success) {
    const speed = 10;
    switch (+direction) {
        case 37: //left
            motos[moto].coords.x -= speed;
            break;
        case 38: //up
            motos[moto].coords.y -= speed;
            break;
        case 39: //right
            motos[moto].coords.x += speed;
            break;
        case 40: //down
            motos[moto].coords.y += speed;
            break;
    }
    success();
}


module.exports = app;