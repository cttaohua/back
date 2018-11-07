var express = require('express');
var router = express.Router();
var async = require('async');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
		user_msg: req.userInfo
    });
});


/* GET console page. */
router.get('/console', function (req, res, next) {
    
    res.render('home/console.html', {
		
    });
});

//退出登录
router.get('/layout', function (req, res, next) {
     res.clearCookie('userInfo');
	 //页面重定向
	 res.redirect('/user/login');
})

module.exports = router;