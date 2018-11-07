var express = require('express');
var router = express.Router();
var async = require('async');
const db = require('../../db/package.js');
const query = require('../../config/node-mysql.js');
const data = require('../../config/env.js').data;

/* 一级分类列表 */
router.get('/class_first/list', function(req, res, next) {
    async.parallel([
        function(callback) {
            let sql = "select * from th_classify_first";
            query(sql, '', function(err, vals) {
                if (err) {
                    callback('err', err);
                } else {
                    callback(null, vals);
                }
            })
        }
    ], function(err, result) {
        if (err) {
            data.code = 400;
            data.body = JSON.stringify(result[0]);
        } else {
            data.code = 200;
            data.body = result[0];
        }
        res.json(data);
    })
})

/* 二级分类列表 */
router.get('/class_second/list', function(req, res, next) {
    async.parallel([
        function(callback) {
            let sql = "select a.*,b.value as parent_value from th_classify a left join th_classify_first b on b.id=a.parent_id";
            query(sql, '', function(err, vals) {
                if (err) {
                    callback('err', err);
                } else {
                    callback(null, vals);
                }
            })
        }
    ], function(err, result) {
        if (err) {
            data.code = 400;
            data.body = JSON.stringify(result[0]);
        } else {
            data.code = 200;
            data.body = result[0];
        }
        res.json(data);
    })
})


module.exports = router;