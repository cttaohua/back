const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../../db/package.js');
const query = require('../../config/node-mysql.js');
const commonuse = require('../../db/commonuse.js');
const fun = require('../../library/fun.js');


/* GET 文章列表 page */
router.get('/index',function(req,res,next){
    res.render('article/index/index',{})
})



module.exports = router;