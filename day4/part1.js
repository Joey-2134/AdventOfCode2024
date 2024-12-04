const fs = require("fs");

let data;
let foundSum = 0;

fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n");
    const gridMap = new Map();
    data.forEach((row, y) => {
        [...row].forEach((letter, x) => {
            gridMap.set(`${x},${y}`, letter);
        });
    })

    const word = "testing";
    let foundSum = 0;

    let xDir = [-1, -1, -1, 0, 0, 1, 1, 1];
    let yDir = [-1, 0, 1, -1, 1, -1, 0, 1];

    for (let [key, value] of gridMap) {
        if (value === word[0]) {
            let [x, y] = key.split(",").map(Number);
            for (let d = 0; d < 8; d++) {
                if (checkDirection(x, y, xDir[d], yDir[d], word, gridMap)) foundSum++;
            }
        }
    }

    console.log(foundSum);
});

function checkDirection(x, y, dirX, dirY, word, gridMap) {
    for (let i = 1; i < word.length; i++) {
        let newX = x + dirX * i;
        let newY = y + dirY * i;
        if (gridMap.get(`${newX},${newY}`) !== word[i]) return false;
    }
    return true;
}
