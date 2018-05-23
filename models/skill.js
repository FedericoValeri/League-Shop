var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var skillSchema = new Schema({
    imageSrc: {
        type: String,
        required: true
    },
    letter: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Skill', skillSchema);