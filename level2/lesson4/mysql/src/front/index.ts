import express from 'express';
const app = express();

const port = 8080;

app.get('/', (req, res) => {

  res.sendFile(__dirname + "/index.html")
})

app.use((req, res, next) => {
  res.status(404).type('text/plain')
  res.send('Not found')
})

app.listen(port, function () {
  console.log(`Server listens port: ${port}`)
})