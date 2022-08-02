import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const port: number = 3005;

app.use(express.json());

let makerId = 100;

type Items = {
  id: number;
  text: string;
  checked: boolean;
}
const db: { items: Items[] } = {
  items: [
    { id: 22, text: "Buy milk", checked: false },
    { id: 23, text: "Buy bread", checked: false },
    { id: 24, text: "Do the cleaning", checked: true },
    { id: 25, text: "Do homework", checked: false },
    { id: 26, text: "Read smart book", checked: true },
  ]
}

app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/v1/items', (req, res) => {
  if (req.query.text && db.items.length > 0) {
    db.items = db.items.filter(i => i.text.toLowerCase().includes(req.query.text as string))
  }

//   res.status(400).send({
//     error: 'forbidden'
//  });

  res.json(db)
})

app.get('/api/v1/items/:id', (req, res) => {
  const foundItems = db.items.find(i => i.id === +req.params.id)

  if (!foundItems) {
    res.sendStatus(404);
    return;
  }
  
  res.json(foundItems);
})

app.post('/api/v1/items', (req, res) => {
  // fetch('http://localhost:3000/api/v1/items', {method: "POST", body: JSON.stringify({text: "Play game"}), headers: {'content-type': 'application/json'}})

  if (!req.body.text) {
    res.sendStatus(400);
    return;
  }

  const createdItem = {
    id: makerId++,
    text: req.body.text,
    checked: false
  }
  db.items.push(createdItem);
  res.status(201).json({id: createdItem.id})
})

app.delete('/api/v1/items/', (req, res) => {  
  if (!req.body.id) {
    res.sendStatus(400);
    return;
  }
  db.items = db.items.filter(i => i.id !== +req.body.id);
  
  res.status(200).json({ "ok" : true });
})

app.put('/api/v1/items/', (req, res) => {
  if (!req.body.id) {
    res.sendStatus(400);
    return;
  }
  const foundItems = db.items.find(i => i.id === +req.body.id);
  if (!foundItems) {
    res.sendStatus(404);
    return;
  }
  foundItems.text = req.body.text;
  foundItems.checked = req.body.checked;  
  res.status(200).json({ "ok" : true });
})

// app.delete('/api/v1/items/:id', (req, res) => {
//   //fetch('http://localhost:3000/api/v1/items/23', {method: "DELETE"})
//   db.items = db.items.filter(i => i.id !== +req.params.id);
  
//   res.status(200).json({ "ok" : true });
// })

// app.put('/api/v1/items/:id', (req, res) => {
//   fetch('http://localhost:3000/api/v1/items/22', {method: "PUT", body: JSON.stringify({text: "Play game"}), 
// headers: {'content-type': 'application/json'
// }})

//   if (!req.body.text) {
//     res.sendStatus(400);
//     return;
//   }  
  
//   const foundItems = db.items.find(i => i.id === +req.params.id);
//   if (!foundItems) {
//     res.sendStatus(404);
//     return;
//   }

//   foundItems.text = req.body.text;
  
//   res.status(200).json({ "ok" : true });
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})