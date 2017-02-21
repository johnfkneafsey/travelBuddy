const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    googleId: {type: String, required: true},
    accessToken: {type: String, required: true},
    email: String,
    name: String
});

userSchema.methods.apiRepr = function () {
    return {
        id: this._id,      
        googleId: this.googleId,
        accessToken: this.accessToken,
        email: this.email,
        name: this.name       
    }
}

const User = mongoose.model('User', userSchema);

module.exports = { User }

