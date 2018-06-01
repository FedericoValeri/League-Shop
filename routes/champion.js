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
        console.log(docs);

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
        var productChunks = [];
        var chunkSize = 4;
        for (var i = 0; i < docs.length; i += chunkSize) {
            productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: productChunks,
            role: role
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
});




module.exports = router;