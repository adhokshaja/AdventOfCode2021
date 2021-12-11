var fs = require("fs");
var input = fs.readFileSync("inputs/day11.txt", "utf8").trim();

var testInput = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

//console.log(input);

const parseInput = (input) => {
  var grid = input.split("\n").map((x) => x.split("").map(Number));
  return grid;
};

//console.log(parseInput(testInput));

const performSingleStep = (aGrid) => {
  var newGrid = aGrid.map((x) => x.map((y) => y));
  var alreadyFlashed = newGrid.map((x) => x.map((y) => false));
  var flashCount = 0;

  const flash = (x, y) => {
    flashCount++;
    alreadyFlashed[x][y] = true;
    // orthogonal neighbors
    if (x > 0) {
      increment(x - 1, y);
    }
    if (x < newGrid.length - 1) {
      increment(x + 1, y);
    }
    if (y > 0) {
      increment(x, y - 1);
    }
    if (y < newGrid[x].length - 1) {
      increment(x, y + 1);
    }
    // diagonal neighbors
    if (x > 0 && y > 0) {
      increment(x - 1, y - 1);
    }
    if (x > 0 && y < newGrid[x].length - 1) {
      increment(x - 1, y + 1);
    }
    if (x < newGrid.length - 1 && y > 0) {
      increment(x + 1, y - 1);
    }
    if (x < newGrid.length - 1 && y < newGrid[x].length - 1) {
      increment(x + 1, y + 1);
    }
  };

  const increment = (x, y) => {
    // x is row, y is column
    newGrid[x][y] = newGrid[x][y] + 1;

    if (newGrid[x][y] > 9 && !alreadyFlashed[x][y]) {
      flash(x, y);
    }
  };

  // increment every cell
  for (var i = 0; i < newGrid.length; i++) {
    for (var j = 0; j < newGrid[i].length; j++) {
      increment(i, j);
    }
  }

  // reset flashedCells to 0
    for (var i = 0; i < newGrid.length; i++) {
        for (var j = 0; j < newGrid[i].length; j++) {
            if (alreadyFlashed[i][j]) {
                newGrid[i][j] = 0;
            }
        }
    }


  return { newGrid, flashCount };
};

const part1 = (input, maxIterations = 100) => {
  let grid = parseInput(input);
  let totalNumberOfFlashes = 0;
  for (let i = 0; i < maxIterations; i++) {
    var { newGrid, flashCount } = performSingleStep(grid);
    grid = newGrid;
    totalNumberOfFlashes += flashCount;
  }
  return totalNumberOfFlashes;
};

const part2 = (input) => {
  let grid = parseInput(input);
  let numFlashesInStep = 0;
  let counter = 0;
  while (numFlashesInStep < 100) {
    var { newGrid, flashCount } = performSingleStep(grid);
    grid = newGrid;
    numFlashesInStep = flashCount;
    counter++;
  }
  return counter;
};

console.log(`Part 1: ${part1(input)} Part 2: ${part2(input)}`);
