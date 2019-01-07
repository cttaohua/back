const fs = require('fs');
const os = require('os');
const random = require('./tool.js').random;
const env = require('../bin/config.js');

//base64新建图片返回图片路径
function base64(str,path,origin) {
    var base64Data = str.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	var uploadUrl = "uploadImg/"+path+"/" + random(8) + ".png";
	fs.writeFile("public/" + uploadUrl, dataBuffer, function(err) {});
	if(origin!='') {  //如果之前有照片，删除之前的
		let index = origin.indexOf('uploadImg');
		let absolute = origin.slice(index,origin.length);
		fs.unlink("public/" + absolute,function(err) {});
	}
	return env.hosts + uploadUrl;
}
//获取系统内存占用比和CPU使用率
function getCpurate() {
	let total = os.totalmem()/1024/1024; //系统总内存 M
	let free = os.freemem()/1024/1024;  //空闲内存 M
	let occupy = total - free;
	let fifteen = os.loadavg()[2];  //cpu 使用率
    let memory = Number(Number(occupy/total).toFixed(4)*100).toFixed(2);
    let cpu = Number(Number(fifteen/1).toFixed(4)*100).toFixed(2);
    return [memory,cpu];
}
//async await 中间函数
function to(promise) {
	return promise.then(data => {
	   return [null, data];
	})
	.catch(err => [err]);
 }
module.exports = {
	base64,
	getCpurate,
	to
}