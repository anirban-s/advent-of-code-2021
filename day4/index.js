const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf-8").split("\n");

const input = raw[0].split(",").map((x) => x * 1);

function createBoards() {
  let boards = [];
  let board = [];
  let counter = 0;
  for (let i = 1; i < raw.length; i++) {
    if (raw[i] !== "") {
      board.push(raw[i]);
      counter++;
    }
    if (counter === 5) {
      boards.push(board);
      board = [];
      counter = 0;
    }
  }

  for (let i = 0; i < boards.length; i++) {
    boards[i].forEach((row, idx) => {
      let nums = row
        .split(" ")
        .filter((x) => x != "")
        .map((x) => x * 1);
      boards[i][idx] = nums;
    });
  }
  return boards;
}

let boards = createBoards();

function isWin(board) {
  const rowMatch =
    board[0].every((x) => x === "x") ||
    board[1].every((x) => x === "x") ||
    board[2].every((x) => x === "x") ||
    board[3].every((x) => x === "x") ||
    board[4].every((x) => x === "x");

  let colMatch = false;
  let col = 0;
  while (col < board[0].length) {
    let row = 0;
    let count = 0;
    while (row < board.length) {
      if (board[row][col] === "x") {
        count++;
      }
      if (count === 5) {
        colMatch = true;
        break;
      }
      row++;
    }
    if (colMatch) break;
    col++;
  }

  return rowMatch || colMatch;
}

let boardNo = 0;
let numIdx = 0;
let found = false;
while (numIdx < input.length) {
  let num = input[numIdx];
  while (boardNo < boards.length) {
    boards[boardNo].forEach((row, i) => {
      if (row.indexOf(num) !== -1) {
        boards[boardNo][i][row.indexOf(num)] = "x";
      }
    });
    if (isWin(boards[boardNo])) {
      found = true;
      break;
    }
    boardNo++;
  }
  if (found) break;
  boardNo = 0;
  numIdx++;
}

function getSum(board) {
  let sum = 0;
  board.forEach((row) => {
    row.forEach((x) => {
      if (x !== "x") {
        sum += x;
      }
    });
  });
  return sum;
}

console.log(`Part 1: ${getSum(boards[boardNo]) * input[numIdx]}`);

boards = createBoards();

boardNo = 0;
numIdx = 0;
found = false;
let winOrder = [];
let winNums = [];
let counter = 0;
while (numIdx < input.length) {
  let num = input[numIdx];
  while (boardNo < boards.length) {
    boards[boardNo].forEach((row, i) => {
      if (row.indexOf(num) !== -1) {
        boards[boardNo][i][row.indexOf(num)] = "x";
      }
    });
    if (isWin(boards[boardNo])) {
      if (!winOrder.includes(boardNo)) {
        winOrder.push(boardNo);
        winNums.push(input[numIdx]);
        counter++;
      }
    }
    if (counter === boards.length) {
      found = true;
      break;
    }
    boardNo++;
  }
  if (found) break;
  boardNo = 0;
  numIdx++;
}

console.log(`Part 1: ${getSum(boards[boardNo]) * input[numIdx]}`);
