const motos = [];
let number;
let direction;
let flag = 0;
let flagConnection = 0;

function createMotos() {
  for (let i = 0; i < 6; i += 1) {
    motos.push(document.getElementById(`moto${i}`).style);
  }
}

function httpGet(url, success) {
  const http = new XMLHttpRequest();

  http.open('GET', `https://tronio-server.herokuapp.com${url}`, true);
  // http.open('GET', 'http://localhost:3000' + url, true);

  http.onreadystatechange = () => {
    if (http.status === 0) {
      flagConnection = 1;
      console.log('Can\'t connect to the server...');
    } else if (http.readyState === 4 && http.status === 200) {
      success(http.response);
    }
  };

  http.send();
}

function populate(res) {
  res.forEach((moto, i) => {
    motos[i].top = `${moto.coords.y}px`;
    motos[i].left = `${moto.coords.x}px`;
  });
}

function update(res) {
  if (flagConnection === 0) {
    if (!res) {
      httpGet('/moto/coords', (response) => {
        populate(JSON.parse(response));
      });
      return;
    }
    populate(res);
  }
}

function move() {
  httpGet(`/moto/coords/${number}/${direction}`, (res) => {
    update(JSON.parse(res));
    setTimeout(() => {
      move();
    }, 50);
  });
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

httpGet('/moto/number', (res) => {
  number = res;
});

createMotos();
setInterval(update, 50);
getArrow();
