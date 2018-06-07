var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

//var csrfProtection = csrf();
//router.use(csrfProtection);

var Skill = require('../models/skill');
var User = require('../models/user');
var Champion = require('../models/champion');


router.get('/home', isAdmin, function(req, res, next) {

    res.render('admin/admin-page', {});
});


router.get('/logout', isAdmin, function(req, res, next) {
    req.logout();
    res.redirect('/');
});



router.get('/signin', csrf(), function(req, res, next) {
    var messages = req.flash('error');
    res.render('admin/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

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



//get users list
router.get('/usersList', isAdmin, function(req, res, next) {
    User.find(function(err, docs) {
        var users = [];

        users.push(docs);

        res.render('admin/users-list', {
            users: users
        });
    });
});

//get champions list
router.get('/championsList', isAdmin, function(req, res, next) {
    Champion.find(function(err, docs) {
        var campioni = docs;
        var numeroCampioni = docs.length;


        res.render('admin/champions-list', {
            champions: campioni,
            numeroCampioni: numeroCampioni
        });
    }).sort({
        name: 'asc'
    });
});

//get champion insert form
router.get('/insertNewChamp', isAdmin, function(req, res, next) {
    res.render('admin/newChamp');
});

//delete user
router.post("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findOneAndRemove({
        _id: id
    }, (err) => {
        if (err) {
            req.flash("error", err);

            return res.redirect("/admin/");
        }

        req.flash("success", "The account has been deleted.");
        return res.redirect("/admin/usersList");
    });
});

//add new champ
router.post('/add/newChamp', (req, res) => {

    //creazione skills 
    var champSkills = [
        new Skill({
            imageSrc: req.body.imageSrcP,
            letter: "Passiva",
            title: req.body.titleP,
            description: req.body.descriptionP
        }),
        new Skill({
            imageSrc: req.body.imageSrcQ,
            letter: "Q",
            title: req.body.titleQ,
            description: req.body.descriptionQ
        }),
        new Skill({
            imageSrc: req.body.imageSrcW,
            letter: "W",
            title: req.body.titleW,
            description: req.body.descriptionW
        }),
        new Skill({
            imageSrc: req.body.imageSrcE,
            letter: "E",
            title: req.body.titleE,
            description: req.body.descriptionE
        }),
        new Skill({
            imageSrc: req.body.imageSrcR,
            letter: "R",
            title: req.body.titleR,
            description: req.body.descriptionR
        })
    ];
    //creazione champ
    var champion = new Champion({
        imagePath: req.body.imagePathC,
        name: req.body.nameC,
        title: req.body.titleC,
        role: req.body.roleC,
        description: req.body.descriptionC,
        price: req.body.priceC,
        skills: champSkills
    })
    champion.save();
    res.redirect("/admin/championsList");
});

router.get('/updateChamp/:name', function(req, res, next) {

    const name = req.params.name;
    Champion.findOne({
        name: name
    }, function(err, docs) {
        var champ = [];
        champ.push(docs);

        res.render('admin/champ-update', {
            title: 'League Shop',
            champion: champ
        });
    })
});

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

//delete champ
router.post("/delete/:id", (req, res, next) => {
    const id = req.params.id;
    Champion.findOneAndRemove({
        _id: id
    }, (err) => {
        if (err) {
            req.flash("error", err);

            return res.redirect("/admin/");
        }

        req.flash("success", "The account has been deleted.");
        return res.redirect("/admin/championsList");
    });
});

module.exports = router;

function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin === true) {
        return next();
    }
    res.redirect('/');
}