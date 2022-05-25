'use strict';

const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = process.env.PORT ||4000;

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json({
    limit: '50mb',
    extended: true,
}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

// Initialize mongoDB and server
mongoose.connect(
    'mongodb://127.0.0.1:27017/tienda', 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    },
    (err, res) => {
        if(err){
            console.log(err);
        } else{
            app.listen(port, function(){
                console.log('Server on port ', port);
            });
        }
    }
)

// Routes
app.use('/api', require('./app/routes'));