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
                /*



                WHOEVER IS READING THIS I APOLOGISE




                 */

                /*
                M . S
                . A .
                M . S
                */
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

                /*
                M . M
                . A .
                S . S
                */
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

                /*
                S . M
                . A .
                S . M
                */
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

                /*
                S . S
                . A .
                M . M
                */
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

// Function to check if a coordinate is valid
function validCoord(x, y, rows, cols) {
    return x >= 0 && x < rows && y >= 0 && y < cols;
}
