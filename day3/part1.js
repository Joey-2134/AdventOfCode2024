const fs = require("fs")

let instructions = [];
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    let pattern = /mul\(\d{1,3},\d{1,3}\)/g;
    instructions = [...inputData.match(pattern)];

    let numPairs = instructions.map(instruction => {
        let nums = instruction.match(/\d{1,3}/g);
        return [parseInt(nums[0]), parseInt(nums[1])];
    })

    console.log(numPairs);

    let sum = 0;
    for (let i = 0; i < numPairs.length; i++) {
       sum += numPairs[i][0] * numPairs[i][1];
    }

    console.log(sum);
});


