const express = require('express');
const app = express();

const port = 3000;

app.get('/', (req, res) => {
  let log = `Request time: ${new Date().toUTCString()}\nUser IP: ${req.socket.remoteAddress}:${req.socket.remotePort}`;
  console.log(log);

  res.status(200).type('text/plain')
  res.send(`
  Sh++
  Hi traveler, I'm a server, nice to meet you.
  I was deployed on a remote AWS-server in Frankfurt using pm2. Cool, right?\n
  Pss, our server is up, hooray! And you were able to connect to it.\n`)
})

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

app.listen(port, function () {
  console.log(`Server listens port: ${port}`)
})