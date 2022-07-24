"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/* task 1 */
function getFirstWord(a) {
    return a.split(/ +/)[0].length;
}
/* task 2 */
function getUserNamings(a) {
    return {
        fullname: a.name + " " + a.surname,
        initials: a.name[0] + "." + a.surname[0]
    };
}
/* task 3 */
function getAllProductNames(a) {
    var _a;
    return ((_a = a === null || a === void 0 ? void 0 : a.products) === null || _a === void 0 ? void 0 : _a.map(prod => prod === null || prod === void 0 ? void 0 : prod.name)) || [];
}
/* task 4.1 */
function hey(a) {
    return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 });
hey({ name: () => "vasya", coolness: 100 });
/* task 4.2 */
function hey2(abstractPet) {
    return "hey! i'm " + abstractPet.name();
}
class Cat {
    constructor(_nickname, _isReal) {
        this.nickname = _nickname;
        this.isReal = _isReal;
    }
    name() {
        return this.nickname;
    }
}
class Dog {
    constructor(_nickname, _medals) {
        this.nickname = _nickname;
        this.medals = _medals;
    }
    name() {
        return this.nickname;
    }
}
let a = new Cat("myavchik", true);
let b = new Dog("gavchik", 333);
hey2(a);
hey2(b);
/* task 4.3 */
function hey3(a) {
    return "hey! i'm " + a.name()
        + (a.type === "cat" ? ("cuteness: " + a.cuteness) : ("coolness: " + a.coolness));
}
hey3({ name: () => "roma", type: "cat", cuteness: 100 });
hey3({ name: () => "vasya", type: "dog", coolness: 100 });
function stringEntries(a) {
    return Array.isArray(a) ? a : Object.keys(a);
}
/* task 6 */
function world(a) {
    return __awaiter(this, void 0, void 0, function* () {
        return "*".repeat(a);
    });
}
const hello = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield world(10);
});
hello().then(r => console.log(r)).catch(e => console.log("fail"));
