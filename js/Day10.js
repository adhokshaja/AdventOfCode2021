var fs = require("fs");
var input = fs.readFileSync("inputs/day10.txt", "utf8").trim();

var testInput = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;

//console.log(inputArray);

const score = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

const pairs = {
  "{": "}",
  "[": "]",
  "(": ")",
  "<": ">",
};

var parseinput = function (input) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.trim().split(""));
};

var solve = (input) => {
  const lines = parseinput(input);
  var scores = [];
  var scores_2 = [];
  for (let line of lines) {
    var stack = [];
    for (let token of line) {
      if ( token in pairs)  {
        stack.push(token);
      } else {
        var last = stack.pop();
        if (pairs[last] !== token) {
          scores.push(score[token]);
        }
      }
    }

    var missingScore = 0;
    while (stack.length > 0) {
      var last = stack.pop();
      missingScore = missingScore * 5 + score[last];
    }
    scores_2.push(missingScore);
  }
  return {
    p1: scores.reduce((a, b) => a + b, 0),
    p2: scores_2.sort((a, b) => a - b)[Math.floor((scores_2.length) / 2)],
  };
};

console.log(solve(input));
