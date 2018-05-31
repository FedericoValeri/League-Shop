var express = require('express');
var router = express.Router();

var User = require('../models/user');

router.get('/', function(req, res, next) {
    res.render('admin/admin-page', {});
});

router.get('/usersList', function(req, res, next) {
    User.find(function(err, docs) {
        var users = [];
        users.push(docs);

        res.render('admin/users-list', {
            users: users
        });
    });
});

router.post("/:id", (req, res, next) => {
    const id = req.params.id;
    User.findOneAndRemove({
        _id: id
    }, (err) => {
        if (err) {
            req.flash("error", err);
            console.log("Errore");
            return res.redirect("/admin/");
        }

        req.flash("success", "Your account has been deleted.");
        console.log("Bravo Federico");
        return res.redirect("/admin/usersList");
    });
});

module.exports = router;