var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');

//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {

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
            orders: orders
        });
    });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
    req.logout();
    req.session.cart = null;
    res.redirect('/');
});

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', csrf(), function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    failureRedirect: '/user/signup',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});

router.get('/signin', csrf(), function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    failureRedirect: '/user/signin',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/user/profile');
    }
});


router.get('/:email', function(req, res, next) {
    const email = req.params.email;
    User.findOne({
        email: email
    }, function(err, docs) {
        var user = [];
        user.push(docs);
        console.log(docs);

        res.render('shop/user', {
            title: 'League Shop',
            users: user
        });
    })
});



module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.user && req.user.isAdmin === false) {
        return next();
    }
    res.redirect('/');
}


function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}