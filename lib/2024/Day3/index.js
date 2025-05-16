import fs from "fs";

const data = fs.readFileSync("input.txt", "utf-8");
const mul = (x, y) => x * y;

let instructions = (scan) => {
  let values = [...scan].map((el) => {
    const [_, x, y] = el;
    return [Number(x) || 0, Number(y) || 0];
  });
  for (const value of values) {
    result += mul(value[0], value[1]);
  }
};

//part one
let result = 0;
const regexMul = /mul\((\d+),(\d+)\)/g;
const scanAll = data.matchAll(regexMul);
instructions(scanAll);
console.log(`Result is ${result}`);

//part two
result = 0;
const regexBeginning = /.*?(do\(\)|don't\(\))/;
const regexBetweenDoAndDont = /do\(\)([\s\S]*?)don't\(\)/g;

const beginning = data.match(regexBeginning);
const middle = data.matchAll(regexBetweenDoAndDont).map((match) => match[0]);
const end = data.split("do()").pop();

const scan1 = beginning[0].matchAll(regexMul);
const scan2 = [...middle].join().matchAll(regexMul);
const scan3 = end.matchAll(regexMul);

instructions(scan1);
instructions(scan2);
instructions(scan3);

console.log(`Part 2 result is ${result}`);
