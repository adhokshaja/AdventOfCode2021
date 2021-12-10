var fs = require("fs");
var input = fs.readFileSync("inputs/day9.txt", "utf8").trim();

var testInput = `2199943210
3987894921
9856789892
8767896789
9899965678`; // test input

//console.log(inputArray);

function generateIsLowerThanAdjecent(a2DArray) {
  var rowMax = a2DArray.length;
  var colMax = a2DArray[0].length;
  const maxNumber = 10;
  return (i, j) => {
    const point = a2DArray[i][j];

    const top = i - 1 < 0 ? maxNumber : a2DArray[i - 1][j];
    const bottom = i + 1 >= rowMax ? maxNumber : a2DArray[i + 1][j];
    const left = j - 1 < 0 ? maxNumber : a2DArray[i][j - 1];
    const right = j + 1 >= colMax ? maxNumber : a2DArray[i][j + 1];

    if (point < top && point < bottom && point < left && point < right) {
      return true;
    }
    return false;
  };
}
const getGrid = (input) => {
    return  input
      .trim()
      .split("\n")
      .map((a) => a.trim().split("").map(Number));
}
const part1 = (input) => {
  const gridNumbers = getGrid(input);
  var result = 0;
  const isLowerThanAdjecent = generateIsLowerThanAdjecent(gridNumbers);

  result = 0;
  for (var i = 0; i < gridNumbers.length; i++) {
    for (var j = 0; j < gridNumbers[0].length; j++) {
      if (isLowerThanAdjecent(i, j)) {
        result += 1 + gridNumbers[i][j];
      }
    }
  }
  return result;
};

console.log(part1(input));

const part2 = (input) => {
  // DFS
  const findBasin = (input, y, x) => {
    if (y < 0) return 0;
    if (x < 0) return 0;
    if (y >= input[0].length) return 0;
    if (x >= input.length) return 0;
    if (input[x][y] === 9) return 0;

    input[x][y] = 9;
    return (
      1 +
      // Left
      findBasin(input, y - 1, x) +
      // Top
      findBasin(input, y, x - 1) +
      // Right
      findBasin(input, y + 1, x) +
      // Bottom
      findBasin(input, y, x + 1)
    );
  };
  const allBasins = input.reduce((all, row, i) => {
    const basins = row.reduce((all, _, j) => {
      const size = findBasin(input, j, i);
      return [...all, size];
    }, []);
    return [...all, ...basins];
  }, []);
  const sorted = allBasins.sort((a, b) => b - a);
  return sorted.slice(0, 3).reduce((a, b) => a * b, 1);
};

console.log(part2(getGrid(input)));