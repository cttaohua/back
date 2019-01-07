module.exports = function(app) {
	var home = require('../models/template/home.js');
	var user = require('../models/template/user.js');
	var classify = require('../models/template/class.js');
	var advert = require('../models/template/advert.js');
	var article = require('../models/template/article.js');
	var test = require('../models/template/test.js');
	//验证登录状态
	app.use(function (req, res, next) {
	    var user_msg;
	    if (req.cookies.user_msg) {
	        user_msg = JSON.parse(new Buffer(req.cookies.user_msg, 'base64').toString());
	        req.userInfo = user_msg;
	        next();
	    }else {
			res.render('user/login/login',{});
		}
	})
	app.use('/',home);
	app.use('/user',user);
	app.use('/class',classify);
	app.use('/advert',advert);
	app.use('/article',article);
	app.use('/test',test);
}
