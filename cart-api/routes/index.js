var express = require('express');
var router = express.Router({
    mergeParams: true
});

const userRouter = require('./usersRouter');
const ProductRouter = require('./ProductRouter');
const CartRouter = require('./CartRouter');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/users', userRouter);
router.use('/products', ProductRouter);
router.use('/users', CartRouter);

module.exports = router;
