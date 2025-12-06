import fs from "fs";

let data = fs.readFileSync("input.txt", "utf-8").split("\n");

let count = 0;
const safe = (position = 50) => {
  const numbers = [];
  for (let i = 0; i <= 99; i++) {
    numbers.push(i);
  }

  return numbers[position];
};

const getPosition = (position = 50, direction) => {
  //TODO: Need to account for directions greater than 100 cause of course they'd do that
  if (!direction) return safe();
  if (direction.includes("L")) {
    direction = Number(direction.split("L")[1]);
    position -= direction;
  } else if (direction.includes("R")) {
    direction = Number(direction.split("R")[1]);
    position += direction;
  }
  while (position < 0 || position > 99) {
    if (position < 0) {
      position = 100 - Math.abs(position);
    }
    if (position > 99) {
      position -= 100;
    }
  }

  return position;
};

let currPosition = getPosition();

for (const pos of data) {
  if (currPosition === 0) count += 1;
  currPosition = getPosition(currPosition, pos);
}

console.log(count);
