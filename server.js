const express = require('express');
const app = express();
const codes = require(`./client/source/mock/codes.json`);

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded\
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/api', (req, res) => {
  const command = req.body.comm;

  if (command === 'getcodes') {
    return res.send(codes);
  }

  return res.send('');
});

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));