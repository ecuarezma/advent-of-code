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
      if (char.match(positionRegex)?.length > 0) start = [Number(row), idx];
    });
  }
  if (!start) return null;
  const [x, y] = [...start];
  const direction = directionMapping[grid[x][y]];
  return { x, y, direction };
};

//get starting position
let position1 = getPosition();
const moveNorth = (x, y) => {
  grid[x][y] = "X";
  let obstacle;
  let row = x - 1;
  while (!obstacle && row >= 0) {
    if (grid[row][y] === ".") {
      grid[row][y] = "X";
    }
    if (row === 0) {
      console.log("complete!");
      break;
    } else if (grid[row][y] === "#") {
      grid[row + 1][y] = ">";
      obstacle = true;
    }
    row--;
  }
};
moveNorth(position1.x, position1.y);
grid.forEach((row) => console.log(row.join("")));
console.log(getPosition());
