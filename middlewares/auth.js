const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log(req.headers);
  console.log('зашли');

  if (!authorization || !authorization.startsWith('Bearer ')) {
    console.log('зашли2');
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return res.status(401).send({ message: 'Необходима авторизация' });
  }

  req.user = payload;
  console.log('req.user');
  console.log(req.user);
  next();

  return null;
};
