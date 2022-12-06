const express = require('express');
const app = express();
const port = 9000
const mongoose = require('mongoose')
const router = require('./router/router');
const cors = require('cors')

mongoose.set('strictQuery', true) //avoids warning on soon to come change 
mongoose.connect('mongodb://127.0.0.1:27017/config')
    .then(()=>{console.log('Connection established')})
    .catch(error => console.log(error));

app.use(express.json())  
app.use(express.urlencoded({extended : true}))
app.use(cors())


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    }
 );

app.use(router)


