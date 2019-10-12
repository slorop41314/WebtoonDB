'use strict'
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const config = require('./config')
const users = require('./src/routes/users')
const auth = require('./src/routes/auth');
const bodyParser = require('body-parser')
const path = require('path')
const express = require('express');
const app = express();



mongoose.connect(config.db, {useNewUrlParser:true,  useUnifiedTopology: true})
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(express.json());

app.use('/users', users);
app.use('/auth', auth);

 
const port = process.env.PORT || 7000;
app.listen(port, () => console.log(`Listening on port ${port}...`));