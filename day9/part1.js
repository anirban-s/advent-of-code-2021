const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8').split('\n').map(line => {
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

function run() {
  let lowPoints = [];
  input.forEach((row, y) => {
    row.forEach((number, x) => {
      if (verifySlow(x, y)) {
        lowPoints.push(number);
      };
    });
  });
  const sumPoints = lowPoints.reduce((a, b) => a + (b + 1), 0);
  return sumPoints;
};

console.log(run());