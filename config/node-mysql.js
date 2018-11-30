var mysql = require('mysql');
var mysqlConfig = require('../bin/config.js').mysqlConfig;

var pool = mysql.createPool(mysqlConfig);

var query = function (sql, params, callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            callback(err, null, null);
        } else {
            conn.query(sql, params, function (qerr, vals, fields) {
                //事件驱动回调
                callback(qerr, vals, fields);
            });
			//释放连接
			// conn.release();
			pool.releaseConnection(conn);
        }
    });
};

module.exports = query;
