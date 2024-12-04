const fs = require("fs")

let instructions = [];
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;

    let pattern = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
    let doPattern = /do\(\)/;
    let dontPattern = /don't\(\)/;

    instructions = [...inputData.match(pattern)];
    let numPairs = [];

    let doFlag = true;
    for (let i = 0; i < instructions.length; i++) {
        if (instructions[i].match(doPattern)) {
            doFlag = true;
        } else if (instructions[i].match(dontPattern)) {
            doFlag = false
        } else {
            if (doFlag) {
                let nums = instructions[i].match(/\d{1,3}/g);
                numPairs.push([nums[0], nums[1]]);
            }
        }
    }

    let sum = 0;
    for (let i = 0; i < numPairs.length; i++) {
        sum += numPairs[i][0] * numPairs[i][1];
    }

    console.log(sum);
});


