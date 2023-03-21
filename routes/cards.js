const router = require('express').Router();
const {
  getCards, createCard, delCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const auth = require('../middlewares/auth');

router.get('/', auth, getCards);
router.post('/', auth, createCard);
router.delete('/:cardId', auth, delCard);
router.put('/:cardId/likes', auth, likeCard);
router.delete('/:cardId/likes', auth, dislikeCard);

module.exports = router;
