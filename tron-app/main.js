const html = document.getElementById('html');
const motos = [];
let number;

httpGet('/moto/number', (res) => {
    number = res;
});

for (i = 0; i < 6; i++) {
    motos.push(document.getElementById('moto' + i).style);
}

function getArrow() {
    html.addEventListener('keydown', (e) => {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            move(e.keyCode);
        }
    });
}

function httpGet(url, success) {
    var http = new XMLHttpRequest();

    http.open('GET', 'http://localhost:3000' + url, true);

    http.onreadystatechange = () => {
        if (http.status === 0) {
            console.log('Can\'t connect to the server...');
        } else if (http.readyState === 4 && http.status === 200) {
            success(http.response);
        }
    }

    http.send();
}

function move(direction) {
    httpGet('/moto/coords/' + number + '/' + direction, (res) => {
        update(JSON.parse(res));
    });
}

function update(res) {
    if (!res) {
        httpGet('/moto/coords', (res) => {
            populate(JSON.parse(res));
        });
        return;
    }
    populate(res);
}

function populate(res) {
    res.forEach((moto, i) => {
        motos[i].top = moto.coords.y + 'px';
        motos[i].left = moto.coords.x + 'px';
    });
}

setInterval(update, 50);

getArrow();