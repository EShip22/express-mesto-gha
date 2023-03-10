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
    .catch(() => res.status(ERROR_OTHERS).send({ message: 'На сервере произошла ошибка' }));
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
        res.status(ERROR_OTHERS).send({ message: 'На сервере произошла ошибка' });
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
      res.status(ERROR_OTHERS).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const {
    name, about,
  } = req.body;
  const { _id } = req.user;

  users.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((resUser) => {
      if (resUser.length === 0) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(res.req.body);
      }
    })
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      } else {
        res.status(ERROR_OTHERS).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.headers;
  const { _id } = req.user;

  users.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((resUser) => {
      if (resUser.length === 0) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Пользователь не найден' });
      } else {
        res.status(200).send(res.req.body);
      }
    })
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      } else {
        res.status(ERROR_OTHERS).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.showError = (req, res) => {
  res.status(200).send({ message: 'не верный URL' });
};
