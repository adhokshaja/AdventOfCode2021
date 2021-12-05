var fs = require("fs");
var input = fs.readFileSync("inputs/day5.txt", "utf8");

// input = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`;

const inputLines = input.split("\n");

function countDangerousAreas(
  ventLines,
  includeDiags = false,
  minCrossings = 2
) {
  const crossingPoints = {};

  const markCrossing = (x, y) => {
    var p = `${x},${y}`;
    if (crossingPoints[p]) {
      crossingPoints[p]++;
    } else {
      crossingPoints[p] = 1;
    }
  };

  const parseAndComputeVentLine = (lineStr) => {
    if (lineStr.length === 0) return;

    const [point1, point2] = lineStr.split(" -> ");
    const [x1, y1] = point1.split(",").map(Number);
    const [x2, y2] = point2.split(",").map(Number);

    if (x1 === x2) {
      // vertical line
      for (let y = Math.min(y1, y2); y <= Math.max(y2, y1); y++) {
        markCrossing(x1, y);
      }
    }

    if (y1 === y2) {
      // vertical Line
      for (let x = Math.min(x1, x2); x <= Math.max(x2, x1); x++) {
        markCrossing(x, y1);
      }
    }

    if (includeDiags && Math.abs(x1 - x2) === Math.abs(y1 - y2)) {
      // diagnoal
      var x = x1;
      var y = y1;

      while (x !== x2 || y !== y2) {
        markCrossing(x, y);
        x += x2 > x1 ? 1 : -1;
        y += y2 > y1 ? 1 : -1;
      }
      markCrossing(x, y); // Mark ending point
    }

  };

  ventLines.forEach((line) => {
    parseAndComputeVentLine(line);
  });

  var crossingCount = 0;

  //console.log(points);

  for (let p in crossingPoints) {
    crossings = crossingPoints[p];
    if (crossings >= minCrossings) {
      crossingCount++;
    }
  }
  return crossingCount;

}

console.log(`Part 1 : ${countDangerousAreas(inputLines)}`);
console.log(`Part 2 : ${countDangerousAreas(inputLines, true)}`);
