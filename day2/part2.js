const fs = require("fs")

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n").map(line => line.split(" ").map(Number));
    //console.log(data)

    let safeSum = 0;
    for (let i = 0; i < data.length; i++) {
        if (checkSafeWithRemoval(data[i])) safeSum++;
    }

    console.log(safeSum);
});

function checkSafe(report) {
    let differences = [];
    for (let i = 1; i < report.length; i++) {
        differences.push(report[i] - report[i - 1]);
    } //populate differences array

    let prevDiff;
    for (let i = 0; i < differences.length; i++) { //for each difference in report
        if ((prevDiff && differences[i] * prevDiff < 0) || !isDiffWithinValidRange(differences[i])) {
            return false;
        }
        prevDiff = differences[i];
    }
    return true;
}

function checkSafeWithRemoval(report) {
    if (checkSafe(report)) return true;

    for (let i = 0; i < report.length; i++) {
        if (checkSafe( report.slice(0, i).concat(report.slice(i + 1)))) return true;
    }

    return false;
}

function isDiffWithinValidRange(diff) {
    if (diff === 0) return false;
    else return Math.abs(diff) <= 3;
}
