const fs = require('fs');
const random = require('./tool.js').random;
const env = require('../config/env.js');
//base64新建图片返回图片路径
function base64(str,path,origin) {
    var base64Data = str.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	var uploadUrl = "uploadImg/"+path+"/" + random(8) + ".png";
	fs.writeFile("public/" + uploadUrl, dataBuffer, function(err) {});
	if(origin!='') {  //如果之前有照片，删除之前的
		let index = origin.indexOf('uploadImg');
		let absolute = origin.slice(index,origin.length);
		console.log(absolute);
		fs.unlink("public/" + absolute,function(err) {});
	}
	return env.hosts + uploadUrl;
}

module.exports = {
	base64
}