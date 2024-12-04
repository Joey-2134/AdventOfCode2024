const fs = require("fs");

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n");
    const gridMap = new Map();
    data.forEach((row, y) => {
        [...row].forEach((letter, x) => {
            gridMap.set(`${x},${y}`, letter);
        });
    })

    const word = "X";

    let foundSum = 0;
    let xDir = [-1,-1, 1, 1];
    let yDir = [-1, 1,-1, 1];

    for (let [key, value] of gridMap) {
        if (value === word[Math.floor(word.length / 2)]) {
            let [x, y] = key.split(",").map(Number);
            let foundCount = 0;
            for (let d = 0; d < 4; d++) {
                if (checkDirection(x, y, xDir[d], yDir[d], word, gridMap)) {
                    foundCount++;
                }
            }
            if (foundCount >= 2) {
                foundSum ++;
            }
        }
    }

    console.log(foundSum);
});

function checkDirection(x, y, dirX, dirY, word, gridMap) {

    let isFound = true;
    let i = 1;
    while (i <= Math.floor(word.length / 2) && isFound) {
        let leftChar = gridMap.get(`${x + i * dirX},${y + i * dirY}`);
        let rightChar = gridMap.get(`${x - i * dirX},${y - i * dirY}`);

        if (leftChar === word[Math.floor(word.length / 2) - i] && rightChar === word[Math.floor(word.length / 2) + i]) {
            i++;
        } else {
            isFound = false;
        }
    }
    return isFound;
}

