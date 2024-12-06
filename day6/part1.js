const fs = require("fs");

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n").map(line => line.split(""));

    let guardPos;
    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            if (data[i][j] === "^") guardPos = [i, j];
        }
    }
    let guardDir = data[guardPos[0]][guardPos[1]];

    let numRows = data.length;
    let numCols = data[0].length;
    let numXs = 0;

    while (guardPos[0] > 0 && guardPos[0] < numRows - 1 && guardPos[1] > 0 && guardPos[1] < numCols - 1) {
        let currentPos = guardPos;
            switch (guardDir) {
                case "^":
                    if (data[guardPos[0] - 1][guardPos[1]] === "#") {
                        guardDir = ">"; // Turn right
                    } else {
                        guardPos[0]--; // Move up
                    }
                    break;
                case "v":
                    if (data[guardPos[0] + 1][guardPos[1]] === "#") {
                        guardDir = "<"; // Turn left
                    } else {
                        guardPos[0]++; // Move down
                    }
                    break;
                case "<":
                    if (data[guardPos[0]][guardPos[1] - 1] === "#") {
                        guardDir = "^"; // Turn up
                    } else {
                        guardPos[1]--; // Move left
                    }
                    break;
                case ">":
                    if (data[guardPos[0]][guardPos[1] + 1] === "#") {
                        guardDir = "v"; // Turn down
                    } else {
                        guardPos[1]++; // Move right
                    }
                    break;
            }
            if (data[currentPos[0]][currentPos[1]] !== "X") {
                data[currentPos[0]][currentPos[1]] = "X";
                numXs++;
            }
    }

    console.log(numXs);
});
