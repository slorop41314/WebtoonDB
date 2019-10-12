'use strict'

const express =require('express')
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')
const fs = require('fs')
const path = require('path')
const multer = require('multer')
const s3 = new aws.S3()


    // const storage = multer.diskStorage({
    //   destrination: function(req, file, cb) {
    //     cb(null, path.resolve(__dirname, '/uploads/'));
    // },
    //     filename : function (req , file, cb) {
    //         cb(null, file.originalname)
    //     }
    // })
    // const upload = multer({ storage })

aws.config.update({
	secretAccessKey : "k1CgD7tNl3vh9nqZl6xHYi9YaQYcqO3pDvaipdCc",
	accessKeyId : "AKIAJYREMY3TAUA7VKBQ",
	region: 'us-west-2'
})

const storage = multerS3({
    s3: s3,
    acl : 'public-read',
    bucket: 'webtoondb-images',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
const upload = multer({ storage })

module.exports = upload
