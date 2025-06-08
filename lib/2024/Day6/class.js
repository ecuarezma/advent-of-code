import fs from "fs";
//Part One
export class GuardPatrol {
  constructor(filename) {
    const data = fs.readFileSync(`${filename}.txt`, "utf-8");
    this.positionRegex = new RegExp(/^[\^><v]$/, "g");
    this.grid = data.split("\n").map((row) => [...row]);
    this.initialPosition = null;
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
    if (!this.initialPosition) this.initialPosition = this.position;
  }
  east(x, y) {
    let obstacle;
    let column = y + 1;
    while (!obstacle && column <= this.grid[x].length - 1) {
      if (this.grid[x][column] === ".") {
        this.grid[x][column] = "X";
      } else if (this.grid[x][column] === "#") {
        this.grid[x][column - 1] = "v";
        obstacle = true;
      } else if (column === this.grid[x].length - 1) {
        break;
      }
      column++;
    }
  }
  west(x, y) {
    let obstacle;
    let column = y - 1;
    while (!obstacle && column >= 0) {
      if (this.grid[x][column] === ".") {
        this.grid[x][column] = "X";
      } else if (this.grid[x][column] === "#") {
        this.grid[x][column + 1] = "^";
        obstacle = true;
      } else if (column === 0) {
        break;
      }
      column--;
    }
  }
  north(x, y) {
    let obstacle;
    let row = x - 1;
    while (!obstacle && row >= 0) {
      if (this.grid[row][y] === ".") {
        this.grid[row][y] = "X";
      } else if (this.grid[row][y] === "#") {
        this.grid[row + 1][y] = ">";
        obstacle = true;
      } else if (row === 0) {
        break;
      }
      row--;
    }
  }

  south(x, y) {
    let obstacle;
    let row = x + 1;
    while (!obstacle && row <= this.grid.length - 1) {
      if (this.grid[row][y] === ".") {
        this.grid[row][y] = "X";
      } else if (this.grid[row][y] === "#") {
        this.grid[row - 1][y] = "<";
        obstacle = true;
      } else if (row === this.grid.length - 1) {
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
      const { x, y, direction } = this.position;
      this.grid[x][y] = "X";
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
  printGrid() {
    this.grid.forEach((row) => console.log(row.join("")));
  }
}

//Part Two
export class GuardObstacle extends GuardPatrol {
  east(x, y) {
    let obstacle;
    let column = y + 1;
    while (!obstacle && column <= this.grid[x].length - 1) {
      if (this.grid[x][column] === ".") {
        this.grid[x][column] = "-";
      } else if (this.grid[x][column] === "|") {
        this.grid[x][column] = "+";
      } else if (this.grid[x][column] === "#") {
        this.grid[x][column - 1] = "v";
        obstacle = true;
      } else if (column === this.grid[x].length - 1) {
        this.grid[x][column] = "O";
        break;
      }
      column++;
    }
  }
  west(x, y) {
    let obstacle;
    let column = y - 1;
    while (!obstacle && column >= 0) {
      if (this.grid[x][column] === ".") {
        this.grid[x][column] = "-";
      } else if (this.grid[x][column] === "|") {
        this.grid[x][column] = "+";
      } else if (this.grid[x][column] === "#") {
        this.grid[x][column + 1] = "^";
        obstacle = true;
      } else if (column === 0) {
        this.grid[x][column] = "O";
        break;
      }
      column--;
    }
  }
  north(x, y) {
    let obstacle;
    let row = x - 1;
    while (!obstacle && row >= 0) {
      if (this.grid[row][y] === ".") {
        this.grid[row][y] = "|";
      } else if (this.grid[row][y] === "-") {
        this.grid[row][y] = "+";
      } else if (this.grid[row][y] === "#") {
        this.grid[row + 1][y] = ">";
        obstacle = true;
      } else if (row === 0) {
        break;
      }
      row--;
    }
  }

  south(x, y) {
    let obstacle;
    let row = x + 1;
    while (!obstacle && row <= this.grid.length - 1) {
      if (this.grid[row][y] === ".") {
        this.grid[row][y] = "|";
      } else if (this.grid[row][y] === "-") {
        this.grid[row][y] = "+";
      } else if (this.grid[row][y] === "#") {
        this.grid[row - 1][y] = "<";
        obstacle = true;
      } else if (row === this.grid.length - 1) {
        break;
      }
      row++;
    }
  }

  startPatrol() {
    this.setPosition();
    if (this.position) {
      const { x, y, direction } = this.position;
      this.grid[x][y] = "+";
      this.nextPosition(this.position);
      this.startPatrol();
    }
  }

  setInitialPosition() {
    if (this.initialPosition) {
      const { x, y, direction } = this.initialPosition;
      this.grid[x][y] = "^";
    }
  }
}
