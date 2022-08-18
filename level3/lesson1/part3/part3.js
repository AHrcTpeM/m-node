"use strict";
function summ(a) {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (typeof elem === "undefined")
            return 2022; // undefined vs 'undefined'
        if (typeof elem.cvalue === "undefined")
            return 2022;
        if (typeof elem.cvalue === "string")
            return Number(elem.cvalue) || 2022;
        if (typeof elem.cvalue === "object")
            return summ(elem.cvalue);
        return elem.cvalue;
    });
    let sum = 0;
    for (let i = 0; i < x.length; i++) {
        sum += x[i];
    }
    return sum;
}
const a = {
    hello: { cvalue: 1 },
    world: { cvalue: { yay: { cvalue: "2" } } },
};
const b = {
    hello: { cvalue: 1 },
    world: { cvalue: { yay: { cvalue: "2" } } },
    c: { cvalue: -12 },
    d: { cvalue: undefined },
    e: { cvalue: { yay: { cvalue: "ed" } } },
};
const c = {
    hello: { cvalue: "5as" },
    world: { cvalue: { yay: { cvalue: "as2" } } },
};
const d = {};
console.log(summ(a), "= 3");
console.log(summ(b), "= 4035");
console.log(summ(c), "= 4044");
console.log(summ(d), "= 0");
