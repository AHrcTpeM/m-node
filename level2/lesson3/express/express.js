const express = require('express');
const app = express();

const port = 3000

const urlencodedParser = express.urlencoded({extended: false});

app.get('/', (req, res) => {
  let log = `Request time: ${new Date().toUTCString()}\nUser IP: ${req.socket.remoteAddress}:${req.socket.remotePort}`;
  console.log(log);

  res.status(200).type('text/plain')
  res.send('Sh++\nHey, our server is up, hooray! And you were able to connect to it')
})

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

app.listen(port, function () {
  console.log(`Server listens port: ${port}`)
})