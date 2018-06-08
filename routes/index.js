var express = require('express');
var router = express.Router();

const IndexController = require('../controllers/index');

/* GET home page. */
router.get('/', IndexController.get_home_page);

//aggiungi al carrello
router.get('/add-to-cart/:id', isLoggedIn, IndexController.add_to_cart);

//role selection(deprecated)
//router.get('/role/:role', IndexController.role_selection);

//sort home page
router.get('/sort/:type/:order', IndexController.sort_by);

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldUrl = req.url;
    res.redirect('/user/signin');
}