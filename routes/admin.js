var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

//var csrfProtection = csrf();
//router.use(csrfProtection);

var Champion = require('../models/champion');

var AdminController = require('../controllers/admins');

//get admin page
router.get('/home', isAdmin, AdminController.get_home);

//logout admin
router.get('/logout', isAdmin, AdminController.admin_logout);

//signup admin
router.post('/signup', passport.authenticate('local.admin.signup', {
    failureRedirect: '/',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/admin/home');
    }
});

//get admin signin page
router.get('/signin', csrf(), AdminController.admin_get_signin);

//admin signin
router.post('/signin', passport.authenticate('local.admin.signin', {
    failureRedirect: '/admin/signin',
    failureFlash: true
}), function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/admin/home');
    }
});

//get champions list
router.get('/championsList', isAdmin, AdminController.get_championsList);

//get champion insert form
router.get('/insertNewChamp', isAdmin, AdminController.get_newChamp_form);

//delete user
router.post("/:id", AdminController.delete_user);

//add new champ
router.post('/add/newChamp', AdminController.add_new_champ);

//delete champ
router.post("/delete/:id", AdminController.delete_champion);

//update champ
router.patch('/champ/:id', function(req, res, next) {
    const id = req.params.id;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Champion.update({
        _id: id
    }, {
        $set: updateOps
    }).exec().then(result => {
        res.status(200).json({
            message: 'Product updated',
            request: {
                type: 'PATCH',
                url: 'http://localhost8080/products/' + id
            }
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin === true) {
        return next();
    }
    res.redirect('/');
}