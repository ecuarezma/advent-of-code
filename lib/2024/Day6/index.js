import fs from "fs";

const data = fs.readFileSync("input.txt", "utf-8");
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
const moveEast = (x, y) => {
  grid[x][y] = "X";
  let obstacle;
  let column = y + 1;
  while (!obstacle && column <= grid[x].length - 1) {
    if (grid[x][column] === ".") {
      grid[x][column] = "X";
    }
    if (grid[x][column] === "#") {
      grid[x][column - 1] = "v";
      obstacle = true;
    } else if (column === grid[x].length - 1) {
      console.log("complete!");
      break;
    }
    column++;
  }
};
const moveWest = (x, y) => {
  grid[x][y] = "X";
  let obstacle;
  let column = y - 1;
  while (!obstacle && column >= 0) {
    if (grid[x][column] === ".") {
      grid[x][column] = "X";
    }
    if (grid[x][column] === "#") {
      grid[x][column + 1] = "^";
      obstacle = true;
    } else if (column === 0) {
      console.log("complete!");
      break;
    }
    column--;
  }
};
const moveNorth = (x, y) => {
  grid[x][y] = "X";
  let obstacle;
  let row = x - 1;
  while (!obstacle && row >= 0) {
    if (grid[row][y] === ".") {
      grid[row][y] = "X";
    }
    if (grid[row][y] === "#") {
      grid[row + 1][y] = ">";
      obstacle = true;
    } else if (row === 0) {
      console.log("complete!");
      break;
    }
    row--;
  }
};

const moveSouth = (x, y) => {
  grid[x][y] = "X";
  let obstacle;
  let row = x + 1;
  while (!obstacle && row <= grid.length - 1) {
    if (grid[row][y] === ".") {
      grid[row][y] = "X";
    }
    if (grid[row][y] === "#") {
      grid[row - 1][y] = "<";
      obstacle = true;
    } else if (row === grid.length - 1) {
      console.log("complete!");
      break;
    }
    row++;
  }
};

const nextMove = ({ x, y, direction }) => {
  switch (direction) {
    case "north":
      moveNorth(x, y);
      break;
    case "east":
      moveEast(x, y);
      break;
    case "south":
      moveSouth(x, y);
      break;
    case "west":
      moveWest(x, y);
      break;
    default:
      break;
  }
};

(function shift() {
  let position = getPosition();
  if (position) {
    nextMove(position);
    shift();
  }
})();

let positions = 0;
grid.forEach((row) => {
  row.forEach((char) => {
    if (char === "X") positions++;
  });
  // console.log(row.join(""));
});

console.log("Total positions are: ", positions);
