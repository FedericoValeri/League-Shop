var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Champion = require('../models/champion');

/* GET home page. */
router.get('/', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        var sort = 'pricedesc';
        var role = 'Tutti';
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks,
            sort: sort,
            role: role
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
});

//aggiungi al carrello
router.get('/add-to-cart/:id', isLoggedIn, function(req, res, next) {
    var championId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Champion.findById(championId, function(err, champion) {
        if (err) {
            return res.redirect('/');
        }
        if (!cart.isInCart(champion, champion.id)) {
            cart.add(champion, champion.id);
            req.session.cart = cart;
            console.log(req.session.cart);
            res.redirect('/');
        } else {
            res.redirect('/');
        }

    });
});

/* sort home page. */
//price asc
router.get('/EB', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        var sort = 'priceasc';
        var role = 'Tutti';
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks,
            sort: sort,
            role: role
        });
    }).sort({
        price: 'asc'
    });
});
//nome asc
router.get('/Z-A', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        var sort = 'nameasc';
        var role = 'Tutti';
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks,
            sort: sort,
            role: role
        });
    }).sort({
        name: 'desc'
    });
});
//nome desc
router.get('/A-Z', function(req, res, next) {
    Champion.find(function(err, docs) {
        var productChunks = [];
        var chunkSize = 4;
        var sort = 'namedesc';
        var role = 'Tutti';
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks,
            sort: sort,
            role: role
        });
    }).sort({
        name: 'asc'
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