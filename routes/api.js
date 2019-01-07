module.exports = function(app) {
	const user = require('../models/api/user.js');
	const classify = require('../models/api/class.js');
	const advert = require('../models/api/advert.js');
	const article = require('../models/api/article.js');
	app.use('/api',user);
	app.use('/api',classify);
	app.use('/api',advert);
	app.use('/api',article);
}
