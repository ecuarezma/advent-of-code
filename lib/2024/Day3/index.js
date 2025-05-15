import fs from "fs";

const data = fs.readFileSync("input.txt", "utf-8");
const regex = /mul\((\d+),(\d+)\)/g;
let scan = data.matchAll(regex);

let values = [...scan].map((el) => {
  const [_, x, y] = el;
  return [Number(x) || 0, Number(y) || 0];
});

let result = 0;

const mul = (x, y) => x * y;

for (const value of values) {
  result += mul(value[0], value[1]);
}
console.log(`Result is ${result}`);
