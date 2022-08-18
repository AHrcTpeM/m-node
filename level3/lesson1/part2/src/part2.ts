import express from "express";
import path from "path";

const app = express();
app.use(express.json());

const port = 3000;

enum Button {
  plus = "plus",
  minus = "minus",
}

let counterPlus = 0;
let counterMinus = 0;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(__dirname));

app.post("/", (req, res) => {
  if (req.body.button == Button.plus) {
    counterPlus++;
  }
  if (req.body.button == Button.minus) {
    counterMinus++;
  }
  enum count {
    plus = counterPlus,
    minus = counterMinus,
  }
  res.json({ count });
  // res.json({numberPlus: counterPlus,
  //           numberMinus: counterMinus})
});

app.listen(port, function () {
  console.log(`Server listens port: ${port}`);
});
