const fs = require("fs");

const input = fs
  .readFileSync("input.txt", "utf-8")
  .split(",")
  .map((x) => x * 1);

const days = 80;

let counter = 0;

while (counter < days) {
  input.forEach((el, i) => {
    if (input[i] === 0) {
      input[i] = 6;
      input.push(8);
    } else {
      input[i] = input[i] - 1;
    }
  });
  counter++;
}

console.log(`Part 1: ${input.length}`);

const numDays = 256;

let totalFishes = 0;
let timers = new Array(9).fill(0);

for (let fish of input) timers[fish]++;

for (let day = 0; day < numDays; day++) {
  let amount = timers.shift();

  //  reinsert itself
  timers[6] += amount;

  // insert offspring
  timers.push(amount); //timers[8];
}

// count fishes
for (let i = 0; i < timers.length; i++) totalFishes += timers[i];

console.log(`Part 2: ${totalFishes} `);
