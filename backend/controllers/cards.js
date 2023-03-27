const cards = require('../models/card');

//  ошибки
const DelNotMyCardError = require('../errors/del-not-my-card-err');
const NotFoundError = require('../errors/not-found-err');
const ValidationError = require('../errors/validation-err');

module.exports.getCards = (req, res, next) => {
  cards.find({})
    .then((resCards) => {
      if (!resCards) {
        throw new NotFoundError('Карточки не найдены');
      }
      res.status(200).send(resCards);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  cards.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Ошибка валидации'));
        return;
      }
      next(err);
    });
};

module.exports.delCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  cards.findById(cardId)
    .then((card) => {
      // если не найдена, то ошибка
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card) {
        // проверяем, что карточка создана мной
        if (card.owner.toString() === _id) {
          cards.findByIdAndDelete(cardId)
            .then((cardRes) => {
              res.status(200).send(cardRes);
            })
            .catch((err) => next(err));
        } else {
          // ошибка, что не моя карточка
          next(new DelNotMyCardError('Разрешается удалять только свои карточки'));
        }
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((cardRes) => {
    if (!cardRes) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.status(200).send(cardRes);
    }
  })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((cardRes) => {
    if (!cardRes) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.status(200).send(cardRes);
    }
  })
    .catch(next);
};
