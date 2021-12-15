var fs = require("fs");
const { resourceLimits } = require("worker_threads");
var input = fs.readFileSync("inputs/day15.txt", "utf8").trim();
const heap = require('heap-js');


var testInput = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;


const parseInput = (input) =>{
    var result = input.trim().split('\n').map(a => a.trim().split('').map(Number));
    return result;
}



const findLowestPathCost = (grid) =>{

    // dp algo
    var costs = grid.map(a => a.map(x=> 0));
    // start from the bottom right
    for(let i = 0; i< grid.length; i++){
        for(let j =0; j <grid[i].length; j++){
            top = i === 0 ? Number.MAX_SAFE_INTEGER : costs[i - 1][j];
            left = j === 0 ? Number.MAX_SAFE_INTEGER : costs[i][j - 1];
            costs[i][j] = i === 0 && j === 0 ? 0 : grid[i][j] +  Math.min(left, top);
        }
    }
    return costs[grid.length-1][grid[grid.length-1].length-1];
}


const part1 = (input) =>{
    var grid = parseInput(input);
    return findLowestPathCost(grid);
}

console.log(part1(input));


const repeatGrid = (grid) =>{

    let map = Array.from({ length: grid.length * 5 }, () => Array.from({ length: grid[0].length * 5 }, () => 0));
    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map[0].length; x++) {
          map[y][x] =
            ((grid[y % grid.length][x % grid[0].length] + Math.floor(y / grid.length) + Math.floor(x / grid[0].length) - 1) % 9) +
            1;
        }
      }
     return map;
}

const part2 = (input) =>{
    var grid = parseInput(input);
    var map = repeatGrid(grid);
return (findLowestPathCost(map));


}

console.log(part2(input));


