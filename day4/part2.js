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

    const word = "MAS";
    let foundSum = 0;
    let xDir = [-1,-1, 1, 1];
    let yDir = [-1, 1,-1, 1];

    for (let [key, value] of gridMap) {
        if (value === word[1]) {
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
    return (gridMap.get(`${x + dirX},${y + dirY}`) === word[0] && gridMap.get(`${x - dirX},${y - dirY}`) === word[2]);
}

