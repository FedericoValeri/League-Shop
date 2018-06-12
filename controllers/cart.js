var Cart = require('../models/cart');
var Champion = require('../models/champion');
var Order = require('../models/order');
var User = require('../models/user');


//--------------------------------------------------------------------------------------------------------------------//

exports.get_cart = function(req, res, next) {
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
}

//--------------------------------------------------------------------------------------------------------------------//

exports.remove_item = function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeItem(productId);
    req.session.cart = cart;
    res.redirect('/cart');
}

//--------------------------------------------------------------------------------------------------------------------//

exports.get_checkout_page = function(req, res, next) {
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
}

//--------------------------------------------------------------------------------------------------------------------//

exports.buy_now = function(req, res, next) {

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
        req.flash('success', 'Campione acquistato!');

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
}