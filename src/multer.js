'use strict'

const express =require('express')
const config = require('../config')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const s3 = new aws.S3()



const storage = multerS3({
    s3: s3,
    acl : 'public-read',
    bucket: 'multerimages-db',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
const upload = multer({ storage })

module.exports = upload
