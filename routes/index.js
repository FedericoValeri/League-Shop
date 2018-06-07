var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Champion = require('../models/champion');
var Order = require('../models/order');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

    Champion.find(function(err, docs) {
        var sort = 'pricedesc';
        var role = 'Tutti';
        var champInCart = false;
        var campioni = docs;


        res.render('shop/index', {
            title: 'League Shop',
            champions: campioni,
            sort: sort,
            role: role,
            champInCart: champInCart
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
            //some error message on page
            console.log("Campione già nel carrello!");
            Champion.find(function(err, docs) {
                var campioni = [];
                var sort = 'pricedesc';
                var role = 'Tutti';
                var champInCart = true;

                campioni.push(docs);

                res.render('shop/index', {
                    title: 'League Shop',
                    champions: campioni,
                    sort: sort,
                    role: role,
                    champInCart: champInCart
                });
            }).sort({
                price: 'desc',
                name: 'asc'
            });
        }

    });
});

/*role selection*/

router.get('/role/:role', function(req, res, next) {
    var role = req.params.role;
    Champion.find({
        role: role
    }, function(err, docs) {
        var champs = docs;
        res.render('shop/index', {
            title: 'League Shop',
            champions: champs,
            role: role
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
});


/* sort home page. */
router.get('/sort/:type/:order', function(req, res, next) {
    var type = req.params.type;
    var order = req.params.order;
    if (type === "price") {
        Champion.find(function(err, docs) {
            var campioni = docs;
            res.render('shop/index', {
                title: 'League Shop',
                champions: campioni,
                role: 'Tutti',
                sort: 'price' + order
            });
        }).sort({
            price: order,
            name: 'asc'
        });
    }
    if (type === "name") {
        Champion.find(function(err, docs) {
            var campioni = docs;
            res.render('shop/index', {
                title: 'League Shop',
                champions: campioni,
                role: 'Tutti',
                sort: 'name' + order
            });
        }).sort({
            name: order
        });
    }
});

router.post('/checkout/:id', isLoggedIn, function(req, res, next) {
    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var id = req.params.id;
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart
    });
    order.save(function(err, result) {
        req.flash('success', 'Successfully bought product!');

        //fare l'update delle blueEssence

        User.update({
            _id: id
        }, {
            $set: {
                blueEssence: req.user.blueEssence - cart.totalPrice
            }
        }, function(err, docs) {


        });

        req.session.cart = null;
        res.redirect('/user/profile');
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