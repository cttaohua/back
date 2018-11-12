var express = require('express');
var router = express.Router();
var async = require('async');
const db = require('../../db/package.js');
const query = require('../../config/node-mysql.js');
const data = require('../../config/env.js').data;

/* 后台管理员列表 */
router.get('/adminList', function(req, res, next) {
    async.parallel([
        function(callback) {
            let sObj = {
                status: '1'
            }
            let s_sql = "select a.*,b.role_name from th_user_admin a left join th_role b on b.id=a.role_id where a.status=1";
            query(s_sql, [], function(err, vals) {
                if (err) {
                    callback('err', JSON.stringify(err));
                } else {
                    callback(null, vals);
                }
            })
        }
    ], function(err, result) {
        if (err) {
            data.code = 400;
            data.body = result[0];
        } else {
            data.code = 200;
            data.body = result[0];
        }
        res.json(data);
    })

});

/* 登录接口 */
router.post('/login', function(req, res, next) {
    var params = req.body;
    async.parallel([
        function(callback) {
           let s_sql = "select * from th_user_admin where nick = ? and password = ?";
           query(s_sql,[params.username,params.password],function(err,vals){
               if(err) {
                callback('err',JSON.stringify(err));
               }
               else {
                if(vals.length) {
                    callback(null,vals);
                }else {
                    callback('err','用户名或密码不正确');
                }
               }
           })
        }
    ],function(err,result) {
        if(err) {
            data.code = 400;
            data.body = result[0];
        }else {
            data.code = 200;
            data.body = result[0];
            //将用户信息存入cookie中 
            var user_msg = JSON.stringify(result[0][0]);
            var user_base = new Buffer(user_msg).toString('base64');
            res.cookie('user_msg',user_base,{
                maxAge: 30*24*60*60*1000
            });
        }
        res.json(data);
    })
})

module.exports = router;