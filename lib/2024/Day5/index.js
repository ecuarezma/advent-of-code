import fs from "fs";

let rules = [];
const updates = [];

let data = fs.readFileSync("input.txt", "utf-8");
data = data.split(/\s+/).forEach((d) => {
  if (d.includes("|")) rules.push(d);
  else updates.push(d.split(","));
});

rules = rules.map((rule) => {
  const [x, y] = rule.split("|");
  return { [x]: y };
});

const correctList = [];
let middlePageTotal = 0;

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
}

for (const list of correctList) {
  const middle = Math.floor((list.length - 1) / 2);
  middlePageTotal += Number(list[middle]);
}

console.log(
  `The total of the middle values from the correctly ordered updates is: ${middlePageTotal}`
);
