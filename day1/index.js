const fs = require('fs');
let input;
try {
  const data = fs.readFileSync('input.txt', 'utf8').split('\n');
  input = data.map(x => x*1);
} catch (err) {
  console.error(err)
}

// Part 1
let previous = input[0]
let count = 0;

for (let i = 1; i < input.length; i++){
  if (input[i] > previous) {
    count++;
  }
  previous = input[i]
}

console.log(count)


// Part 2
previous = input[0] + input[1] + input[2]
count = 0;
for (let i = 0; i < input.length - 3 + 1; i++){
  let current = input[i] + input[i+1] + input[i+2];
  if (current > previous) {
    count++;
  }
  previous = current;
}

console.log(count)