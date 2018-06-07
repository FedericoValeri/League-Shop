var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

const UserController = require('../controllers/users');
var User = require('../models/user');
var Order = require('../models/order');
var Cart = require('../models/cart');

//var csrfProtection = csrf();
//router.use(csrfProtection);

router.get('/profile', isLoggedIn, UserController.user_profile);

router.get('/logout', isLoggedIn, UserController.user_logout);

router.use('/', notLoggedIn, function(req, res, next) {
    next();
});

router.get('/signup', csrf(), UserController.user_get_signup);

router.post('/signup', passport.authenticate('local.signup', {
        failureRedirect: '/user/signup',
        failureFlash: true
    }),
    function(req, res, next) {
        if (req.session.oldUrl) {
            var oldUrl = req.session.oldUrl;
            req.session.oldUrl = null;
            res.redirect(oldUrl);
        } else {
            res.redirect('/user/profile');
        }
    });

router.get('/signin', csrf(), UserController.user_get_signin);

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

router.get('/:email', UserController.get_user);

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