var Champion = require('../models/champion');

//--------------------------------------------------------------------------------------------------------------------//

exports.get_champion_bio = function(req, res, next) {
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
}