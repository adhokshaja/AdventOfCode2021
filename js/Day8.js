var fs = require("fs");
var input = fs.readFileSync("inputs/day8.txt", "utf8");

// var input = `be cfbegad cbdgef fgaecd cgeb fdcge agebfd fecdb fabcd edb |fdgacbe cefdb cefbgd gcbe
// edbfga begcd cbg gc gcadebf fbgde acbgfd abcde gfcbed gfec |fcgedb cgb dgebacf gc
// fgaebd cg bdaec gdafb agbcfd gdcbef bgcad gfac gcb cdgabef |cg cg fdcagb cbg
// fbegcd cbd adcefb dageb afcb bc aefdc ecdab fgdeca fcdbega |efabcd cedba gadfec cb
// aecbfdg fbg gf bafeg dbefa fcge gcbea fcaegb dgceab fcbdga |gecf egdcabf bgf bfgea
// fgeab ca afcebg bdacfeg cfaedg gcfdb baec bfadeg bafgc acf |gebdcfa ecba ca fadegcb
// dbcfg fgd bdegcaf fgec aegbdf ecdfab fbedc dacgb gdcebf gf |cefg dcbef fcge gbcadfe
// bdfegc cbegaf gecbf dfcage bdacg ed bedf ced adcbefg gebcd |ed bcgafe cdgba cbgef
// egadfb cdbfeg cegd fecab cgb gbdefca cg fgcdab egfdb bfceg |gbdfcae bgc cg cgb
// gcafb gcf dcaebfg ecagb gf abcdeg gaef cafbge fdbac fegbdc |fgae cfgab fg bagce`; // test input

const inputArray = input.split("\n").map((inputLine) => {
  if (inputLine.trim().length === 0) return;
  const [uniqueSignalPattern, digitOutput] = inputLine.split("|").map((a) =>
    a
      .trim()
      .split(" ")
      .map((a) => a.trim())
  );
  return { uniqueSignalPattern, digitOutput };
});

const easyDigits = (inputArray) => {
  const digitOutput = inputArray.map((a) => a.digitOutput).flat();
  return digitOutput.filter(
    (a) => a.length === 7 || a.length === 3 || a.length === 4 || a.length === 2
  );
};

var Part1 = easyDigits(inputArray).length;

/***
 * Perfroms the SET operation A - B
 */
Set.difference = function (A, B) {
  if (!A instanceof Set || !B instanceof Set) {
    throw "The given objects are not of type Set";
  }
  const result = new Set();
  A.forEach((elem) => result.add(elem));
  B.forEach((elem) => result.delete(elem));
  return result;
};

/***
 * Checks equality of 2 sets
 */

Set.equal = function (s1, s2) {
  const s1_s2 = Set.difference(s1, s2).size;
  const s2_s1 = Set.difference(s2, s1).size;
  return s1_s2 == 0 && s2_s1 == 0;
};


const filterByLength = (signalArray, length) => {
  //console.log(signalArray);
  const digitOutput = signalArray.filter((a) => a.length === length);
  return digitOutput.map((a) => new Set(a));
};

const getMappingDigits = (uniqueSignalPattern) => {
  const digitMap = {};
  const translationMap = {};
  // console.log(uniqueSignalPattern);
  digitMap[1] = filterByLength(uniqueSignalPattern, 2)[0]; // unique match
  digitMap[4] = filterByLength(uniqueSignalPattern, 4)[0];
  digitMap[7] = filterByLength(uniqueSignalPattern, 3)[0];
  digitMap[8] = filterByLength(uniqueSignalPattern, 7)[0];

  digitMap["0,6,9"] = filterByLength(uniqueSignalPattern, 6);
  digitMap["2,3,5"] = filterByLength(uniqueSignalPattern, 5);

  // to distinguish 6 from the rest find segment "c"
  // to distingush 5 from the rest find segment "c"
  // 0 & 9 differ by segment "e"
  // 2 & 3 differ by segment "f"

  // 1 cannot be represented by segments only in 6
  digitMap["6"] = digitMap["0,6,9"].filter(
    (mat6) => Set.difference(digitMap[1], mat6).size > 0
  )[0];

  // c is in 8 but not in 6
  translationMap["c"] = [...digitMap[8]].filter(
    (a) => !digitMap["6"].has(a)
  )[0];

  //  5 doesn't have c
  digitMap["5"] = digitMap["2,3,5"].filter(
    (x) => !x.has(translationMap["c"])
  )[0];

  // 1 has both f and c
  translationMap["f"] = [...digitMap[1]].filter(
    (x) => x != translationMap["c"]
  )[0];

  // 2 doesn't have f
  digitMap["2"] = digitMap["2,3,5"]
    .filter((x) => digitMap[5] != x) // remove 5
    .filter((x) => !x.has(translationMap["f"]))[0];

  digitMap["3"] = digitMap["2,3,5"]
    .filter((x) => digitMap[5] != x)
    .filter((x) => digitMap[2] != x)[0];

  // 3 cannot be represented by just the segments in 0 (missing segment is e)
  digitMap["0"] = digitMap["0,6,9"]
    .filter((x) => digitMap[6] != x) // remove 6
    .filter((m96) => Set.difference(digitMap[3], m96).size > 0)[0];

  digitMap["9"] = digitMap["0,6,9"]
    .filter((x) => digitMap[6] != x)
    .filter((x) => digitMap["0"] != x)[0];

  delete digitMap["2,3,5"];
  delete digitMap["0,6,9"];

  return digitMap;
};

var matchDigit = (segment, mappings) => {
  for (let d in mappings) {
    if (Set.equal(segment, mappings[d])) {
      return d;
    }
  }
  throw "Invalid Segment";
};

var getNumber = ({ uniqueSignalPattern, digitOutput }) => {
  // use uniqueSignalPattern to get mappings
  // Use mappings to translate to digits
  var mappings = getMappingDigits(uniqueSignalPattern);
  var digits = digitOutput
    .map((a) => new Set(a))
    .map((a) => matchDigit(a, mappings));
  var numberDisplayed = Number(digits.join(""));
  return numberDisplayed;
};

var Part2 = inputArray.map(getNumber).reduce((a, b) => a + b, 0);

console.log(`Part 1: ${Part1} \n Part 2: ${Part2}`);
