const jwt = require('jsonwebtoken');
const IncorrectEmailPasswordError = require('../errors/incorrect-email-password-err');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    //  res.status(401).send({ message: 'Необходима авторизация' });
    throw new IncorrectEmailPasswordError('Необходима авторизация11');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    //  res.status(401).send({ message: 'Необходима авторизация' });
    throw new IncorrectEmailPasswordError('Необходима авторизация11');
  }

  req.user = payload;
  next();
};
