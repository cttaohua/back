var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../../db/package.js');
var query = require('../../config/node-mysql.js');
const commonuse = require('../../db/commonuse.js');

/* GET 后台管理员 page */
router.get('/administrator', function(req, res, next) {

    res.render('user/administrator/index', {

    })

});

/* GET 后台管理员添加/编辑 page */
router.get('/administrator/details', function(req, res, next) {
    var params = req.query;
    if (params.hasOwnProperty('id')) { //编辑
        var type = 'edit';
    } else { //新增
        var type = 'add';
    }
    async.parallel([
        function(callback) {
            commonuse.roleList(callback);
        },
        function(callback) {
            if (type == 'add') {
                callback(null, {});
            } else {
                db.find('th_user_admin', params, function(err, vals) {
                    if (err) {
                        callback('err', err);
                    } else {
                        callback(null, vals);
                    }
                })
            }
        }
    ], function(err, result) {
        if (err) {
            res.render('error/error', {
                error: result
            })
        } else {
            res.render('user/administrator/details', {
                roleList: result[0],
                user_msg: result[1]
            })
        }
    })

});


/* GET 角色管理 page */
router.get('/role', function(req, res, next) {

    async.parallel([
        function(callback) {
            commonuse.roleList(callback);
        }
    ], function(err, result) {
        if (err) {
            res.render('error/error', {
                error: result
            })
        } else {
            res.render('user/role/index', {
                roleList: result[0]
            })
        }
    })


});

/* Get 登录 page */
router.get('/login',function(req,res,next){
    res.render('user/login/login', {

    })
})


/* 新增/编辑后台管理员 */
router.post('/handleAdmin', function(req, res, next) {

    var params = req.body;

    async.parallel([
        function(callback) {
            var insertObj = params;
            if (insertObj.id != '') { //编辑
                let obj = {
                    id: insertObj.id
                }
                delete insertObj['id'];
                db.update('th_user_admin',insertObj,obj,function(err,vals){
                    if(err) {
                        callback('err',err);
                    }else {
                        callback(null,vals);
                    }
                })
            } else { //新增
                delete insertObj['id'];
                var nowDate = (Date.parse(new Date()));
                insertObj.status = 1;
                insertObj.create_time = nowDate;
                db.insert('th_user_admin', insertObj, function(err, vals) {
                    if (err) {
                        callback('err', err);
                    } else {
                        callback(null, vals);
                    }
                })
            }
        }
    ], function(err, result) {
        if (err) {
            res.render('error/error', {
                error: result
            })
        } else {
            res.redirect('/user/administrator');
        }
    })


});





module.exports = router;