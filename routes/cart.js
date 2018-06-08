var express = require('express');
var router = express.Router();

var CartController = require('../controllers/cart');

//get cart page
router.get('/', CartController.get_cart);

//remove item from cart
router.get('/remove/:id', CartController.remove_item);

//get checkout page
router.get('/checkout', CartController.get_checkout_page);

//acquista campione
router.post('/checkout/:id', isLoggedIn, CartController.buy_now);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}