var fs = require("fs");
var input = fs.readFileSync("inputs/day6.txt", "utf8");

//var input = `3,4,3,1,2`; // test input

const inputArray = input.split(",").map(Number);
//console.log(inputArray);

const countAfterDays = function (numberOfDays) {

  const countFishAgainstTimer = (inputArray) => {
    const timerCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (let x of inputArray) {
      timerCount[x]++;
    }
    return timerCount;
  };


  let counts = countFishAgainstTimer(inputArray);

  while (numberOfDays > 0) {
    numberOfDays--;
    const day_zero_counts = counts[0];
    for (var x = 1; x < counts.length; x++) {
        // left shift array
      counts[x - 1] = counts[x];
    }

    counts[6] += day_zero_counts; // reset to 6
    counts[8] = day_zero_counts; // spawn new ones at 8
  }

  return counts.reduce((a, b) => a + b, 0); // return sum of all counts
};

console.log(`Part1: ${countAfterDays(80)}\nPart2: ${countAfterDays(256)}`);
