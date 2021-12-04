// read file inputs/day4.txt as an array
var fs = require("fs");
var input = fs.readFileSync("inputs/day4.txt", "utf8");

// input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

// 22 13 17 11  0
//  8  2 23  4 24
// 21  9 14 16  7
//  6 10  3 18  5
//  1 12 20 15 19

//  3 15  0  2 22
//  9 18 13 17  5
// 19  8  7 25 23
// 20 11 10 24  4
// 14 21 16 12  6

// 14 21 17 24  4
// 10 16 15  9 19
// 18  8 23 26 20
// 22 11 13  6  5
//  2  0 12  3  7`;

input = input.split("\n");
var numbersDrawn = input[0].split(",").map(Number);

var getBingoBoards = () => {
  var bingoBoards = [];

  var i = 2;
  while (i < input.length) {
    var bingoBoard = [];
    for (var j = 0; j < 5; j++) {
      bingoBoard.push(input[i].trim().split(/\s+/).map(Number));
      i++;
    }
    bingoBoards.push(bingoBoard);
    i++;
  }
  return bingoBoards;
};

var markBoard = (board, number) => {
  for (var row = 0; row < board.length; row++) {
    for (var col = 0; col < board[0].length; col++) {
      if (board[row][col] == number) {
        board[row][col] = "X";
      }
    }
  }
};

var checkBoard = (board) => {
  for (var row = 0; row < 5; row++) {
    var rowCount = 0;
    for (var col = 0; col < 5; col++) {
      if (board[row][col] == "X") {
        rowCount++;
      }
    }
    if (rowCount == 5) {
      return true;
    }
  }

  for (var col = 0; col < 5; col++) {
    var colCount = 0;
    for (var row = 0; row < 5; row++) {
      if (board[row][col] == "X") {
        colCount++;
      }
    }

    if (colCount == 5) {
      return true;
    }
  }
  return false;
};

var calculateScore = (board, numCalled) => {
  var unmarkedSum = 0;
  for (var row of board) {
    row.filter((x) => x != "X").forEach((x) => (unmarkedSum += x));
  }
  return unmarkedSum * numCalled;
};

var findWinningBoard = (bingoBoards, numbersDrawn, maxSetSize = 1) => {
  var boardsWon = new Set();
  for (var number of numbersDrawn) {
    for (var i in bingoBoards) {
      if (boardsWon.has(i)) {
        continue;
      }
      var bingoBoard = bingoBoards[i];
      markBoard(bingoBoard, number);

      if (checkBoard(bingoBoard)) {
        boardsWon.add(i);
      }

      if (boardsWon.size == maxSetSize) {
        //console.log(bingoBoard, number);
        return calculateScore(bingoBoard, number);
      }
    }
  }
};

var part1 = findWinningBoard(getBingoBoards(), numbersDrawn, 1);

var part2 = findWinningBoard(
  getBingoBoards(),
  numbersDrawn,
  getBingoBoards().length
);

console.log(`Part 1: ${part1}  ;  Part 2: ${part2}`);
