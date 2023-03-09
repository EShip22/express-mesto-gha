const cards = require('../models/card');

const ERROR_VALIDATION = 400;
const ERROR_NO_DATA_FOUND = 404;
const ERROR_OTHERS = 500;

module.exports.getCards = (req, res) => {
  cards.find({})
    .then((resCards) => {
      if (resCards.length === 0) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Карточки не найдены' });
      } else {
        res.status(200).send({ data: resCards });
      }
    })
    .catch(() => res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  cards.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      } else {
        res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.delCard = (req, res) => {
  const { cardId } = req.params;
  cards.findByIdAndDelete(cardId)
    .then((cardRes) => {
      if (!cardRes) {
        res.status(ERROR_NO_DATA_FOUND).send({ message: 'Карточка не найдена' });
      } else {
        res.status(200).send(cardRes);
      }
    })
    .catch(() => {
      res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
    });
};

module.exports.likeCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  ).then((cardRes) => {
    if (!cardRes) {
      res.status(ERROR_NO_DATA_FOUND).send({ message: 'Карточка не найдена' });
    } else {
      res.status(200).send(cardRes);
    }
  })
    .catch(() => {
      res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
    });
};

module.exports.dislikeCard = (req, res) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  ).then((cardRes) => {
    if (!cardRes) {
      res.status(ERROR_NO_DATA_FOUND).send({ message: 'Карточка не найдена' });
    } else {
      res.status(200).send(cardRes);
    }
  })
    .catch(() => {
      res.status(ERROR_VALIDATION).send({ message: 'Ошибка валидации' });
      res.status(ERROR_OTHERS).send({ message: 'Произошла ошибка' });
    });
};
