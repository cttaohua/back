var data = {  //接口返回
	code: 0,
	body: ''
}
//正式
var mysqlConfig = {
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'taohua'
}

//测试
// var mysqlConfig = {
// 	host: '47.94.227.198',
// 	user: 'root',
// 	password: 'Lh456123',
// 	database: 'taohua'
// }

module.exports = {
	data: data,
	mysqlConfig: mysqlConfig
}