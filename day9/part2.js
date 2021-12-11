const fs = require('fs');

const input = fs.readFileSync('test.txt', 'utf-8').split('\n').map(line => {
  return line.split('').map(Number)
})

function getEntorno(x, y) {
  const yLength = input.length;
  const entorno = [
    input[y][x + 1],
    input[y][x - 1],
    (y + 1) === yLength ? 9 : input[y + 1][x],
    y === 0 ? 9 : input[y - 1][x]
  ];
  return entorno.map(Number);
};

function verifySlow(x, y) {
  const entorno = getEntorno(x, y);
  const refin = entorno.filter(e => parseInt(e + 1));
  return input[y][x] < Number(Math.min(...refin));
};

function getEntornoBasin(x, y, basinObject) {
  const lowPoint = input[y][x];
  basinObject[`${x},${y}`] = lowPoint;;
  if (input[y][x + 1] && input[y][x + 1] !== 9) {

    basinObject[`${x + 1},${y}`] = input[y][x + 1];
  };
  if (input[y][x - 1] && input[y][x - 1] !== 9) {

    basinObject[`${x - 1},${y}`] = input[y][x - 1];
  };
  if (parseInt(y) !== 0) {
    if (input[y - 1][x] !== 9) {

      basinObject[`${x},${y - 1}`] = input[y - 1][x];
    };
  };
  if (y !== input.length - 1) {
    if (input[y + 1][x] !== 9) {

      basinObject[`${x},${y + 1}`] = input[y + 1][x];
    };
  };
  return null;
};

function findBasin(x, y) {
  const basinObject = {};
  getEntornoBasin(x, y, basinObject);
  for (let i = 1; i < Object.keys(basinObject).length; i += 1) {
    const [newX, newY] = Object.keys(basinObject)[i].split(',').map(Number);
    getEntornoBasin(newX, newY, basinObject);
  };
  return Object.keys(basinObject).length;
};

function run() {
  let lowPoints = [];
  let basin = [];
  input.forEach((row, y) => {
    row.forEach((number, x) => {
      if (verifySlow(x, y)) {
        lowPoints.push(number);
        basin.push(findBasin(x, y));
      };
    });
  });

  const result = basin.sort((a, b) => b - a).splice(0, 3);
  return result.reduce((a, b) => a * b);
};

console.log(run())