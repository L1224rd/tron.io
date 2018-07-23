const moto1 = document.getElementById('moto1').style;
const moto2 = document.getElementById('moto2').style;
const body = document.getElementById('body');
const html = document.getElementById('html');
let flag = 0;
let myCoord;
let otherCoord;

getCoord(() => {
    getOtherCoord(() => {
        continuar();
    });
});

function continuar() {
    moto1.left = myCoord.x + 'px';
    moto1.top = myCoord.y + 'px';
    getArrow();
}

function moveBall(direction) {
    if (flag) return;
    switch (direction) {
        case 37: //left
            moto1.left = myCoord.x + 'px';
            --myCoord.x;
            break;
        case 38: //up
            moto1.top = myCoord.y + 'px';
            --myCoord.y;
            break;
        case 39: //right
            moto1.left = myCoord.x + 'px';
            ++myCoord.x;
            break;
        case 40: //down
            moto1.top = myCoord.y + 'px';
            ++myCoord.y;
            break;
    }
    setCoord(() => {
        getCoord(() => {
            moveBall(direction);
            getOtherCoord(() => {
                moto2.left = otherCoord.x + 'px';
                moto2.top = otherCoord.y + 'px';
            });
        });
    });

}

function getArrow() {
    html.addEventListener('keydown', (e) => {
        if (e.keyCode >= 37 && e.keyCode <= 40) {
            flag = 1;
            setTimeout(() => {
                flag = 0;
                moveBall(e.keyCode);
            }, 50);
        }
    });
}

function httpGet(success, url) {
    var http = new XMLHttpRequest();

    http.open('GET', url || 'http://localhost:3000/1', true);

    http.onreadystatechange = () => {
        if (http.status === 0) {
            console.log('Can\'t connect to the server...');
        } else if (http.readyState === 4 && http.status === 200) {
            success(http.response);
        }
    }

    http.send();
}

function setCoord(success) {
    httpGet(success, `http://localhost:3000/set1?x=${myCoord.x}&y=${myCoord.y}`);
}

function getCoord(success) {
    httpGet((response) => {
        let res = JSON.parse(response);
        myCoord = {
            x: res.x,
            y: res.y
        }
        success();
    });
}

function getOtherCoord(success) {
    httpGet((response) => {
        let res = JSON.parse(response);
        otherCoord = {
            x: res.x,
            y: res.y
        }
        success();
    }, 'http://localhost:3000/2');
}

