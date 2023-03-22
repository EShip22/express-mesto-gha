const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  updateAvatar,
  showError,
  login,
  getMeInfo,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get('/me', auth, getMeInfo);
router.get('/:userId', auth, celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24),
  }),
}), getUser);
//  регистрируемся:
//  {
//    "email": "prank22@yandex.ru",
//    "password": "sossz4ar"
//  }
//  в ответе "id": "6415e8b2b34852dc1c118653",
//  логинимся. в ответе:
//  {
//  "_id": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
//  eyJpYXQiOjE2NzkxNTg4NDcsImV4cCI6MTY3OTc2MzY0N30.CHi0uu9TtMJTRniL0LGWvkl3eKysQfOScZ1pZZjTszA"
//  }

const httpRegexG = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)/;

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    avatar: Joi.string().pattern(httpRegexG),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);
router.patch('/me', auth, celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
router.patch('/me/avatar', auth, celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(httpRegexG),
  }),
}), updateAvatar);
router.patch('/*', showError);

module.exports = router;
