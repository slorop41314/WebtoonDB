'use strict'

const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken')

const User = require('../models/User')


module.exports = {
    index : async (req, res, next) => {
        const alluser = await User.find({})
        res.status(200).send(alluser)
    },

    newUser : async (req , res , next) => {
        const user = await User.findOne({email : req.body.email})
        if (user) {
            res.status(400).send('Email sudah digunakan')
        }else {
            const newUser = new User(_.pick(req.body , ['fullname', 'email','password']))
            const salt = await bcrypt.genSalt(10);
            newUser.password = await bcrypt.hash(newUser.password, salt);
            newUser.profilepicture = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0REBIQEBAQEBEQEBASExAPERsPDw8QFREYFhkSExUYIygiGholGxcWITEhJSksLi46Fx8zODMtOCgtLi0BCgoKDQ0NDg0NDisdHxkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOkA2AMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADUQAAICAQIEBAQFAwQDAAAAAAABAgMRBBIFITFREyJBcWFykbEygaHB0RQjUgZCguEVU6L/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGM5qKy2ku7OTXcQUPKvNLt29yGuunN5k2/h6ICVu4tBfhTl8eiNS4u/WH/ANf9EWAJyrilb65j79PqdsZJrK5+xVjdp9TOD8r/ACfQCyA49LxCE+T8suz9fY7AAAAAAAAAAAAAAAAAAAAAAAAABya3Wxr5dZPov5Pdfq1XHvJ9F+5ASk2231by33YGV1m6Tk/XmYAFQAAAAACV4dxB8oTftL9mRQAtQOHhWp3R2vrH9UdxFAAAAAAAAAAAAAAAAAAADBq1MsQk+0X9gK/qrXOcpfHl7GoIFQAAAAAAAAAAHXwyzbYu0vK/2J8rFDxOPzR+5ZyKAAAAAAAAAAAAAAAAAAAatWvJL5X9jaeNJ8n6gVZAzthtk49m0YFQAAAAAAAAAAGyheePzIsxW9Iv7kPmRZCKAAAAAAAAAAAAAAAAAAAAAKxb+KXzP7mBt1MGpyT7v7moqAAAAAAAAAAA6eHNeLH3f2LCVzQxzZD5k/oWMigAAAAAAAAAAAAAAAAAAAACF4zDE0+6+xHkrxxPy8uXPn2IoqAAAAAAAAAAA7uDQzY3/jH7snCH4K3uly/2rn+ZMEUAAAAAAAAAAAAAAAAAAAAAYW1qUXF+qaK1ZBptPqm0Wgi+MaXP9xdVjcvh3AiQAVAAAAAAM6a3KSivV/oYEvwfT4XiPlnkvYKkKq1FJJdDMAgAAAAAAAAAAAAAAAAAAAAAB40egCrzWG12bX6mJnb+KXzS+5gVAAAAAB7FZaXdpfqWeEUkkuiWCs1fij80fuWgigAAAAAAAAAAAAAAAAAAAAAAAABr1FqhFyfRAVu38Uvml9zE9bzzfqzwqAAAAADKr8Ufmj9y0FWT7Fl09qnFSXqiK2AAAAAAAAAAAAAAAAAAAAYzsjFZbS9wMg2Rmo4rFcoLPxfQjr9TZP8AFJ+y5L6AS+o4jXHp5n2XT6kTqdXOx8+novRGgFQAAAAAAAAN+l1U63lc0+qfRmgATun4jXLk/K+z/k7UVU3UaqyH4W8dn0+hFWQEbp+LRfKa2/FdCQrsjJZi018AMgAAAAAAAADxvAHphbbGKzJpL4kfq+KJcoc3/l6L27kXbbKTzJ59wJHU8W9IL/k/4I622Uucm37mAKgAAAAAAAAAAAAAAAAAABnVbKLzF4fw/cwAErp+Lf8AsX/JfuiSqtjJZi018CsGdVsovMW0/h6+5FWcEZpOKJ8prD/yXT8+xJJp9OYHoAA13WxgsyeEiD1mtlZy6R7fyZ8V1G6e30h+rOIAACoAAAAAAAAAAAAAAAAAAAAAAAAAAAdWj10q36uPbt7HKALPVZGSTi8pghuFajbPb/tl+jPCK45vLb7tv9TwtGyPZfQbI9l9AKuC0bI9l9Bsj2X0Aq4LFqdRRUk7Z1Vp9HZJQT9smmviGlcpR31qUHNSjKSUls5yeOyXPIEGCc1fEdLU4xssri5zUFuaWJOEprOemVFmFHFtFOEZq6nbJtJucVmSeGuvUCGBPWa7SxclK2lODxJOcU4PtLnyfNfU1riuj3Sj4tK2QhY25xUdk87ZZ7PHX4oCFBPvXaVKMnbTiedj3xxPDw9rzz/IabVU2couO5OxbXhT/t2OuTx1xuT5gQAJ963SpyTtpThzmnOOYLOPN258uZjPiOjiouV1CU1JxbsilNRaTcXnnhyj9UBBAsenupsy65V2JPDcGpJPs8epsUY+iTxy9mBWAS9nFaYSnGyEq3CErPNFPfCMlFyjtb9WuTw+ZlbxGMa/ElRao+ZvyxbhFLLlLEumAIYExDiunc1BJ85xr37Vs8SVasUM9c7Wn09TXTxmicJTjXY1GuNqWxbrKpZxZBZ5xeMgRYJnU8RqhXG11zdcoxk5ximoRljDks59fRMyhrq5TnCFc5+HlSlGK270suC55b/LHxAhAT2h1ddu5KEoSrajKFkVGUW1ldM+jOrZHsvoBVwWjZHsvoNkey+gFYjLDT7NAs+yPZfQAZAAAAAI7i/Dp3KOyyNUo7sWbHKcMrGYNSjh++TTqeCKaa3Y3W3zbUebVtM69v5b0/yJcAQv/hrt8bXfBzhbXNf2WoYjROppx388qyTznk0uTNNn+npy25trlshZUlOmTi6pSUsSSsWZZXXo89CwBARd/CcwnGMopzv8VOUG1F4SWNsovKx1yaLOC2tLN6b2aXMp1uUp26ee9Tfm6N5zH9SbAEPRwe2EoTjbDevG37qW4SVtkZvZHf5MOK9We8O4POiVjrtWLbLLJKcHJ7p3Ofle7ksS24/Pl0JcAQz4NZslWro7PF8avNTc4z8bxcTe7zx3emF7muf+n3JPdYnKVOtrbUMJT1M65borLwo+H0y+vUnQByaTSeHOySfKzZyxjbtjtMOHcJooldOqLjLUW+LZmTluntSyk+nJLkjuAEFqeAStlbKyyteLVKvFVHhp5nGSlbmT3tbcenV9zGfAbtjhG6qMZ3Oyyv8Ap34U47UlXGKsW1Zim+bzl9yfAERfwXffC2Tq2wlGW2NTjOU4w2rMt7WF229lk16bglsKpQV0HL+nhpq5SpbUKoZS3xU/NLD6px6dPQmwBC6ng11lEKJ20tRgouf9O9+UsKdTc3slj15nkeAuN0rYWQi3O2yL8LNm+yOMTnu80E3u24XNLnyJsAR/BtDZTBxsnCyUpbpThW6nOT6uSlOWXn2wSAAAAAAAB//Z'
            await newUser.save() 
            const token = jwt.sign({userData : newUser }, 'webtoonclone')
            res.header('auth-token', token).send(token)
        }
    },

    getUser : async (req, res, next ) => {
        const { userId } = req.params
        const user = await User.findById(userId)
        res.status(200).json(user)
    },

    editUser : async (req, res , next) => {
        const { userId } = req.params
        if (!req.file) {
            const user = await User.findByIdAndUpdate(userId, {fullname : req.body.fullname}, {new : true})
            res.status(202).send(user)
        } 
        else {
            // const path = require('path')
            // const remove = path.join(__dirname , '..', '..', 'public')
            // const relPath = req.file.path.replace(remove, '')
            // //const pathFinal = "webtoondb.herokuapp.com" + relPath
            const user = await User.findByIdAndUpdate(userId, {fullname : req.body.fullname, profilepicture : req.file.location}, {new : true, useFindAndModify: false})
            res.status(202).send(user)
        }
    }
}
