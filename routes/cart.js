var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Champion = require('../models/champion');

//route per il carrello

router.get('/', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});


router.get('/reduce/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
});




//checkout route
router.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {
        total: cart.totalPrice
    });
});


module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}