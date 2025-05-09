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

// Part One - Sum of differences
for (let i = 0; i < list1.length; i++) {
  deltaList.push(Math.abs(list1[i] - list2[i]));
}

const sum = deltaList.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of differences:", sum);

// Part Two - Similarity score
const similarityList = [];
const frequencyTracker = new Map();

for (let i = 0; i < list1.length; i++) {
  let count = 0;
  if (frequencyTracker.has(list1[i])) continue;
  for (let j = 0; j < list2.length; j++) {
    if (list1[i] === list2[j]) {
      count++;
    }
  }
  if (count && !frequencyTracker.has(list1[i])) {
    frequencyTracker.set(list1[i], count);
  }
  similarityList.push(list1[i] * (frequencyTracker.get(list1[i]) || 0));
}

const total = similarityList.reduce((acc, curr) => acc + curr, 0);
console.log("The similarity score is ", total);
