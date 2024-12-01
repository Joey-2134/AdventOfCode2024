const fs = require("fs")

fs.readFile("./input.txt", 'utf-8', (err, data) => {
    if (err) return;

    const dataArr = data.split("\n");
    let left = [];
    let right = [];

    for (let i = 0; i < dataArr.length; i++) {
        left.push(dataArr[i].split("   ")[0]);
        right.push(dataArr[i].split("   ")[1]);
    }

    left = left.sort();
    right = right.sort();

    let sum = 0;
    for (let i = 0; i < left.length; i++) {
        sum += Math.abs(parseInt(left[i]) - parseInt(right[i]));
    }

    console.log(sum);
})