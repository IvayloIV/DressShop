const router = require('express').Router();
const dressController = require('../controllers/dress');
const isAuth = require('../middleware/is-auth');

router.get('/count', dressController.countDress);
router.post('/create', isAuth, dressController.create);

router.post('/edit/:id', isAuth, dressController.editPost);

router.delete('/remove/:id', isAuth, dressController.remove);
router.get('/details/:id', dressController.details);

router.get('/category/:categoryName', dressController.getByCategory);
router.post('/like/:dressId', isAuth, dressController.like);
router.post('/dislike/:dressId', isAuth, dressController.dislike);

router.get('/:page/items/:itemsCount', dressController.getByPageAndItems);
router.get('/:page', dressController.getByPage);

module.exports = router;