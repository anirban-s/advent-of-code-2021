const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf-8").split("\r\n");

function createInput() {
  let input = [];
  raw.forEach((item) => {
    input.push(item.split(" -> "));
  });
  input.forEach((item, i) => {
    let item1 = item[0].split(",").map((x) => x * 1);
    let item2 = item[1].split(",").map((x) => x * 1);
    input[i] = [...item1, ...item2];
  });
  return input;
}

const input = createInput();
let xMax = 0;
let yMax = 0;
input.forEach((row) => {
  if (row[0] > xMax) xMax = row[0];
  if (row[1] > yMax) yMax = row[1];
  if (row[2] > xMax) xMax = row[2];
  if (row[3] > yMax) yMax = row[3];
});

function createGrid(x, y) {
  let grid = [];
  for (let i = 0; i <= y; i++) {
    let temp = [];
    for (let j = 0; j <= x; j++) {
      temp.push(0);
    }
    grid.push(temp);
  }
  return grid;
}

let grid = createGrid(xMax, yMax);

// let point1 = [2, 2, 2, 1];
// let point2 = [0, 9, 5, 9];
// let point3 = [0, 9, 2, 9];
function setPoint(point) {
  let orientation = "";
  if (point[0] === point[2]) {
    orientation = "vertical";
  } else if (point[1] === point[3]) {
    orientation = "horizontal";
  }

  if (orientation === "vertical") {
    let min = Math.min(point[1], point[3]);
    let max = Math.max(point[1], point[3]);

    for (let x = min; x <= max; x++) {
      grid[x][point[0]] += 1;
    }
  }

  if (orientation === "horizontal") {
    let min = Math.min(point[0], point[2]);
    let max = Math.max(point[0], point[2]);

    for (let x = min; x <= max; x++) {
      grid[point[1]][x] += 1;
    }
  }
}

input.forEach((row) => {
  setPoint(row);
});

let count = 0;
for (let row = 0; row <= yMax; row++) {
  for (let col = 0; col <= xMax; col++) {
    if (grid[row][col] >= 2) {
      count++;
    }
  }
}

console.log(`Part 1: ${count}`);

grid = createGrid(xMax, yMax);

// let point = [8, 0, 0, 8];
// let point = [6, 4, 2, 0];
// let point = [0, 0, 8, 8];
// let point = [5, 5, 8, 2];
function setNewPoint(point) {
  let orientation = "";
  if (point[0] === point[2]) {
    orientation = "vertical";
  } else if (point[1] === point[3]) {
    orientation = "horizontal";
  } else {
    orientation = "diagonal";
  }

  if (orientation === "vertical") {
    let min = Math.min(point[1], point[3]);
    let max = Math.max(point[1], point[3]);

    for (let x = min; x <= max; x++) {
      grid[x][point[0]] += 1;
    }
  }

  if (orientation === "horizontal") {
    let min = Math.min(point[0], point[2]);
    let max = Math.max(point[0], point[2]);

    for (let x = min; x <= max; x++) {
      grid[point[1]][x] += 1;
    }
  }

  if (orientation === "diagonal") {
    let x1 = point[0],
      y1 = point[1],
      x2 = point[2],
      y2 = point[3];

    if (x1 > x2 && y1 < y2) {
      while (y1 <= y2) {
        grid[y1][x1] += 1;
        x1--;
        y1++;
      }
    } else if (x1 > x2 && y1 > y2) {
      while (y2 <= y1) {
        grid[y2][x2] += 1;
        x2++;
        y2++;
      }
    } else if (x1 < x2 && y1 < y2) {
      while (y1 <= y2) {
        grid[y1][x1] += 1;
        y1++;
        x1++;
      }
    } else if (x1 < x2 && y1 > y2) {
      while (y2 <= y1) {
        grid[y2][x2] += 1;
        y2++;
        x2--;
      }
    }
  }
}

input.forEach((row) => {
  setNewPoint(row);
});

count = 0;
for (let row = 0; row <= yMax; row++) {
  for (let col = 0; col <= xMax; col++) {
    if (grid[row][col] >= 2) {
      count++;
    }
  }
}

console.log(`Part 2: ${count}`);
