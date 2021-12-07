const fs = require("fs");

const input = fs.readFileSync("input.txt", "utf-8").split(",").map(Number);

const min = Math.min(...input);
const max = Math.max(...input);
let minCost = Number.MAX_VALUE;

function getFuelCost(move) {
  let fuelCost = 0;
  for (let i = 0; i < input.length; i++) {
    fuelCost += Math.abs(input[i] - move);
  }
  return fuelCost;
}

for (let i = min; i <= max; i++) {
  let cost = getFuelCost(i);
  minCost = Math.min(cost, minCost);
}

console.log(`Part 1 ${minCost}`);

minCost = Number.MAX_VALUE;
function getNewFuelCost(move) {
  let fuelCost = 0;
  for (let i = 0; i < input.length; i++) {
    let displacement = Math.abs(input[i] - move);
    fuelCost += (displacement * (displacement + 1)) / 2;
  }
  return fuelCost;
}

for (let i = min; i <= max; i++) {
  let cost = getNewFuelCost(i);
  minCost = Math.min(cost, minCost);
}

console.log(`Part 2 ${minCost}`);
