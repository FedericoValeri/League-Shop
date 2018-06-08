var express = require('express');
var router = express.Router();

const ChampionController = require('../controllers/champions');

//get champion bio page
router.get('/:name', ChampionController.get_champion_bio);

module.exports = router;