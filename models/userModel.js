const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: 'string',
        required: true,
        min:3,
        max:20,
        unique: true
    }, 
    email:{
        type:'string',
        required: true,
        unique: true,
        max: 50,
    },
    password:{
        type:'string',
        required: true,
        min:8,
        max:20,
        unique: true
    },
    isAvatarSet: {
        type: 'boolean',
        default: false,
    },
    avatar: {
        type:'string',
        default: ''
    },

});

module.exports = mongoose.model("Users", userSchema)