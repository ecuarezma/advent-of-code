export const getPosition = () => {
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
const east = (x, y) => {
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
const west = (x, y) => {
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
const north = (x, y) => {
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

const south = (x, y) => {
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

export const move = { east, north, south, west };
