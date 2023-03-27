const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { PORT = 3000 } = process.env;
const app = express();
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/not-found-err');

const users = require('./routes/users');
const cards = require('./routes/cards');
const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mydb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(requestLogger);

app.use('/users', users);
app.use('/cards', cards);
app.post('/signup', users);
app.post('/signin', users);

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('неверный URL');
});
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT, () => {
  console.log('Ссылка на сервер');
});
