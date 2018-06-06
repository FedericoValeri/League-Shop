var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Cart = require('../models/cart');
var Champion = require('../models/champion');

//route per il carrello
router.get('/', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/cart', {
            champions: null
        });
    }

    //calcola il nuovo bilancio dell'utente che sta per acquistare dei campioni, e lo salva nella variabile saldo.
    function nuovoBilancio() {
        var saldo = req.user.blueEssence - req.session.cart.totalPrice;
        if (saldo < 0) {
            return false;
        } else
            return saldo;
    }

    var cart = new Cart(req.session.cart);
    res.render('shop/cart', {
        champions: cart.generateArray(),
        totalPrice: cart.totalPrice,
        nuovoBilancio: nuovoBilancio()
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

    //calcola il nuovo bilancio dell'utente che sta per acquistare dei campioni, e lo salva nella variabile saldo.
    function nuovoBilancio() {
        var saldo = req.user.blueEssence - req.session.cart.totalPrice;
        if (saldo < 0) {
            return false;
        } else
            return saldo;
    }

    if (!req.session.cart) {
        return res.redirect('/cart', {
            champions: null
        });
    }

    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {
        total: cart.totalPrice,
        champions: cart.generateArray(),
        nuovoBilancio: nuovoBilancio()
    });
});
/*
router.post('/checkout/buynow/:id', function(req, res, next) {

    var id = req.params.id;
    var champions = [];
    var cart = new Cart(req.session.cart);
    var itemsCarrello = cart.generateArray();

    //salvo i campioni già posseduti
    User.findOne({
        _id: id
    }, function(err, docs) {
        champions = docs.champions;
    });

    //calcolo il bilancio finale
    function nuovoBilancio() {
        var saldo = req.user.blueEssence - req.session.cart.totalPrice;
        if (saldo < 0) {
            return false;
        } else
            return saldo;
    };
    var provanomi = [];
    //trovo e aggiungo i champ comprati
    for (var item of itemsCarrello) {
        var champion = item.item;
        var name = champion.name;

        Champion.findOne({
            name: name
        }, function(err, docs) {
            champions.push(docs);
            provanomi.push(docs.name);
            console.log("champs " + provanomi); //a volte entra qui prima di aver stamapto i cmapioni già posseduti quindi quelli stampati prima non li aggiunge
            User.findOneAndUpdate({
                _id: id
            }, {

                blueEssence: nuovoBilancio(),
                champions: champions

            }, function(err, docs) {

            });
        });
    };

    res.redirect('/user/profile');
});*/

module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}