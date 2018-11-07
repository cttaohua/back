module.exports = function(app) {
	var home = require('../models/template/home.js');
	var user = require('../models/template/user.js');
	var classify = require('../models/template/class.js');
	var test = require('../models/template/test.js');
	//验证登录状态
	app.use(function (req, res, next) {
	    var user_msg;
	    if (req.cookies.userInfo) {
	        user_msg = JSON.parse(new Buffer(req.cookies.userInfo, 'base64').toString());
	        req.userInfo = user_msg;
	        next();
	    }else {
			res.render('user/login/login',{});
		}
	})
	app.use('/',home);
	app.use('/user',user);
	app.use('/class',classify);
	app.use('/test',test);
}
