var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

//var csrfProtection = csrf();
//router.use(csrfProtection);

var User = require('../models/user');



router.get('/profile', isLoggedIn, function(req, res, next) {

    User.findOne({
        email: req.user.email
    }, function(err, docs) {
        var users = [];
        users.push(docs);
        var prova = "ciao";
        console.log(users);
        console.log(req.session);
        res.render('user/profile', {
            users: users
        });

    })
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
    if (req.isAuthenticated()) {
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