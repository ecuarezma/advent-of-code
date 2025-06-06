import fs from "fs";

const data = fs.readFileSync("mock.txt", "utf-8");
const positionRegex = new RegExp(/^[\^><v]$/, "g");

const grid = data.split("\n").map((row) => [...row]);

const getPosition = () => {
  let start;
  const directionMapping = {
    "^": "north",
    ">": "east",
    v: "south",
    "<": "west",
  };

  for (const row in grid) {
    grid[row].find((char, idx) => {
      if (char.match(positionRegex)?.length > 0) {
        start = [row, idx];
      }
    });
  }
  const [x, y] = [...start];
  const direction = directionMapping[grid[x][y]];
  return { x, y, direction };
};
