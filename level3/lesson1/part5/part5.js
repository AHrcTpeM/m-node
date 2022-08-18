"use strict";
function func(data, addProp) {
    // extends Partial<T>
    console.log(data);
    //
}
let x1 = { prop1: "ann", prop2: 45 };
let x2 = { prop1: "sem", prop2: 30 };
func({ prop1: "max", prop2: 22 }, (x1) => x2);
function func2(data, addProp) { }
class Rectangle {
}
class Circle {
}
function makeNewClass(SOMECLASS, count) {
    // Using Class Types in Generics
    let a = [];
    for (let i = 0; i < count; i++)
        a.push(new SOMECLASS());
    return a;
}
let a = makeNewClass(Rectangle, 10);
let b = makeNewClass(Circle, 20);
