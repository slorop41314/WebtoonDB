'use strict'

const express = require('express')

const router = require('express-promise-router')()

const UserController = require('../controllers/UserController')

const fs = require('fs')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
    destination : function(req, file, cb) {
        const uploadsDir = path.join(__dirname, '..', '..','public','userprofile', `${Date.now()}`)
        fs.mkdirSync(uploadsDir)
        cb(null , uploadsDir)
    },
    filename : function (req , file, cb) {
        cb(null, file.originalname)
        }
})
const upload = multer({ storage })

router.route('/')
    .post(UserController.newUser)
    .get(UserController.index)
    
router.route('/:userId')
    .get(UserController.getUser)
    .put(upload.single("profilepicture"),UserController.editUser)

module.exports = router