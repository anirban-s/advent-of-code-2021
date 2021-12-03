const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf-8").split("\n");

let gammaRate = "";
let epsilonRate = "";

for (let i = 0; i < raw[0].length; i++) {
  let ones = 0;
  let zeros = 0;
  for (let j = 0; j < raw.length; j++) {
    raw[j][i] === "1" ? ones++ : zeros++;
  }
  gammaRate += ones > zeros ? "1" : "0";
  epsilonRate += ones > zeros ? "0" : "1";
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = parseInt(epsilonRate, 2);

console.log(`Part 1 : ${gammaRate * epsilonRate}`);
