var express = require('express');
var router = express.Router();
var async = require('async');
var db = require('../../db/package.js');
var query = require('../../config/node-mysql.js');
const execTrans = require('../../db/execTrans.js');


/* GET 测试 page */
router.get('/', function(req, res, next) {
    
    function to(promise) {
       return promise.then(data => {
          return [null, data];
       })
       .catch(err => [err]);
    }

    function findClass() {
        return new Promise((resolve,reject)=>{
            let sql = "select * from th_classify where id=10001";
            query(sql,'',function(err,vals){
                if(err) {
                    reject(err);
                }else {
                    resolve(vals);
                }
            })
        })
    }
    function findFirst(id) {
        return new Promise((resolve,reject)=>{
            let sql = "select * from th_classify_first where id=?";
            query(sql,[id],function(err,vals){
                if(err) {
                    reject(err);
                }else {
                    resolve(vals);
                }
            })
        })
    }
     
    async function test() {
        let err,v1,err2,v2;
        [err,v] = await to(findClass());
        if(err) {
            console.log(err);
        }else {
            console.log(v);
        }
        [err2,v2] = await to(findFirst(v[0].parent_id));
        console.log(v2);
    }
    test();
    console.log('执行开始了-----------------');

    res.render('test/sql.html', {
        sql: '',
        err: '',
        val: ''
    })
});



module.exports = router;