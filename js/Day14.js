var fs = require("fs");
const { resourceLimits } = require("worker_threads");
var input = fs.readFileSync("inputs/day14.txt", "utf8").trim();


var testInput = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;


const parseInput = (input) => {
    var reactions = {};
    var [template, lineStr] = input.split("\n\n");
    var lines = lineStr.split("\n");
    lines.forEach(line => {
        var [orig, replace] = line.split(" -> ");
        reactions[`${orig}`] = replace;
    });
    return {template, reactions};
}

//console.log(parseInput(testInput));

const polymerize = (reactions, {pairCounts, letterCounts}) => {
    var newPairCounts = {};
    var newLetterCounts = {...letterCounts};

    for (let [pair,count] of Object.entries(pairCounts)) {
        const r = reactions[pair];
        const [a, b] = pair.split("");
        const a_r = `${a}${r}`;
        const r_b = `${r}${b}`;
        newPairCounts[a_r] = newPairCounts[a_r]+count || count;
        newPairCounts[r_b] = newPairCounts[r_b]+count || count;
        newLetterCounts[r] = newLetterCounts[r]+count || count;
    }
    return {pairCounts: newPairCounts, letterCounts: newLetterCounts};
}



const convertToCounts = (template) => {
    const pairCounts = {};
    const letterCounts = {};
    for(var i = 0; i<template.length-1; i++) {
        var key = `${template[i]}${template[i+1]}`;
        pairCounts[key] = pairCounts[key]+1 || 1;
        letterCounts[template[i]] = letterCounts[template[i]]+1 || 1;
    }
    letterCounts[template[i]] = letterCounts[template[i]] + 1 || 1;
    return {pairCounts, letterCounts};
}

const findMinMaxCounts = (letterCounts) => {
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;
    let length = 0;
    for(let letter in letterCounts) {
        min = Math.min(min, letterCounts[letter]);
        max = Math.max(max, letterCounts[letter]);
        length += letterCounts[letter];
    }
    return {min, max, length};
};

const solve = function(input, numSteps = 10){
    const {template, reactions} = parseInput(input);
    var result = convertToCounts(template);

    for(var i = 0; i<numSteps; i++) {
        result = polymerize(reactions, result);
        
    }
   // console.log(result);
    const {min, max} = findMinMaxCounts(result.letterCounts);
  
   return max-min;
}



//console.log(part1(input));

console.log(solve(input, 10));
console.log(solve(input, 40));

