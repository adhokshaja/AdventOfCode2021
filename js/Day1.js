//read file from inputs/Day1.txt
var fs = require('fs');
var input = fs.readFileSync('inputs/Day1.txt', 'utf8');

// split the input into an array of numbers and parse them as ints
var inputArray = input.split('\n').map(Number);

//var inputArray = [199,200,208,210,200,207,240,269,260,263];

// Part 1
// for each element in the array, find if it is greater than the previous element
// if it is, add it to the total
var total = 0;
for (var i = 1; i < inputArray.length; i++) {
    if (inputArray[i] > inputArray[i-1]) {
        total += 1;
    }
}

var part1 = total;

// Part 2
total= 0;
for (var i = 1; i < inputArray.length; i++) {
    var thisWindow = inputArray.slice(i, i+3);
    var lastWindow = inputArray.slice(i-1, i+2);
    // if sum of this window is greater than last window, add to total
    if (thisWindow.reduce(function(a, b) { return a + b; }) > lastWindow.reduce(function(a, b) { return a + b; })) {
        total += 1;
    }


}

var part2 = total;

part1 //
part2 //