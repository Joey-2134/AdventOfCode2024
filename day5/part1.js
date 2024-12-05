const fs = require("fs");

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    let [rules, updates] = inputData.split("\n\n");
    updates = updates.split("\n").map(update => update.split(",").map(Number));

    let validUpdateMidVal = [];
    const rulesMap = new Map();
    rules.split("\n").forEach(rule => {
        const [key, value] = rule.split("|").map(Number);
        if (!rulesMap.has(key)) {
            rulesMap.set(key, []);
        }
        rulesMap.get(key).push(value);
    });

    for (let i = 0; i < updates.length; i++) {
        if (isValidUpdate(updates[i], rulesMap)) {
            let update = updates[i];
            let midVal = update[Math.floor((update.length - 1) / 2)];
            validUpdateMidVal.push(midVal);
        }
    }

    let sum = 0;
    validUpdateMidVal.forEach(midVal => {
        sum += midVal;
    });
    console.log(sum);

});

function isValidUpdate(update, rules) {
    const updatePageIndexesMap = new Map();
    for (let i = 0; i < update.length; i++) { //for each letter in the update
        updatePageIndexesMap.set(update[i], i); //map the letter to its index in the update
    }

    for (const [ruleKey, ruleVals] of rules.entries()) {
        if (!updatePageIndexesMap.has(ruleKey)) continue;
        const ruleKeysIdxInUpdate = updatePageIndexesMap.get(ruleKey);

        for (const val of ruleVals) {
            if (!updatePageIndexesMap.has(val)) continue;
            const valIndex = updatePageIndexesMap.get(val);
            if (valIndex < ruleKeysIdxInUpdate) return false
        }
    }
    return true;
}