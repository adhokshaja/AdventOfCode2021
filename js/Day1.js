//read file from inputs/Day1.txt
var fs = require('fs');
var input = fs.readFileSync('inputs/Day1.txt', 'utf8');

// split the input into an array of numbers and parse them as ints
var inputArray = input.split('\n').map(Number);


