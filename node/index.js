const express = require('express');
const app = express();
const port = 5500;

app.get('/', (req, res) => {
  res.send('Hellow world13');
});

app.listen(port, () => {
  console.log(`Server app listening on Port ${port}`);
});
