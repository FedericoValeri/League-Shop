//CODE BY FEDE

var express = require('express');
var router = express.Router();

var Product = require('../models/product');
var Champion = require('../models/champion');

router.get('/:productId', function(req, res, next) {
    const id = req.params.productId;
    Champion.findById(id, function(err, docs) {
        var champ = [];
        champ.push(docs);
        console.log(docs);

        res.render('shop/champ.hbs', {
            title: 'League Shop',
            champion: champ
        });
    })

});

module.exports = router;