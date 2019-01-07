const express = require('express');
const router = express.Router();
const async = require('async');
const db = require('../../db/package.js');
const query = require('../../config/node-mysql.js');
const commonuse = require('../../db/commonuse.js');
const fun = require('../../library/fun.js');
const data = require('../../config/env.js').data;

/* 文章列表 */
router.get('/article/list', async function(req,res,next){

    var params = req.query;
    var limit = Number(params.limit);
    if(params.page==1) {
        var page = 0;
    }else {
        var page = limit * (params.page-1);
    }
    

    function selectList() {
        return new Promise((resolve,reject)=>{
            var sql = "select * from th_article order by create_time DESC limit ?,?";
            query(sql,[page,limit],function(err,vals,fields){
                if(err) {
                    reject(err);
                }else {
                    resolve(vals);
                }
            })
        })
    }

    function selectCount() {
        return new Promise((resolve,reject)=>{
            var sql = "select count(*) as count from th_article";
            query(sql,'',function(err,vals,fields){
                if(err) {
                    reject(err);
                }else {
                    resolve(vals[0].count);
                }
            })
        })
    }

    let list_err,vals,count_err,count;
    let awaitList = selectList();
    let awaitCount = selectCount();
    [list_err,vals] = await fun.to(awaitList);
    [count_err,count] = await fun.to(awaitCount);
    if(list_err) {
        data['code'] = '400';
        data['body'] = err;
    }else {
        data['code'] = '200';
        data['body'] = {
            list: vals,
            count: count
        };
    }
    res.json(data);

})

module.exports = router;