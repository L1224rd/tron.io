"use strict";

const motos = [];
let number;
let direction;
let flag = 0;
let flagConnection = 0;

httpGet('/moto/number', (res) => {
    number = res;
});

for (let i = 0; i < 6; i++) {
    motos.push(document.getElementById('moto' + i).style);
}

function getArrow() {
    document.getElementById('html').addEventListener('keydown', (e) => {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            direction = e.keyCode;
            if (flag === 0) {
                flag = 1;
                move();
            }
        }
    });
}

function httpGet(url, success) {
    var http = new XMLHttpRequest();

    http.open('GET', 'https://tronio-server.herokuapp.com' + url, true);
    // http.open('GET', 'http://localhost:3000' + url, true);

    http.onreadystatechange = () => {
        if (http.status === 0) {
            flagConnection = 1;
            console.log('Can\'t connect to the server...');
        } else if (http.readyState === 4 && http.status === 200) {
            success(http.response);
        }
    }

    http.send();
}

function move() {
    httpGet('/moto/coords/' + number + '/' + direction, (res) => {
        update(JSON.parse(res));
        setTimeout(() => {
            move();
        }, 10);
    });
}

function update(res) {
    if (flagConnection === 0) {
        if (!res) {
            httpGet('/moto/coords', (res) => {
                populate(JSON.parse(res));
            });
            return;
        }
        populate(res);
    }
}

function populate(res) {
    res.forEach((moto, i) => {
        motos[i].top = moto.coords.y + 'px';
        motos[i].left = moto.coords.x + 'px';
    });
}

setInterval(update, 50);

getArrow();