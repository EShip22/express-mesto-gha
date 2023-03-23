const jwt = require('jsonwebtoken');
const IncorrectEmailPasswordError = require('../errors/incorrect-email-password-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new IncorrectEmailPasswordError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    throw new IncorrectEmailPasswordError('Необходима авторизация');
  }

  req.user = payload;
  next();
};
