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
