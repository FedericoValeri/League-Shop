var express = require('express');
var router = express.Router();

var Cart = require('../models/cart');
var Champion = require('../models/champion');
var Order = require('../models/order');
var User = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }
    Champion.find(function(err, docs) {
        var sort = 'pricedesc';
        var role = 'Tutti';
        var champInCart = false;
        var campioni = [];

        if (isUser()) {
            var userChamps = req.user.champions;
            var controllo = false;
            for (championDocs of docs) {
                controllo = false;
                for (championUser of userChamps) {
                    if (championDocs.name === championUser.name) {
                        controllo = true;
                        break;
                    }
                }
                if (!controllo) {
                    campioni.push(championDocs);
                }
            }
        } else {
            campioni = docs;
        }

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
            res.redirect('/');
        } else {
            //some error message on page

            Champion.find(function(err, docs) {
                var campioni = docs;
                var sort = 'pricedesc';
                var role = 'Tutti';
                var champInCart = true;


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

    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }

    Champion.find({
        role: role
    }, function(err, docs) {
        var campioni = [];

        if (isUser()) {
            var userChamps = req.user.champions;
            var controllo = false;
            for (championDocs of docs) {
                controllo = false;
                for (championUser of userChamps) {
                    if (championDocs.name === championUser.name) {
                        controllo = true;
                        break;
                    }
                }
                if (!controllo) {
                    campioni.push(championDocs);
                }
            }
        } else {
            campioni = docs;
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: campioni,
            role: role
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
});


/* sort home page. */
router.get('/sort/:type/:order', function(req, res, next) {
    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }
    var type = req.params.type;
    var order = req.params.order;
    if (type === "price") {
        Champion.find(function(err, docs) {
            var campioni = [];
            if (isUser()) {
                var userChamps = req.user.champions;
                var controllo = false;
                for (championDocs of docs) {
                    controllo = false;
                    for (championUser of userChamps) {
                        if (championDocs.name === championUser.name) {
                            controllo = true;
                            break;
                        }
                    }
                    if (!controllo) {
                        campioni.push(championDocs);
                    }
                }
            } else {
                campioni = docs;
            }
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
            var campioni = [];
            if (isUser()) {
                var userChamps = req.user.champions;
                var controllo = false;
                for (championDocs of docs) {
                    controllo = false;
                    for (championUser of userChamps) {
                        if (championDocs.name === championUser.name) {
                            controllo = true;
                            break;
                        }
                    }
                    if (!controllo) {
                        campioni.push(championDocs);
                    }
                }
            } else {
                campioni = docs;
            }
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

//checkout

router.post('/checkout/:id', isLoggedIn, function(req, res, next) {

    if (!req.session.cart) {
        return res.redirect('/cart');
    }
    var date = new Date().toLocaleString();
    var oldChampions = req.user.champions;
    var id = req.params.id;
    var cart = new Cart(req.session.cart);
    var order = new Order({
        user: req.user,
        cart: cart,
        date: date
    });
    var cartItems = cart.generateArray();
    for (var field of cartItems) {

        //creazione skills 
        var champSkills = field.item.skills;

        //creazione champ
        var champion = new Champion({
            imagePath: field.item.imagePath,
            name: field.item.name,
            title: field.item.title,
            role: field.item.role,
            description: field.item.description,
            price: field.item.price,
            skills: champSkills
        })

        oldChampions.push(champion);
    }

    order.save(function(err, result) {
        req.flash('success', 'Successfully bought product!');

        User.update({
            _id: id
        }, {
            $set: {
                blueEssence: req.user.blueEssence - cart.totalPrice,
                champions: oldChampions
            }
        }, function(err, docs) {});
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