const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
//  const { createUser, login } = require('./controllers/users');
//  const auth = require('./middlewares/auth');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

app.use(express.static(path.join((__dirname, 'public'))));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.patch('*', (req, res) => {
  res.status(404).send({ message: 'не верный URL' });
});
app.use(errors());
app.use((err, req, res, next) => {
  console.log('22222');
  const { statusCode = 500, message } = err;
  console.log('Обработчик ошибки');
  res.status(err.statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
