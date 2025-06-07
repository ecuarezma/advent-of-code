import fs from "fs";

export default class GuardPatrol {
  constructor(filename) {
    const data = fs.readFileSync(`${filename}.txt`, "utf-8");
    this.positionRegex = new RegExp(/^[\^><v]$/, "g");
    this.grid = data.split("\n").map((row) => [...row]);
    this.position = null;
    this.totalPositions = 0;
    this.setPosition();
  }
  setPosition() {
    let start;
    const directionMapping = {
      "^": "north",
      ">": "east",
      v: "south",
      "<": "west",
    };

    for (const row in this.grid) {
      this.grid[row].find((char, idx) => {
        if (char.match(this.positionRegex)?.length > 0)
          start = [Number(row), idx];
      });
    }
    if (!start) {
      this.position = null;
      return;
    }
    const [x, y] = [...start];
    const direction = directionMapping[this.grid[x][y]];
    this.position = { x, y, direction };
  }
  east(x, y) {
    this.grid[x][y] = "X";
    let obstacle;
    let column = y + 1;
    while (!obstacle && column <= this.grid[x].length - 1) {
      if (this.grid[x][column] === ".") {
        this.grid[x][column] = "X";
      }
      if (this.grid[x][column] === "#") {
        this.grid[x][column - 1] = "v";
        obstacle = true;
      } else if (column === this.grid[x].length - 1) {
        console.log("complete!");
        break;
      }
      column++;
    }
  }
  west(x, y) {
    this.grid[x][y] = "X";
    let obstacle;
    let column = y - 1;
    while (!obstacle && column >= 0) {
      if (this.grid[x][column] === ".") {
        this.grid[x][column] = "X";
      }
      if (this.grid[x][column] === "#") {
        this.grid[x][column + 1] = "^";
        obstacle = true;
      } else if (column === 0) {
        console.log("complete!");
        break;
      }
      column--;
    }
  }
  north(x, y) {
    this.grid[x][y] = "X";
    let obstacle;
    let row = x - 1;
    while (!obstacle && row >= 0) {
      if (this.grid[row][y] === ".") {
        this.grid[row][y] = "X";
      }
      if (this.grid[row][y] === "#") {
        this.grid[row + 1][y] = ">";
        obstacle = true;
      } else if (row === 0) {
        console.log("complete!");
        break;
      }
      row--;
    }
  }

  south(x, y) {
    this.grid[x][y] = "X";
    let obstacle;
    let row = x + 1;
    while (!obstacle && row <= this.grid.length - 1) {
      if (this.grid[row][y] === ".") {
        this.grid[row][y] = "X";
      }
      if (this.grid[row][y] === "#") {
        this.grid[row - 1][y] = "<";
        obstacle = true;
      } else if (row === this.grid.length - 1) {
        console.log("complete!");
        break;
      }
      row++;
    }
  }
  nextPosition({ x, y, direction }) {
    switch (direction) {
      case "north":
        this.north(x, y);
        break;
      case "east":
        this.east(x, y);
        break;
      case "south":
        this.south(x, y);
        break;
      case "west":
        this.west(x, y);
        break;
      default:
        break;
    }
  }
  startPatrol() {
    this.setPosition();
    if (this.position) {
      this.nextPosition(this.position);
      this.startPatrol();
    }
  }
  getUniquePositions() {
    this.grid.forEach((row) => {
      row.forEach((char) => {
        if (char === "X") this.totalPositions++;
      });
      console.log(row.join(""));
    });
    console.log("Total positions are: ", this.totalPositions);
  }
}
