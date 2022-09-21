const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const _model = require('../model/scheema');
const _student = require('../model/stuModel');
const JWT  = require('jsonwebtoken');

require('dotenv').config();
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGOURI, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=> console.log('database connected'))
.catch((error)=> console.log(error));


router.get('/', async (req, res) => {
  res.send('Hello, Welcome in node Applications.')
})


router.get('/students', async (req, res)=>{
  try{
   const getdata = await _student.find();
   res.send(getdata);
  }catch(error){
      res.status(500);
  }
})

router.get('/students/:id', async (req, res)=>{
  try{
      const getSingle = await _student.findOne({_id:req.params.id})
      res.send(getSingle);
  } catch(error){
      res.status(500);
  }
});


router.post('/students', async (req, res)=>{
  try{
    const poststudent = new _student();
    poststudent.fullName = req.body.fullName;
    poststudent.mobile = req.body.mobile;
    poststudent.email = req.body.email;
    poststudent.gender = req.body.gender;
    poststudent.subject = req.body.subject;
    poststudent.medium = req.body.medium;
    poststudent.terms = req.body.terms
    await poststudent.save();
    res.send(poststudent);
  }catch(error){
      res.status(500);
  }
})

router.put('/students/:id', async (req, res)=>{
  try{
    const putStu = await _student.findByIdAndUpdate({_id:req.params.id}, req.body, {new:true});
    res.send(putStu);
  }catch(error){
      res.status(500);
  }
})

router.delete('/students/:id', async (req, res)=>{
  try{
    const deleteStu = await _student.findByIdAndRemove({
      _id:req.params.id
    })
    res.send(deleteStu)
  }catch(error){
      res.status(500);
  }
})


// USERS LOGIN - REGISTRAITION
router.get('/', verifyToken, (req, res)=>{
    res.send('Hello')
})

router.get('/user', async (req, res)=>{
    try{
        const user =  await _model.find();
        res.send(user);
    }catch(error){
        res.status(500);
    }
})

router.post('/user', (req, res)=>{
    let userData = req.body;
    let user = new _model(userData);
    user.save((error, registeredUser)=>{
      if(error){
        console.log(error);
      }else{
        let payload = {subject:registeredUser._id};
        let token = JWT.sign(payload, 'secretKey');
        res.status(200).send({token});
      }
    })
  })




router.post('/login', (req, res)=>{
    const userData = req.body
    _model.findOne({email:userData.email}, (err, user)=>{
        if(err){
            console.log(err);
        }else{
            if(!user){
                res.status(401).send('Invalid email');
            }else if(user.password !== userData.password){
                res.status(401).send('Invalid Password');
            }else{
               let payload = {subject:user._id};
               let token = JWT.sign(payload, 'secretKey');
                res.status(200).send({token});
            }
        }
    })
})


  

function verifyToken(req, res, next){
    if(!req.headers.authorization){
      return res.status(401).send('Unauthorize request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
       return res.status(401).send('Unauthorize request');
    }
    let payload = JWT.verify(token, 'secretKey');
    if(!payload){
      return res.status(401).send('Unauthorize request');
    }
    req.userId = payload.subject;
    next();
  }




module.exports = router;

