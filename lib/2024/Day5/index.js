import fs from "fs";

let rules = [];
const updates = [];

let data = fs.readFileSync("input.txt", "utf-8");
data = data.split(/\s+/).forEach((d) => {
  if (d.includes("|")) rules.push(d);
  else updates.push(d.split(",").map(Number));
});

rules = rules.map((rule) => {
  const [x, y] = rule.split("|").map(Number);
  return { [x]: y };
});

const correctList = [];
const incorrectList = [];
let middlePageTotal = 0;

//Part One
for (const update of updates) {
  let isCorrect = [];
  update.forEach((num1, idx1, arr) => {
    const check = rules
      .filter((rule) => rule[num1])
      .every((rule) => {
        let idx2 = arr.indexOf(rule[num1]);
        if (idx2 === -1) return true;
        if (idx1 < idx2) return true;
      });
    isCorrect.push(check);
  });
  if (isCorrect.every((li) => li)) correctList.push(update);
  else incorrectList.push(update);
}

for (const list of correctList) {
  const middle = Math.floor((list.length - 1) / 2);
  middlePageTotal += list[middle];
}

console.log(
  `The total of the middle values from the correctly ordered updates is: ${middlePageTotal}`
);

//Part Two!!
//fixin the incorrect lists
for (const list of incorrectList) {
  let rowRules = [];
  list.forEach((num) => {
    rowRules.push(...rules.filter((r) => r[num]));
  });
  for (const rule of rowRules) {
    for (const [key, value] of Object.entries(rule)) {
      let idx = list.indexOf(Number(key));
      let lowestIdx = list.indexOf(Number(key));
      const ruleIdx = list.indexOf(value);
      if (ruleIdx === -1 || idx < ruleIdx) continue;
      while (lowestIdx > ruleIdx) {
        lowestIdx--;
      }
      [list[lowestIdx], list[idx]] = [list[idx], list[lowestIdx]];
    }
  }
}

middlePageTotal = 0;

for (const list of incorrectList) {
  const middle = Math.floor((list.length - 1) / 2);
  middlePageTotal += list[middle];
}

console.log(
  `The total of the middle values from the incorrectly ordered updates is: ${middlePageTotal}`
);
