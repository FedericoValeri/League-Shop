var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({

    username: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    champions: [{
        type: mongoose.Schema.Types.Mixed,
        ref: 'Champion',
        required: false
    }],
    blueEssence: {
        type: Number,
        required: false
    }

});

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.password);
    if (this.password === password) {
        return true
    } else
        return false
};


module.exports = mongoose.model('User', userSchema);