var fs = require("fs");
var input = fs.readFileSync("inputs/day12.txt", "utf8").trim();

var testInput = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`;

var testInput2 = `dc-end
HN-start
start-kj
dc-start
dc-HN
LN-dc
HN-end
kj-sa
kj-HN
kj-dc`;

var testInput3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

//console.log(input);
function isBigCave(cave) {
  return cave === cave.toUpperCase();
}

const parseInput = (input) => {
  var caveArray = input.split("\n").map((x) => x.split("-"));
  var caveMap = {};
  var allCaves = new Set();
  caveArray.forEach((cave) => {
    allCaves.add(cave[0]);
    allCaves.add(cave[1]);
    if (!caveMap[cave[0]]) {
      caveMap[cave[0]] = [];
    }
    if (!caveMap[cave[1]]) {
      caveMap[cave[1]] = [];
    }
    caveMap[cave[0]].push(cave[1]);
    caveMap[cave[1]].push(cave[0]);
  });
  return { caveMap, allCaves };
};

const Traverse = (
  { caveMap },
  shouldConsideDups = false,
  start = "start",
  end = "end"
) => {
  const allPaths = [];

  const goToNextStep = function (start, path = []) {
    const paths = [...path, start];
    const visitedCaves = new Set(paths.filter((a) => !isBigCave(a)));

    let hasDuplicate = true;
    
    if (shouldConsideDups) {
      const counts = {};

      for (const a of paths)
        if (!isBigCave(a)) {
          counts[a] = (counts[a] || 0) + 1;
        }

      hasDuplicate = Object.values(counts).some((v) => v > 1);
    }

    if (start == end) {
      return { paths: paths, completed: true };
    }

    var nextSteps = caveMap[start];
    //console.log(nextSteps);

    for (let nextStep of nextSteps) {
      if (nextStep == "start") continue;
      if (visitedCaves.has(nextStep) && hasDuplicate) continue;
      const futurePaths = goToNextStep(nextStep, [...paths]);
      if (futurePaths.completed) {
        //console.log(futurePaths.paths)
        allPaths.push(futurePaths.paths);
      }
    }
    return { paths: paths, completed: false }; // no more steps
  };
  goToNextStep(start, []);
  return allPaths;
};


const part1 = (input) => {
  paths = Traverse(parseInput(input));
  return paths.length;
};

const part2 = (input) => {
  paths = Traverse(parseInput(input), true);
  return paths.length;
};

console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);
