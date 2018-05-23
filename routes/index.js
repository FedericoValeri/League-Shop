var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Product = require('../models/product');
var Champion = require('../models/champion');

/* GET home page. */
router.get('/', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks
        });
    }).sort({
        price: 'desc'
    });
});
/* sort home page. */
router.get('/sortByPriceAsc', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks
        });
    }).sort({
        price: 'asc'
    });
});
//nome asc
router.get('/sortByNameAsc', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks
        });
    }).sort({
        name: 'asc'
    });
});
//nome desc
router.get('/sortByNameDesc', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks
        });
    }).sort({
        name: 'desc'
    });
});

router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Champion.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});

router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});

router.get('/checkout', function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/shopping-cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {
        total: cart.totalPrice
    });
});

module.exports = router;