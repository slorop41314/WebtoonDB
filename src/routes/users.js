'use strict'

const express = require('express')

const router = require('express-promise-router')()
const UserController = require('../controllers/UserController')

const upload = require('../multer')

router.route('/')
    .post(UserController.newUser)
    .get(UserController.index)
    
router.route('/:userId')
    .get(UserController.getUser)
    .put(upload.single("profilepicture"),UserController.editUser)

module.exports = router