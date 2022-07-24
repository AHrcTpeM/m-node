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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
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
