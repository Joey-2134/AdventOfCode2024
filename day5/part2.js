const fs = require("fs");

let data;
fs.readFile("./input.txt", 'utf-8', (err, inputData) => {
    if (err) return;
    let [rules, updates] = inputData.split("\n\n");
    const rulesMap = new Map();

    updates = updates.split("\n").map(update => update.split(",").map(Number));
    rules.split("\n").forEach(rule => {
        const [key, value] = rule.split("|").map(Number);
        if (!rulesMap.has(key)) {
            rulesMap.set(key, []);
        }
        rulesMap.get(key).push(value);
    });

    let invalidUpdates = [];
    for (let i = 0; i < updates.length; i++) {
        if(typeof isValidUpdate(updates[i], rulesMap) !== "boolean") invalidUpdates.push(updates[i]);
    }

    let validatedUpdates = [];
    for (let i = 0; i < invalidUpdates.length; i++) {
        validatedUpdates.push(validateUpdate(invalidUpdates[i], rulesMap));
    }

    let sum = 0;
    validatedUpdates.forEach(update => {
        sum += update[Math.floor((update.length - 1) / 2)];
    });

    console.log(sum);
});

function validateUpdate(update, rulesMap) {
    let resp = isValidUpdate(update, rulesMap);
    if (typeof resp === "boolean") return update;

    if (Array.isArray(resp)) {
        const [valIdx, keyIdx] = resp;
        let insertVal = update.splice(keyIdx, 1)[0];
        update.splice(valIdx, 0, insertVal);
        return validateUpdate(update, rulesMap);
    }
    return validateUpdate(update, rulesMap);
}

function isValidUpdate(update, rulesMap) {
    const updatePageIndexesMap = new Map();
    for (let i = 0; i < update.length; i++) {
        updatePageIndexesMap.set(update[i], i);
    }

    for (const [ruleKey, ruleVals] of rulesMap.entries()) {
        if (!updatePageIndexesMap.has(ruleKey)) continue;
        const ruleKeysIdxInUpdate = updatePageIndexesMap.get(ruleKey);

        for (const val of ruleVals) {
            if (!updatePageIndexesMap.has(val)) continue;
            const valIndex = updatePageIndexesMap.get(val);
            if (valIndex < ruleKeysIdxInUpdate) return [valIndex, ruleKeysIdxInUpdate];
        }
    }
    return true;
}