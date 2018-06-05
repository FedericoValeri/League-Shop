//CODE BY FEDE

var express = require('express');
var router = express.Router();

var Champion = require('../models/champion');


router.get('/:name', function(req, res, next) {
    const name = req.params.name;
    Champion.findOne({
        name: name
    }, function(err, docs) {
        var champ = [];
        champ.push(docs);

        res.render('shop/champ.hbs', {
            title: 'League Shop',
            champion: champ
        });
    })
});



/*role selection*/

router.get('/role/:role', function(req, res, next) {
    var role = req.params.role;
    Champion.find({
        role: role
    }, function(err, docs) {
        var champs = [];
        champs.push(docs);
        res.render('shop/index', {
            title: 'League Shop',
            champions: champs,
            role: role
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
});




module.exports = router;