const mongoose = require('mongoose');
const  studentmodel = {   
    fullName:String,
    mobile:Number,
    email:String,
    gender:String,
    subject:String,
    medium:String,
    terms:Boolean
}

module.exports = mongoose.model('student_details', studentmodel)