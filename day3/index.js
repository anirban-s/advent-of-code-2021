const fs = require("fs");

const raw = fs.readFileSync("input.txt", "utf-8").split("\n");

function getMostCharByIndex(array, i) {
  let ones = 0;
  let zeros = 0;
  for (let a = 0; a < array.length; a++) {
    array[a][i] === "1" ? ones++ : zeros++;
  }
  return ones >= zeros ? "1" : "0";
}

function getLeastCharByIndex(array, i) {
  let ones = 0;
  let zeros = 0;
  for (let a = 0; a < array.length; a++) {
    array[a][i] === "1" ? ones++ : zeros++;
  }
  return zeros <= ones ? "0" : "1";
}

let gammaRate = "";
let epsilonRate = "";

for (let i = 0; i < raw[0].length; i++) {
  let chr = getMostCharByIndex(raw, i);
  if (chr === "1") {
    gammaRate += "1";
    epsilonRate += "0";
  } else {
    gammaRate += "0";
    epsilonRate += "1";
  }
}

gammaRate = parseInt(gammaRate, 2);
epsilonRate = parseInt(epsilonRate, 2);

console.log(`Part 1 : ${gammaRate * epsilonRate}`);

let oxygenInput = [...raw];
let index = 0;
while (oxygenInput.length > 1) {
  let chr = getMostCharByIndex(oxygenInput, index);
  oxygenInput = oxygenInput.filter((ele) => ele[index] === chr);
  index++;
}

let co2Input = [...raw];
index = 0;
while (co2Input.length > 1) {
  let chr = getLeastCharByIndex(co2Input, index);
  co2Input = co2Input.filter((ele) => ele[index] === chr);
  index++;
}

const oxygenRating = parseInt(oxygenInput[0], 2);
const co2Rating = parseInt(co2Input[0], 2);

console.log(`Part 2 : ${oxygenRating * co2Rating}`);
