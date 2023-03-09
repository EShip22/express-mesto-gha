const users = require('../models/user');

const ERROR_VALIDATION = 400;
const ERROR_NO_DATA_FOUND = 404;
const ERROR_OTHERS = 500;

module.exports.getUsers = (req, res) => {
  users.find({})
    .then((resUsers) => {
      if (resUsers.length === 0) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Пользователи не найдены' });
      } else {
        res.status(200).send({ data: resUsers });
      }
    })
    .catch(() => res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar,
  } = req.body;
  users.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      } else {
        res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  if (userId) {
    if (userId.length % 12 !== 0) {
      res.status(ERROR_VALIDATION).send({ message: 'Некорректный id пользователя' });
    }
  }
  users.findById(userId)
    .then((resUser) => {
      if (!resUser) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(resUser);
      }
    })
    .catch(() => {
      res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const {
    name, about,
  } = req.body;

  const { _id } = req.user;

  users.findByIdAndUpdate(_id, { name, about })
    .then((resUser) => {
      console.log(resUser);
      if (resUser.length === 0) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(res.req.body);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidatorError') {
        res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      } else {
        res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.headers;
  const { _id } = req.user;

  users.findByIdAndUpdate(_id, { avatar })
    .then((resUser) => {
      if (resUser.length === 0) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(resUser);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      } else {
        res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
      }
    });
};
