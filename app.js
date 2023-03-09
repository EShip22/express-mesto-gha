const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

app.use(express.static(path.join((__dirname, 'public'))));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  req.user = {
    _id: '640844f1d818fb59f70cc6be',
  };

  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.get('*', (req, res) => {
  res.status(400).send({ message: 'не верный URL' });
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
