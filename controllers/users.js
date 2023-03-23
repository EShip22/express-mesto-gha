const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const users = require('../models/user');
//  ошибки
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');
const IncorrectEmailPasswordError = require('../errors/incorrect-email-password-err');
const AlreadyExistsEmailError = require('../errors/already-exists-email-err');

module.exports.getUsers = (req, res, next) => {
  users.find({})
    .then((resUsers) => {
      if (resUsers.length === 0) {
        throw new NotFoundError('Пользователи не найдены');
      } else {
        res.status(200).send({ data: resUsers });
      }
    })
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  const { userId } = req.params;
  users.findById(userId)
    .then((resUser) => {
      if (!resUser) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(resUser);
      }
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  user.findOne({ email })
    .then((finduser) => {
      if (finduser) {
        throw new AlreadyExistsEmailError('Пользователь с данным email уже зарегистрирован');
      }
    })
    .catch(next);

  bcrypt.hash(password, 10)
    .then((hash) => user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((newuser) => res.status(200).send({
      _id: newuser._id,
      name: newuser.name,
      about: newuser.about,
      avatar: newuser.avatar,
      email: newuser.email,
    }))
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        //  throw new ValidationError('Ошибка валидации');
        next(new ValidationError('Ошибка валидации'));
      }
      next(err);
    });
  //  .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const {
    name, about,
  } = req.body;
  const { _id } = req.user;

  users.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((resUser) => {
      if (!resUser) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(res.req.body);
      }
    })
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        next(new ValidationError('Ошибка валидации'));
      }
      next(err);
    });
  //  .catch(next);
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  users.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((resUser) => {
      if (!resUser) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(res.req.body);
      }
    })
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        next(new ValidationError('Ошибка валидации'));
      }
      next(err);
    });
  //  .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  user.findOne({ email }).select('+password')
    .then((finduser) => {
      if (!finduser) {
        throw new IncorrectEmailPasswordError('Пользователь не найден');
      }
      // пользователь найден
      if (bcrypt.compare(password, finduser.password)) {
        const _id = jwt.sign({ _id: finduser._id }, 'some-secret-key', { expiresIn: '7d' });
        res.status(200).send({ _id });
      } else {
        throw new IncorrectEmailPasswordError('Неверные email или пароль');
      }
    })
    .catch(next);
};

module.exports.getMeInfo = (req, res, next) => {
  const { _id } = req.user;

  users.findById(_id)
    .then((resUser) => {
      if (!resUser) {
        throw new NotFoundError('Пользователь не найден');
      } else {
        res.status(200).send(resUser);
      }
    })
    .catch((err) => {
      //  res.status(500).send(err);
      next(err);
    });
  //  .catch(next);
};

/*  module.exports.showError = () => {
  throw new NotFoundError('неверный URL');
};  */
