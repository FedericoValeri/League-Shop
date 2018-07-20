var Order = require('../models/order');
var Cart = require('../models/cart');

//--------------------------------------------------------------------------------------------------------------------//

exports.user_profile = function(req, res, next) {
    var buySuccess = req.flash('success')[0];
    Order.find({
        user: req.user
    }, function(err, orders) {
        if (err) {
            return res.write('Error!');
        }
        var cart;
        orders.forEach(function(order) {
            cart = new Cart(order.cart);
            order.items = cart.generateArray();
        });
        //provvisorio (scala EB solo nella vista del profilo, non dal db nè dalla home)
        res.render('user/profile', {
            title: 'Profilo utente',
            orders: orders,
            champions: req.user.champions,
            buySuccess: buySuccess,
            noMessages: !buySuccess
        });
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.user_logout = function(req, res, next) {
    req.logout();
    req.session.cart = null;
    res.redirect('/');
}

//--------------------------------------------------------------------------------------------------------------------//

exports.user_get_signup = function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        title: 'Registrazione',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.user_get_signin = function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        title: 'Login',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}