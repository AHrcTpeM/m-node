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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
/* task 1 */
function goFetch() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield (0, node_fetch_1.default)("https://api.ipify.org?format=json");
        let json = yield response.json();
        console.log("My IP:", json.ip);
    });
}
goFetch();
/* task 2 */
function getIP() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield (0, node_fetch_1.default)("https://api.ipify.org?format=json");
        let json = yield response.json();
        return Promise.resolve(json.ip);
    });
}
getIP().then((ip) => console.log(ip));
/* task 3.1 */
function getName() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield (0, node_fetch_1.default)("https://random-data-api.com/api/name/random_name");
        let json = yield response.json();
        console.log("In getName:", json.name);
        return json.name;
    });
}
Promise.all([getName(), getName(), getName()]).then(console.log);
/* task 3.2 */
let arrayNames = [];
getName().then((name) => {
    arrayNames.push(name);
    return getName();
})
    .then((name) => {
    arrayNames.push(name);
    return getName();
})
    .then((name) => {
    arrayNames.push(name);
    return arrayNames;
})
    .then(arr => console.log(arr));
/* task 3.3 */
(0, node_fetch_1.default)('https://random-data-api.com/api/name/random_name')
    .then(response => response.json())
    .then(json1 => {
    (0, node_fetch_1.default)('https://random-data-api.com/api/name/random_name').then(response => response.json())
        .then(json2 => {
        (0, node_fetch_1.default)('https://random-data-api.com/api/name/random_name').then(response => response.json())
            .then(json3 => {
            console.log([json1.name, json2.name, json3.name]);
        });
    });
});
/* Task4.1 */
const urls = [];
for (let i = 0; i < 10; i++) {
    urls.push("https://random-data-api.com/api/name/random_name");
}
function nameGenerator() {
    return __asyncGenerator(this, arguments, function* nameGenerator_1() {
        for (const url of urls) {
            const response = yield __await((0, node_fetch_1.default)(url));
            const data = yield __await(response.json());
            yield yield __await(data.name);
        }
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    try {
        for (var _b = __asyncValues(nameGenerator()), _c; _c = yield _b.next(), !_c.done;) {
            const item = _c.value;
            console.log("4.1", item);
            if (isWomen(item)) {
                break;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) yield _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
}))();
function isWomen(item) {
    // todo ;)    
    return Math.random() > 0.5;
}
/* Task4.2 */
function getWomanName() {
    (0, node_fetch_1.default)('https://random-data-api.com/api/name/random_name')
        .then(response => response.json())
        .then(json => {
        console.log("4.2:", json.name);
        if (!isWomen(json.name)) {
            getWomanName();
        }
    });
}
getWomanName();
/* Task5 */
function foo1(callback, ip) {
    callback(ip);
    return ip;
}
function foo2() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield (0, node_fetch_1.default)("https://api.ipify.org?format=json");
        let json = yield response.json();
        return foo1(console.log, json.ip);
    });
}
foo2();
/* Task6 */
function foo3() {
    return __awaiter(this, void 0, void 0, function* () {
        let response = yield (0, node_fetch_1.default)("https://api.ipify.org?format=json");
        let json = yield response.json();
        return json.ip;
    });
}
function foo4(callback) {
    return __awaiter(this, void 0, void 0, function* () {
        let ip = yield foo3();
        callback(ip);
    });
}
foo4(console.log);
