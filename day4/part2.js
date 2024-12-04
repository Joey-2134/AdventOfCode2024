const fs = require("fs");

let data;

fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n");
    for (let i = 0; i < data.length; i++) {
        data[i] = data[i].split("");
    }

    let foundSum = 0;
    const rows = data.length;
    const cols = data[0].length;

    for (let i = 1; i < rows; i++) {
        for (let j = 1; j < cols; j++) {
            if (data[i][j] === "A") {

                if (validCoord(i - 1, j - 1, rows, cols) &&
                    validCoord(i - 1, j + 1, rows, cols) &&
                    validCoord(i + 1, j - 1, rows, cols) &&
                    validCoord(i + 1, j + 1, rows, cols) &&
                    data[i - 1][j - 1] === "M" &&
                    data[i - 1][j + 1] === "S" &&
                    data[i + 1][j - 1] === "M" &&
                    data[i + 1][j + 1] === "S") {
                    foundSum += 1;
                }

                if (validCoord(i - 1, j - 1, rows, cols) &&
                    validCoord(i - 1, j + 1, rows, cols) &&
                    validCoord(i + 1, j - 1, rows, cols) &&
                    validCoord(i + 1, j + 1, rows, cols) &&
                    data[i - 1][j - 1] === "M" &&
                    data[i - 1][j + 1] === "M" &&
                    data[i + 1][j - 1] === "S" &&
                    data[i + 1][j + 1] === "S") {
                    foundSum += 1;
                }

                if (validCoord(i - 1, j - 1, rows, cols) &&
                    validCoord(i - 1, j + 1, rows, cols) &&
                    validCoord(i + 1, j - 1, rows, cols) &&
                    validCoord(i + 1, j + 1, rows, cols) &&
                    data[i - 1][j - 1] === "S" &&
                    data[i - 1][j + 1] === "M" &&
                    data[i + 1][j - 1] === "S" &&
                    data[i + 1][j + 1] === "M") {
                    foundSum += 1;
                }

                if (validCoord(i - 1, j - 1, rows, cols) &&
                    validCoord(i - 1, j + 1, rows, cols) &&
                    validCoord(i + 1, j - 1, rows, cols) &&
                    validCoord(i + 1, j + 1, rows, cols) &&
                    data[i - 1][j - 1] === "S" &&
                    data[i - 1][j + 1] === "S" &&
                    data[i + 1][j - 1] === "M" &&
                    data[i + 1][j + 1] === "M") {
                    foundSum += 1;
                }
            }
        }
    }
    console.log(foundSum);
});

function validCoord(x, y, rows, cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}
