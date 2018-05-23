var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var champSchema = new Schema({
    imagePath: {
        type: String,
        required: true
    },
    name: {
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
    price: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    skills: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Skill',
        required: true
    }]
});


module.exports = mongoose.model('Champion', champSchema);