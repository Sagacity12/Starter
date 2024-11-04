const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
    name: {
        type : String,
        require: [true, 'Please provide name'],
        minlenght: 3,
        maxlenght: 50
    },

     email: {
        type : String,
        require: [true, 'Please provide valid email'],
        minlenght: 3,
        maxlenght: 50
    },


     password: {
        type : String,
        require: [true, 'Please provide password'],
        minlenght: 6,
    },
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
    next() 
})

UserSchema.method.createJWT = function () {
    return jwt.sign({userId:this._id,name:this.name}, process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME,
    })
}

UserSchema.methods.comparePassword = async function ( canditatePassword ) {
    const isMatch = await bcrypt.compare( canditatePassword, this.password )
    return isMatch
}

module.exports = mongoose.model('User', UserSchema)