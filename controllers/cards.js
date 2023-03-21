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
      } else {
        res.status(200).send({ data: resCards });
      }
    })
    .catch(() => {
      throw new Error('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  cards.create({ name, link, owner: _id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.toString().indexOf('ValidationError') >= 0) {
        throw new ValidationError('Ошибка валидации');
      } else {
        throw new Error('На сервере произошла ошибка');
      }
    })
    .catch(next);
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
        if (card.owner === _id) {
          cards.findByIdAndDelete(cardId)
            .then((cardRes) => {
              res.status(200).send(cardRes);
            });
        } else {
          // ошибка, что не моя карточка
          throw new DelNotMyCardError('Разрешается удалять только свои карточки');
        }
      }
    })
    .catch(() => {
      throw new Error('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  ).then((cardRes) => {
    if (!cardRes) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.status(200).send(cardRes);
    }
  })
    .catch(() => {
      throw new Error('На сервере произошла ошибка');
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  ).then((cardRes) => {
    if (!cardRes) {
      throw new NotFoundError('Карточка не найдена');
    } else {
      res.status(200).send(cardRes);
    }
  })
    .catch(() => {
      throw new Error('На сервере произошла ошибка');
    })
    .catch(next);
};
