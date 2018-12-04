var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;

//Store the user in the session
passport.serializeUser(function(user, done) {
    //when you store a user in the session, serialize him by id
    done(null, user.id);
});

//Retrieve the user from the session (by id)
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

    req.checkBody('username', 'Username errato').notEmpty();
    req.checkBody('password', 'Password errata').notEmpty().isLength({
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
                message: "L'utente è già in uso"
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
    req.checkBody('username', 'Username errato').notEmpty();
    req.checkBody('password', 'Password errata').notEmpty();
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
                message: 'Non sei un amministratore!'
            });
        }
        if (!admin.validPassword(password)) {
            return done(null, false, {
                message: 'Password errata'
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
    req.checkBody('username', 'Username errato').notEmpty();
    req.checkBody('email', 'Email errata').notEmpty().isEmail();
    req.checkBody('password', 'Password errata').notEmpty().isLength({
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
                message: "L'utente è già in uso"
            });
        }
        var newUser = new User({
            blueEssence: 50000
        });
        newUser.username = username;
        newUser.email = email;
        //newUser.password = password;
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
    req.checkBody('email', 'Email errata').notEmpty().isEmail();
    req.checkBody('password', 'Password errata').notEmpty();
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
                message: 'Nessun utente trovato'
            });
        }
        if (!user.validPassword(password)) {
            return done(null, false, {
                message: 'Password errata'
            });
        }
        return done(null, user);
    });
}));