var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');

var csrfProtection = csrf();
router.use(csrfProtection);

var Skill = require('../models/skill');
var User = require('../models/user');
var Champion = require('../models/champion');


router.get('/home', function(req, res, next) {
    res.render('admin/admin-page', {});
});


router.get('/signin', function(req, res, next) {
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
router.get('/usersList', function(req, res, next) {
    User.find(function(err, docs) {
        var users = [];

        users.push(docs);

        res.render('admin/users-list', {
            users: users
        });
    });
});

//get champions list
router.get('/championsList', function(req, res, next) {
    Champion.find(function(err, docs) {
        var championsChunks = [];

        championsChunks.push(docs);

        res.render('admin/champions-list', {
            champions: championsChunks
        });
    }).sort({
        name: 'asc'
    });
});

//get champion insert form
router.get('/insertNewChamp', function(req, res, next) {
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
            console.log("Errorrrre");
            return res.redirect("/admin/");
        }

        req.flash("success", "Your account has been deleted.");
        console.log("Bravo Federico");
        return res.redirect("/admin/usersList");
    });
});

//add new champ
router.post('/add/newChamp', (req, res) => {
    console.log(req.body);
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
    res.redirect("/admin/");
});

module.exports = router;