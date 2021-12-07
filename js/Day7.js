var fs = require("fs");
var input = fs.readFileSync("inputs/day7.txt", "utf8");

// var input = `16,1,2,0,4,2,7,1,2,14`; // test input

const inputArray = input.split(",").map(Number);

function computeBestPositionAndFuel(positions, calculateFuel) {
  const arrayMin = positions.reduce((a, b) => Math.min(a, b));
  const arrayMax = positions.reduce((a, b) => Math.max(a, b));

  let minDiff = Number.MAX_SAFE_INTEGER,
    minDiffValue = 0;

  for (var i = arrayMin; i <= arrayMax; i++) {
    let diff = 0;
    for (var j = 0; j < positions.length; j++) {
      diff += calculateFuel(i, positions[j]);
    }
    if (diff < minDiff) {
      minDiff = diff;
      minDiffValue = i;
    }
  }

  var sum = positions.reduce(
    (acc, curr) => acc + calculateFuel(minDiffValue, curr),
    0
  );

  return { bestPosition: minDiffValue, fuelCost: sum };
}

constantFuelCalculator = (startPos, endPos) => {
  return Math.abs(startPos - endPos);
};

artihmeticSeriesFuelCalculator = (startPos, endPos) => {
  const absDiff = Math.abs(startPos - endPos);
  return (absDiff * (absDiff + 1)) / 2;
};

console.log(
  `Part 1: ${
    computeBestPositionAndFuel(inputArray, constantFuelCalculator).fuelCost
  }`
);
console.log(
  `Part 2: ${
    computeBestPositionAndFuel(inputArray, artihmeticSeriesFuelCalculator)
      .fuelCost
  }`
);
