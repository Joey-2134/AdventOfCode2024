const fs = require("fs")

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n").map(line => line.split(" ").map(Number));
    //console.log(data)

    let safeSum = 0;
    for (let i = 0; i < data.length; i++) {
        if (checkSafe(data[i])) safeSum++;
    }

    console.log(safeSum);
});

function checkSafe(report) {
    let differences = [];
    for (let i = 1; i < report.length; i++) {
        differences.push(report[i] - report[i - 1]);
    }

    let prevDiff;
    for (let i = 0; i < differences.length; i++) {
        if (differences[i] === 0) return false;

        if ((Math.abs(differences[i]) > 3 )|| (prevDiff && differences[i] * prevDiff < 0)) return false;

        prevDiff = differences[i];
    }

    return true;
}
