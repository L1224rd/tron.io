const express = require('express');

const app = express();

let    motos    ;
let number;    
let speed = 10; // amount that the moto will move each time move is called





function init() { // populates the motos array
  motos = [];
  number = 0; // set the id to 0

  for (let i = 0; i < 6; i += 1) { // push 6 moto's into motos with the coords (0,0)
    motos.push({
      name: '',
      coords: {
        x: 0,
        y: 0,
      },
    });
  }
}

function move(moto, direction, success) { // moves the specified moto in the specified direction
  if (motos[moto].coords.y < -moto * 20) motos[moto].coords.y = 480 - moto * 20;
  if (motos[moto].coords.y > 480 - moto * 20) motos[moto].coords.y = -moto * 20;
  if (motos[moto].coords.x < 0) motos[moto].coords.x = 980;
  if (motos[moto].coords.x > 980) motos[moto].coords.x = 0;

  switch (+direction) { // (37 - 40) are the keyCodes of the arrow keys
    case 37: // left
      motos[moto].coords.x -= speed;
      break;
    case 38: // up
      motos[moto].coords.y -= speed;
      break;
    case 39: // right
      motos[moto].coords.x += speed;
      break;
    case 40: // down
      motos[moto].coords.y += speed;
      break;
    default:
      break;
  }
  success(); // callback
}

app.get('/number', (req, res) => { // sets an id to each page that call it
  if (number === 6) init();
  res.send(`${number}`); // send the id as a string to avoid errors (0 and 1)
  number += 1; // auto increment
});

app.get('/clear', (req, res) => { // resets the motos array
  init();
  res.send('OK');
});

app.get('/speed/:speed', (req, res) => { // resets the motos array
  speed = +req.params.speed;
  res.send(`Speed set to ${speed}`);
});

app.get('/coords', (req, res) => { // sends the coordinates of all the motos
  res.send(motos);
});

app.get('/coords/:moto', (req, res) => { // sends coordinate of the specified moto
  res.send(motos[req.params.moto]);
});

app.get('/coords/:moto/:direction', (req, res) => { // receives a moto id and a direction
  move(req.params.moto, req.params.direction, () => {
    res.send(motos); // sends the coordinates of all the motos
  });
});

init();

module.exports = app;
