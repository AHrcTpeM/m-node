"use strict";
function mapObject(object, transformer) {
    const newObj = {};
    for (let key in object) {
        newObj[key] = transformer(object[key]);
    }
    return newObj;
}
const obj = {
    roma: 5,
    vasya: 2,
    kolya: 4,
};
const transformer = (x) => x > 2;
const obj1 = {
    roma: "complited",
    vasya: "complited",
    kolya: "process",
};
const transformer1 = (x) => x.includes("complited");
console.log(mapObject(obj, transformer)); // { roma: true, vasya: false, kolya: true }
console.log(mapObject(obj1, transformer1)); // { roma: true, vasya: true, kolya: false }
