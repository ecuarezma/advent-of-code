import { coordinates } from "./constants.js";

const list1 = [];
const list2 = [];
const deltaList = [];

coordinates.split("\n").forEach((row) => {
  const [x, y] = row.split("   ").map(Number);
  if (x) list1.push(x);
  if (y) list2.push(y);
});
list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

if (list1.length === list2.length) {
  for (let i = 0; i < list1.length; i++) {
    deltaList.push(Math.abs(list1[i] - list2[i]));
  }
}

const sum = deltaList.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of differences:", sum);
