const router = require('express').Router();
const categoryController = require('../controllers/category');
const isAuth = require('../middleware/is-auth');

router.post('/create', isAuth, categoryController.createPost);
router.get('/all', isAuth, categoryController.getAll);

module.exports = router;