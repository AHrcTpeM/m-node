"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = 3000;
var Button;
(function (Button) {
    Button["plus"] = "plus";
    Button["minus"] = "minus";
})(Button || (Button = {}));
let counterPlus = 0;
let counterMinus = 0;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use(express_1.default.static(__dirname));
app.post('/', (req, res) => {
    if (req.body.button == Button.plus) {
        counterPlus++;
    }
    if (req.body.button == Button.minus) {
        counterMinus++;
    }
    let count;
    (function (count) {
        count[count["plus"] = counterPlus] = "plus";
        count[count["minus"] = counterMinus] = "minus";
    })(count || (count = {}));
    res.json({ count });
    // res.json({numberPlus: counterPlus,
    //           numberMinus: counterMinus})
});
app.listen(port, function () {
    console.log(`Server listens port: ${port}`);
});
