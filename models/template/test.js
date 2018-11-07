var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../../db/package.js');
var query = require('../../config/node-mysql.js');

/* GET 测试 page */
router.get('/', function (req, res, next) {
    
// 	var sql = "insert into th_user set account=?,nick=?,password=?,create_time=?";
// 	var sqlarr = ['18410150050','淘气','123456','1538126544000'];
 var sql = "select * from th_user where id=?";
	var sqlarr = ['10000'];
//     var sql = "update th_user set nick=?,account=? where id=?";
// 	var sqlarr = ['小淘气','18311177853','10001'];
	query(sql,sqlarr,function(err,vals,fields){
		res.render('test/sql.html',{
			sql: sql,
			err: JSON.stringify(err),
			val: JSON.stringify(vals)
		})
	})
    
});



module.exports = router;