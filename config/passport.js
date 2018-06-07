var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;



passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use('local.admin.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {

    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({
        min: 4
    });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'username': username
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'User already exists.'
            });
        }
        var newUser = new User({
            isAdmin: true
        });

        newUser.username = username;
        newUser.password = password;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));




passport.use('local.admin.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, username, password, done) {
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'username': username
    }, function(err, admin) {
        if (err) {
            return done(err);
        }
        if (!admin) {
            return done(null, false, {
                message: 'You are not admin. Get out of here!'
            });
        }
        if (!admin.validPassword(password)) {
            return done(null, false, {
                message: 'Wrong password.'
            });
        }
        return done(null, admin);
    });
}));





passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    var username = req.body.username;
    req.checkBody('username', 'Invalid username').notEmpty();
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty().isLength({
        min: 4
    });
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email,
        'username': username
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: 'User already exists.'
            });
        }
        var newUser = new User({
            blueEssence: 50000
        });
        newUser.username = username;
        newUser.email = email;
        newUser.password = password;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({
        'email': email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, {
                message: 'No user found.'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Wrong password.'
            });
        }
        return done(null, user);
    });
}));