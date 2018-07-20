var Skill = require('../models/skill');
var User = require('../models/user');
var Champion = require('../models/champion');

//--------------------------------------------------------------------------------------------------------------------//

exports.get_home = function(req, res, next) {
    var successMsg = req.flash('success')[0];
    User.find(function(err, docs) {
        var users = docs;
        res.render('admin/admin-page', {
            title: 'Admin page',
            users: users,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.admin_logout = function(req, res, next) {
    req.logout();
    res.redirect('/');
}

//--------------------------------------------------------------------------------------------------------------------//

exports.admin_signup = function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/admin/');
    }
}

//--------------------------------------------------------------------------------------------------------------------//

exports.admin_signin = function(req, res, next) {
    if (req.session.oldUrl) {
        var oldUrl = req.session.oldUrl;
        req.session.oldUrl = null;
        res.redirect(oldUrl);
    } else {
        res.redirect('/admin/');
    }
}

//--------------------------------------------------------------------------------------------------------------------//

exports.admin_get_signin = function(req, res, next) {
    var messages = req.flash('error');
    res.render('admin/signin', {
        title: 'Admin Login',
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.get_championsList = function(req, res, next) {
    var successMsg = req.flash('success')[0];
    Champion.find(function(err, docs) {
        var campioni = docs;
        var numeroCampioni = docs.length;

        res.render('admin/champions-list', {
            title: 'Lista campioni',
            champions: campioni,
            numeroCampioni: numeroCampioni,
            successMsg: successMsg,
            noMessages: !successMsg
        });
    }).sort({
        name: 'asc'
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.get_newChamp_form = function(req, res, next) {
    res.render('admin/newChamp');
}

//--------------------------------------------------------------------------------------------------------------------//

exports.delete_user = (req, res, next) => {
    const id = req.params.id;
    User.findOneAndRemove({
        _id: id
    }, (err) => {
        if (err) {
            req.flash("error", err);
            return res.redirect("/admin/");
        }
        req.flash("success", "The account has been deleted.");
        return res.redirect("/admin/");
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.add_new_champ = (req, res) => {
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
    console.log("È stao aggiunto il campione: " + champion.name);
    res.redirect("/admin/championsList");
}

//--------------------------------------------------------------------------------------------------------------------//

exports.delete_champion = (req, res, next) => {
    const id = req.params.id;
    Champion.findOneAndRemove({
        _id: id
    }, (err) => {
        if (err) {
            req.flash("error", err);
            return res.redirect("/admin/");
        }

        req.flash("success", "Il campione è stato rimosso");
        return res.redirect("/admin/championsList");
    });
}