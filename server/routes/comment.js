const router = require('express').Router();
const commentController = require('../controllers/comment');
const isAuth = require('../middleware/is-auth');

router.get('/:dressId', commentController.getByDressId);
router.post('/create/:dressId', isAuth, commentController.create);
router.delete('/remove/:commentId', isAuth, commentController.remove);

module.exports = router;