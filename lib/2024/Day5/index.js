import fs from "fs";

let rules = [];
const updates = [];

let data = fs.readFileSync("mock.txt", "utf-8");
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
for (let list of incorrectList) {
  let check = false;
  while (!check) {
    let currIdx;
    list.forEach((num1, idx1, arr) => {
      currIdx = idx1;
      check = rules
        .filter((rule) => rule[num1])
        .every((rule) => {
          let idx2 = arr.indexOf(rule[num1]);
          if (idx2 === -1) return true;
          if (idx1 < idx2) return true;
          else [list[idx2], list[idx1]] = [list[idx1], list[idx2]];
        });
    });
  }
}
console.log(incorrectList);
