const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../../db/package.js');
const query = require('../../config/node-mysql.js');
const commonuse = require('../../db/commonuse.js');
const fun = require('../../library/fun.js');


/* GET 广告管理 page */
router.get('/advertising',function(req,res,next){
    res.render('advert/advertising/index',{})
})

/* GET 广告位管理 page */
router.get('/position',function(req,res,next){
    res.render('advert/position/index',{})
})

/* GET 添加/编辑广告位 page */
router.get('/position/details',function(req,res,next){
	let params = req.query;
    async.parallel([
        function(callback) {
            if(params.hasOwnProperty('id')) {  //编辑
                db.find('th_ad_position', params, function(err, vals) {
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
            res.render('advert/position/details',{
                p_msg: result[0]
            })
        }
    })
})

/* GET 添加/编辑广告 page */
router.get('/advertising/details',function(req,res,next){
    let params = req.query;
    async.parallel([
        function(callback) {
            if(params.hasOwnProperty('id')) {  //编辑
               db.find('th_ad_img',params,function(err,vals){
                 if (err) {
                        callback('err', err);
                    } else {
                        callback(null, vals);
                    }
               })
            }else {
                callback(null,{
                    blank: 1,
                    status: 1
                });
            }
        },
        function(callback) {
            commonuse.position_list(callback);
        }
    ],function(err,result){
         if(err) {
            res.render('error/error', {
                error: JSON.stringify(result)
            })
        }else {
            res.render('advert/advertising/details',{
                msg: result[0],
                position_msg: result[1]
            });
        }
    })
})

/* GET 添加/编辑广告位处理逻辑 */
router.post('/position/handle',function(req,res,next){
    var params = req.body;
    async.parallel([
		function(callback) {
			let insertObj = params;
			if(insertObj.id!='') {  //编辑
                let obj = {
                    id: insertObj.id
                }
                delete insertObj['id'];
                db.update('th_ad_position',insertObj,obj,function(err,vals){
                    if(err) {
                        callback('err',err);
                    }else {
                        callback(null,vals);
                    }
                })
			}else {  //新增
				delete insertObj['id'];
                let nowDate = Date.parse(new Date());
                insertObj.create_time = nowDate;
                db.insert('th_ad_position',insertObj,function(err,vals){
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
            res.render('advert/position/index',{})
        }
	})
})

/* GET 添加/编辑广告处理逻辑 */
router.post('/advertising/handle',function(req,res,next){
    let params = req.body;
    async.parallel([
        function(callback) {
           let insertObj = {};
           insertObj.ad_name = params.ad_name;
           if(params.ad_link) {
             insertObj.ad_link = params.ad_link;
           }
           if(insertObj.ad_img) {
             insertObj.ad_img = fun.base64(params.ad_img,'ad',params.originalImg);
           }
           if(params.sort) {
             insertObj.sort = params.sort;
           }
           insertObj.position_id = params.position_id;
           insertObj.blank = params.blank;
           insertObj.status = params.status;
           if(params.id!='') {  //编辑
               db.update('th_ad_img',insertObj,{id:params.id},function(err,vals){
                  if(err) {
                    callback('err',err);
                   }else {
                    callback(null,vals);
                   }
               })
           }else {  //新增
               let nowDate = Date.parse(new Date());
               insertObj.create_time = nowDate;
               db.insert('th_ad_img',insertObj,function(err,vals){
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
            res.render('advert/advertising/index',{})
        }
    })
})



module.exports = router;