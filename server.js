const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api');
const email = require('./routes/email');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', api);
app.use('/send_email_form', email)
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname + '/dist/index.html'))
})



const port = process.env.PORT || 3001
app.listen(port, ()=>{
    console.log(`app is running on ${port}`);
})