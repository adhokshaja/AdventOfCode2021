var fs = require("fs");
var input = fs.readFileSync("inputs/day13.txt", "utf8").trim();

var testInput = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;

const parseInput = (input) => {
    let [dotGrid, foldInstructions] = input.split('\n\n');
    dotGrid = dotGrid.split("\n").map(stringCorodToObj);
    foldInstructions = foldInstructions
      .split("\n")
      .map((a) => a.split("fold along ")[1])
      .map((a) => {
        let [axis, coord] = a.split("=");
        return [axis, Number(coord)];
      });

    return {dotGrid, foldInstructions};
};


const stringCorodToObj = (stringCoords) => {
    const [x,y] = stringCoords.split(",").map((a) => Number(a));
    return {x,y};
};

const objCoordsToString = ({x,y}) =>  `${x},${y}`;


const gridToString = (grid) => {
  let maxX = Math.max(...grid.map((a) => a["x"]));
  let maxY = Math.max(...grid.map((a) => a["y"]));
  let gridString = "";
  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (grid.find((a) => a.x === x && a.y === y)) {
        gridString += "\u2588";
      } else {
        gridString += " ";
      }
    }
    gridString += "\n";
  }
  return gridString;
};

const performFold = (inputGrid, [primaryAxis, coord]) => {
    let newGrid = new Set(inputGrid.filter((a) => a[primaryAxis] < coord).map(objCoordsToString));
   //console.log(newGrid);
   let remainingGrid = inputGrid.filter((a) => a[primaryAxis] > coord);
   const otherAxis = primaryAxis === "x" ? "y" : "x";
  
   for(let point of remainingGrid){
       const offset = point[primaryAxis] - coord;
        const newPoint = {
            [primaryAxis]: coord- offset,
            [otherAxis]: point[otherAxis]
        };
        //console.log(point, newPoint);
        newGrid.add(objCoordsToString(newPoint));
   }
    return [...newGrid].map(stringCorodToObj);
}

const part1 = (input) => {
 const { dotGrid, foldInstructions} = parseInput(input);
  return performFold(dotGrid, foldInstructions[0]).length;
};


const part2 = (input) => {
  const { dotGrid, foldInstructions } = parseInput(input);
  let grid = dotGrid;

  for (let fold of foldInstructions) {
    grid = performFold(grid, fold);
  }
  return "\n\n" + gridToString(grid) + '\n';
};



console.log(`Part 1: ${part1(input)}`);
console.log(`Part 2: ${part2(input)}`);