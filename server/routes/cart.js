const router = require('express').Router();
const cartController = require('../controllers/cart');
const isAuth = require('../middleware/is-auth');

router.get('/', isAuth, cartController.getCart);
router.post('/add/:id', isAuth, cartController.add);
router.delete('/remove/:id', isAuth, cartController.remove);
router.post('/checkout', isAuth, cartController.checkout);

module.exports = router;
