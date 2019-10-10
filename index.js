'use strict'

const mongoose = require('mongoose');

const users = require('./src/routes/users')
const auth = require('./src/routes/auth');

const path = require('path')
const express = require('express');
const app = express();



mongoose.connect("mongodb://slorop41314:slorop41314@ds333248.mlab.com:33248/heroku_55mdcwjq", {useNewUrlParser:true,  useUnifiedTopology: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.static('public'))

app.use(express.json());

app.use('/users', users);
app.use('/auth', auth);

 
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));