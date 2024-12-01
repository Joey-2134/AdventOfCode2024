const fs = require("fs")

fs.readFile("./input.txt", 'utf-8', (err, data) => {
    if (err) return;

    const map = new Map();
    const dataArr = data.split("\n");

    let right = [];
    let sum = 0;

    for (let i = 0; i < dataArr.length; i++) {
        map.set(dataArr[i].split("   ")[0], 0);
        right.push(dataArr[i].split("   ")[1]);
    }

    for (let i = 0; i < right.length; i++) {
        if (map.has(right[i])) {
            map.set(right[i], map.get(right[i]) + 1);
        }
    }

    map.forEach((key, value) => {
        sum += key * value;
    })

    console.log(sum);
})