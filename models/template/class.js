var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../../db/package.js');
var query = require('../../config/node-mysql.js');
const commonuse = require('../../db/commonuse.js');


/* GET 一级分类列表页 page */
router.get('/first',function(req,res,next){
    res.render('class/first/index',{})
})

/* GET 二级分类列表页 page */
router.get('/second',function(req,res,next){
    res.render('class/second/index',{})
})

/* GET 添加/编辑一级分类 page */
router.get('/first/details',function(req,res,next){
    let params = req.query;
    async.parallel([
        function(callback) {
            if(params.hasOwnProperty('id')) {  //编辑
                db.find('th_classify_first', params, function(err, vals) {
                    if (err) {
                        callback('err', err);
                    } else {
                        callback(null, vals);
                    }
                })
            }else {  //添加
                callback(null, {});
            }
        }
    ],function(err,result){
        if(err) {
            res.render('error/error', {
                error: JSON.stringify(result)
            })
        }else {
            res.render('class/first/details',{
                first_msg: result[0]
            })
        }
    })
})

/* GET 添加/编辑二级分类 page */
router.get('/second/details',function(req,res,next){
    let params = req.query;
    async.parallel([
        function(callback) {
            commonuse.classify_first_list(callback);
        },
        function(callback) {
            if(params.hasOwnProperty('id')) {  //编辑
                db.find('th_classify', params, function(err, vals) {
                    if (err) {
                        callback('err', err);
                    } else {
                        callback(null, vals);
                    }
                })
            }else {  //添加
                callback(null, {});
            }
        }
    ],function(err,result){
        if(err) {
            res.render('error/error', {
                error: JSON.stringify(result)
            })
        }else {
            res.render('class/second/details',{
                first_msg: result[0],
                second_msg: result[1]
            })
        }
    })
})

/* GET 新增/编辑一级分类 */
router.post('/first/handle',function(req,res,next){
	let params = req.body;
	async.parallel([
		function(callback) {
			let insertObj = params;
			if(insertObj.id!='') {  //编辑
                let obj = {
                    id: insertObj.id
                }
                delete insertObj['id'];
                db.update('th_classify_first',insertObj,obj,function(err,vals){
                    if(err) {
                        callback('err',err);
                    }else {
                        callback(null,vals);
                    }
                })
			}else {  //新增
				delete insertObj['id'];
                let nowDate = Date.parse(new Date());
                insertObj.status = 1;
                insertObj.create_time = nowDate;
                db.insert('th_classify_first',insertObj,function(err,vals){
                	if(err) {
                        callback('err',err);
                	}else {
                        callback(null,vals);
                	}
                })
			}
		}
	],function(err,result){
         if (err) {
            res.render('error/error', {
                error: JSON.stringify(result)
            })
        } else {
            res.redirect('/class/first');
        }
	})
})

/* GET 新增/编辑二级分类 */
router.post('/second/handle',function(req,res,next){
    let params = req.body;
    async.parallel([
        function(callback) {
            let insertObj = params;
            if(insertObj.id!='') {  //编辑
                let obj = {
                    id: insertObj.id
                }
                delete insertObj['id'];
                db.update('th_classify',insertObj,obj,function(err,vals){
                    if(err) {
                        callback('err',err);
                    }else {
                        callback(null,vals);
                    }
                })
            }else {  //新增
                delete insertObj['id'];
                let nowDate = Date.parse(new Date());
                insertObj.status = 1;
                insertObj.create_time = nowDate;
                insertObj.article_num = 0;
                db.insert('th_classify',insertObj,function(err,vals){
                    if(err) {
                        callback('err',err);
                    }else {
                        callback(null,vals);
                    }
                })
            }
        }
    ],function(err,result){
         if (err) {
            res.render('error/error', {
                error: JSON.stringify(result)
            })
        } else {
            res.redirect('/class/second');
        }
    })
})


module.exports = router;