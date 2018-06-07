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

module.exports = router;