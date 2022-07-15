const express = require('express');
const fs = require("fs");
const app = express();
const port = 3000;

app.get('/hello', (req, res) => {
    fs.readFile("public/text.txt", "utf8", (err, data) => {
        if (err) {
            res.writeHead(500);
            res.end("Error");
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/txt'
            })
            fs.writeFile("public/text.txt", `${+data + 1}`, (err) => {});
            res.end(data);
        }        
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})