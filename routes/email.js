const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();




//CONTACT FORM

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },    
   tls: {
       rejectUnauthorized: false
   }
})

function sendEmail(mail){
    var mailOption = {
        from: process.env.EMAIL,
        to:mail.to,
        subject:mail.subject,
        html: `<h5>Hi ${mail.name}</h5><br>
            <!--<p>${mail.body}</p><br>-->
        <h4>Thanks for contacting with us, we'll be responsve you soon..</h4>`      
    }
    transporter.sendMail(mailOption, function(err, info){     
        if(err){
            console.log(err);
        }else{
            console.log('Email send '+ info.response );
        }
    })
}

router.post('/', (req, res)=>{
    mail = {
        to:req.body.e_email,
        name:req.body.e_name,
        subject:req.body.e_subject,
        body:req.body.e_message
    }
    console.log(mail)
    sendEmail(mail);
    res.redirect('/')
})


module.exports = router;