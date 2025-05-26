import fs from "fs";

let rules = [];
const updates = [];

let data = fs.readFileSync("mock.txt", "utf-8");
data = data.split(/\s+/).forEach((d) => {
  if (d.includes("|")) rules.push(d);
  else updates.push(d);
});

rules = rules.map((rule) => {
  const [x, y] = rule.split("|");
  return { [x]: y };
});
