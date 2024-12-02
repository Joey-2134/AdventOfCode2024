const fs = require("fs")

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    data = inputData.split("\n").map(line => line.split(" ").map(Number));
    console.log(data)

    let safeSum = 0;

    for (let i = 0; i < data.length; i++) { //for each report

        let isSafe = true;
        let isAscending;
        let errorCount = 0;
        let j = 0;

        if (data[i][j] === data[i][j+1]) { //if first 2 levels are equal, remove first level and increment error count to 1
            errorCount++;
            data[i].splice(data[i][j]);
        }

        if (data[i][j] === data[i][j+1]) continue; //first 3 are equal, then error used up already so continue to next report
        //for example 1,1,1,2,3, index 0 gets removed above and error count incremented, then new index 0 and 1 are equal so this row is unsafe move to next

        isAscending = (data[i][j] < data[i][j+1]); //check are first 2 asc or desc

        while (j < data[i].length - 1 && isSafe) { //loop over report
            isSafe = isWithinSafeRange(data[i][j], data[i][j+1]) && isStillAscOrDesc(data[i][j], data[i][j+1], isAscending); //if adjacent are within safe range AND are still following same

            if (errorCount === 0 && isSafe === false) { //if no err found already and current level adjacency being checked returns false, then reset the safe flag back to safe and increment error count
                isSafe = true;
                errorCount++;
                data[i].splice(data[i][j], 1); //remove current value and restart report check as if its a new report except with error count = 1
                j = -1
            }
            j++;
        }
        if (isSafe) safeSum++; //if at end of row and flag is still safe, increment sum
    }

    console.log(safeSum)

})

function isWithinSafeRange(a,b) {
    if (a === b ) return false;

    return (a - b >= -3 && a - b <= 3)
}

function isStillAscOrDesc(a, b, isAscending) {
    if (isAscending) {
        return b > a;
    } else {
        return a > b;
    }
}
