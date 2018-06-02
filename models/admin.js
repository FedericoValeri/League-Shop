var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var adminSchema = new Schema({

    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

adminSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

adminSchema.methods.validPassword = function(password) {
    //return bcrypt.compareSync(password, this.password);
    if (this.password === password) {
        return true
    } else
        return false
};


module.exports = mongoose.model('Admin', adminSchema);