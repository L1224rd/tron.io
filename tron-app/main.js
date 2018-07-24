const html = document.getElementById('html');
const motos = [];
let number;

httpGet('/moto/number', (res) => {
    number = res;
});

continuousUpdate();

for (i = 0; i < 6; i++) {
    motos.push(document.getElementById('moto' + i).style);
}

function getArrow() {
    html.addEventListener('keydown', (e) => {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            setTimeout(() => {
                move(e.keyCode);
            }, 50);
        }
    });
}

function httpGet(url, success) {
    var http = new XMLHttpRequest();

    http.open('GET', 'https://tron-io.herokuapp.com/' + url, true);

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
    if(!res){
        httpGet('/moto/coords', (res) => {
            populate(JSON.parse(res));
        });
        return;
    }
    populate(res);
}

function populate(res){
    res.forEach((moto, i) => {
        motos[i].top = moto.coords.y + 'px';
        motos[i].left = moto.coords.x + 'px';
    });
}

function continuousUpdate(){
    update();
    setTimeout(() => {
        continuousUpdate();
    }, 5);
}

getArrow();