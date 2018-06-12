var Cart = require('../models/cart');
var Champion = require('../models/champion');

//--------------------------------------------------------------------------------------------------------------------//

exports.get_home_page = function(req, res, next) {

    var errorMsg = req.flash('error')[0];

    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }
    Champion.find(function(err, docs) {
        var sort = 'pricedesc';
        var role = 'Tutti';
        var champInCart = false;
        var campioni = [];

        if (isUser()) {
            var userChamps = req.user.champions;
            var controllo = false;
            for (championDocs of docs) {
                controllo = false;
                for (championUser of userChamps) {
                    if (championDocs.name === championUser.name) {
                        controllo = true;
                        break;
                    }
                }
                if (!controllo) {
                    campioni.push(championDocs);
                }
            }
        } else {
            campioni = docs;

        }

        res.render('shop/index', {
            title: 'League Shop',
            champions: campioni,
            sort: sort,
            role: role,
            champInCart: champInCart,
            errorMsg: errorMsg,
            noMessages: !errorMsg
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.add_to_cart = function(req, res, next) {
    var errorMsg = req.flash('error')[0];

    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }
    var acquistato = false;
    var campioniPosseduti = req.user.champions;
    var championId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    if (isUser()) {
        Champion.findById(championId, function(err, champion) {
            if (err) {
                return res.redirect('/');
            }
            for (var champ of campioniPosseduti) {
                if (champion.name === champ.name) {
                    acquistato = true;
                    break;
                }
            }
            if (!cart.isInCart(champion, champion.id)) {
                if (acquistato) {
                    //SPIPPATICI PURE CARO MIO IO FACCIO LO STAGE CIAOFIOCCO
                } else {
                    cart.add(champion, champion.id);
                    req.session.cart = cart;
                    res.redirect('/');
                }
            } else {
                Champion.find(function(err, docs) {
                    var campioni = docs;
                    var sort = 'pricedesc';
                    var role = 'Tutti';
                    var champInCart = true;

                    res.render('shop/index', {
                        title: 'League Shop',
                        champions: campioni,
                        sort: sort,
                        role: role,
                        champInCart: champInCart,
                        errorMsg: errorMsg,
                        noMessages: !errorMsg
                    });
                }).sort({
                    price: 'desc',
                    name: 'asc'
                });
            }

        });
    } else {
        req.flash('error', 'Per aggiungere campioni al carrello devi essere autenticato!');
        return res.redirect('/');

    }

}

//--------------------------------------------------------------------------------------------------------------------//

exports.role_selection = function(req, res, next) {
    var role = req.params.role;

    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }

    Champion.find({
        role: role
    }, function(err, docs) {
        var campioni = [];

        if (isUser()) {
            var userChamps = req.user.champions;
            var controllo = false;
            for (championDocs of docs) {
                controllo = false;
                for (championUser of userChamps) {
                    if (championDocs.name === championUser.name) {
                        controllo = true;
                        break;
                    }
                }
                if (!controllo) {
                    campioni.push(championDocs);
                }
            }
        } else {
            campioni = docs;
        }
        res.render('shop/index', {
            title: 'League Shop',
            champions: campioni,
            role: role
        });
    }).sort({
        price: 'desc',
        name: 'asc'
    });
}

//--------------------------------------------------------------------------------------------------------------------//

exports.sort_by = function(req, res, next) {
    var errorMsg = req.flash('error')[0];

    function isUser() {
        if (req.user && req.user.isAdmin === false) {
            return true;
        } else return false;
    }
    var type = req.params.type;
    var order = req.params.order;
    if (type === "price") {
        Champion.find(function(err, docs) {
            var campioni = [];
            if (isUser()) {
                var userChamps = req.user.champions;
                var controllo = false;
                for (championDocs of docs) {
                    controllo = false;
                    for (championUser of userChamps) {
                        if (championDocs.name === championUser.name) {
                            controllo = true;
                            break;
                        }
                    }
                    if (!controllo) {
                        campioni.push(championDocs);
                    }
                }
            } else {
                campioni = docs;
            }
            res.render('shop/index', {
                title: 'League Shop',
                champions: campioni,
                role: 'Tutti',
                sort: 'price' + order,
                errorMsg: errorMsg,
                noMessages: !errorMsg
            });
        }).sort({
            price: order,
            name: 'asc'
        });
    }
    if (type === "name") {
        Champion.find(function(err, docs) {
            var campioni = [];
            if (isUser()) {
                var userChamps = req.user.champions;
                var controllo = false;
                for (championDocs of docs) {
                    controllo = false;
                    for (championUser of userChamps) {
                        if (championDocs.name === championUser.name) {
                            controllo = true;
                            break;
                        }
                    }
                    if (!controllo) {
                        campioni.push(championDocs);
                    }
                }
            } else {
                campioni = docs;
            }
            res.render('shop/index', {
                title: 'League Shop',
                champions: campioni,
                role: 'Tutti',
                sort: 'name' + order,
                errorMsg: errorMsg,
                noMessages: !errorMsg
            });
        }).sort({
            name: order
        });
    }
}