const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf8").split("\n");

const input = raw.map((x) => {
  let temp = x.split(" ");
  return [temp[0], temp[1] * 1];
});

let horizontal = 0;
let depth = 0;

input.forEach((move) => {
  if (move[0] === "forward") {
    horizontal += move[1];
  } else if (move[0] === "down") {
    depth += move[1];
  } else if (move[0] === "up") {
    depth -= move[1];
  }
});

console.log(`Result of part1: ${horizontal * depth}`);

let aim = 0;
horizontal = 0;
depth = 0;

input.forEach((move) => {
  if (move[0] === "forward") {
    horizontal += move[1];
    depth += aim * move[1];
  } else if (move[0] === "down") {
    aim += move[1];
  } else if (move[0] === "up") {
    aim -= move[1];
  }
});

console.log(`Result of part2: ${horizontal * depth}`);
