const fs = require("fs");

let data;
let foundSum = 0;

fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n");
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split("");
    }

    const word = "XMAS";

    searchWord(data, word);
    console.log(foundSum);

});

function validCoord(x, y, m, n) {
    return (x >= 0 && x < m && y >= 0 && y < n);
}

function findWord(index, word, grid, x, y, dirX, dirY) {
    if (index === word.length) return true;
    if (validCoord(x, y, grid.length, grid[0].length)  &&  word[index] === grid[x][y]) {
        return findWord(index + 1, word, grid, x + dirX, y + dirY, dirX, dirY);
    }

    return false;
}

function searchWord(grid, word) {
    let m = grid.length;
    let n = grid[0].length;

    let ans = [];
    let x = [-1, -1, -1, 0, 0, 1, 1, 1];
    let y = [-1, 0, 1, -1, 1, -1, 0, 1];

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            for (let k = 0; k < 8; k++) {
                if (findWord(0, word, grid, i, j, x[k], y[k])) {
                    foundSum++;
                }
            }

        }
    }
    return ans;
}