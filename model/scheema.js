const mongoose = require('mongoose');
const users_detail = {   
    firstName:String,
    lastName:String,
    mobile:Number,
    email:String,
    password:String,
    confirmPWD:String
}

module.exports = mongoose.model('regUsers', users_detail);
