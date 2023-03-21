//  routes

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

//  router.get('/me', getMeInfo);
router.get('/', auth, getUsers);
router.get('/me', auth, getMeInfo);
router.get('/:userId', auth, getUser);
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

router.post('/signup', createUser);
router.post('/signin', login);
router.patch('/me', auth, updateUser);
router.patch('/me/avatar', auth, updateAvatar);
router.patch('/*', showError);

module.exports = router;
