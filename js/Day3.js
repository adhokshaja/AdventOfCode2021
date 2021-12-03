//read file from inputs/Day3.txt
var fs = require("fs");
var input = fs.readFileSync("inputs/Day3.txt", "utf8");

// var input = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

const inputArray = input.split("\n").map((a) => a.split(""));

let gamma = "",
  epsion = "";

for (let i = 0; i < inputArray[0].length; i++) {
  let zerosCount = 0;
  let onesCount = 0;
  for (var j = 0; j < inputArray.length; j++) {
    if (inputArray[j][i] == "0") {
      zerosCount++;
    } else {
      onesCount++;
    }
  }
  if (zerosCount > onesCount) {
    gamma += "0";
  } else {
    gamma += "1";
  }
  if (onesCount > zerosCount) {
    epsion += "0";
  } else {
    epsion += "1";
  }
}

const gammaNum = parseInt(`${gamma}`, 2);
const epsionNum = parseInt(`${epsion}`, 2);

const part1 = gammaNum * epsionNum;


var getRating = (a2DArray, bitToConsider = 0, isMostCommon = true) => {
  if (a2DArray.length == 1) {
    return parseInt(a2DArray[0].join(""), 2);
  }

  if (bitToConsider == a2DArray[0].length) {
    throw new Error("bitMask is too big");
  }
  var zerosCount = 0;
  var onesCount = 0;
  var bit;
  for (var i = 0; i < a2DArray.length; i++) {
    if (a2DArray[i][bitToConsider] == "0") {
      zerosCount++;
    } else {
      onesCount++;
    }
  }
  if (isMostCommon) {
    bit = zerosCount > onesCount ? "0" : "1";
  } else {
    bit = zerosCount > onesCount ? "1" : "0";
  }

  var filteredArray = a2DArray.filter((a) => a[bitToConsider] == bit);
  return getRating(filteredArray, bitToConsider + 1, isMostCommon);
};

var oxygen = getRating(inputArray, 0, true);
var co2 = getRating(inputArray, 0, false);
var part2 = oxygen * co2;
console.log(`Part 1: ${part1}; Part 2: ${part2}`);
