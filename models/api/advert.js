var express = require('express');
var router = express.Router();
var async = require('async');
const db = require('../../db/package.js');
const query = require('../../config/node-mysql.js');
const data = require('../../config/env.js').data;

/* 广告位列表 */
router.get('/ad_position/list', function(req, res, next) {
    async.parallel([
        function(callback) {
            db.select('th_ad_position', '', function(err, vals) {
                if (err) {
                    callback('err', 1);
                } else {
                    callback(null, vals);
                }
            })
        }
    ], function(err, result) {
        if (err) {
            data.code = 400;
            data.body = '查询失败';
        } else {
            data.code = 200;
            data.body = result[0];
        }
        res.json(data);
    })
})

/* 广告列表 */
router.get('/ad_advertising/list',function(req,res,next){
    async.parallel([
        function(callback) {
            let sql = "select a.*,b.ad_name as position_name from th_ad_img a left join th_ad_position b on b.id = a.position_id order by create_time DESC";
            query(sql,'',function(err,vals){
                 if(err) {
                    callback('err',1);
                 }else {
                    callback(null,vals);
                 }
            })
        }
    ],function(err,result){
        if (err) {
            data.code = 400;
            data.body = '查询失败';
        } else {
            data.code = 200;
            data.body = result[0];
        }
        res.json(data);
    })
})


module.exports = router;