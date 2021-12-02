//read file from inputs/Day2.txt
import { readFileSync } from "fs";
var input = readFileSync("inputs/Day2.txt", "utf8");

// var input = `forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2`;

const commands = input.split("\n").map(a => {
    const split = a.split(" ");
    return {
        dir : split[0],
        dist : parseInt(split[1])
    }
});

const part1 = (function () {
  let totalHorizontal = 0;
  let totalVertical = 0;

  commands.forEach((cmd) => {
    switch (cmd.dir) {
      case "forward":
        totalHorizontal += cmd.dist;
        break;
      case "up":
        totalVertical -= cmd.dist;
        break;
      case "down":
        totalVertical += cmd.dist;
        break;
    }
  });

 return (totalHorizontal * totalVertical);
})();

console.log(part1);

const part2 = (function () {
  let totalHorizontal = 0;
  let totalVertical = 0;
  let aim = 0;

  commands.forEach((cmd) => {
    switch (cmd.dir) {
      case "forward":
        totalHorizontal += cmd.dist;
        totalVertical += aim * cmd.dist;
        break;
      case "up":
        aim -= cmd.dist;
        break;
      case "down":
        aim += cmd.dist;
        break;
    }
  });

  return (totalHorizontal * totalVertical);
})();

console.log(part2);