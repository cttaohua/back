//正式
const mysqlConfig = {
	host: 'localhost',
	user: 'root',
	password: '123456',
	database: 'taohua'
}
const hosts = 'http://taohuayuanskill.com:3000/';
const setDefaults = {
	cache: true
}


//测试
// const mysqlConfig = {
// 	host: '47.94.227.198',
// 	user: 'root',
// 	password: 'Lh456123',
// 	database: 'taohua'
// }
// const hosts = 'http://localhost:3000/';
// const setDefaults = {
// 	cache: false
// }

module.exports = {
	mysqlConfig: mysqlConfig,
	setDefaults: setDefaults,
	hosts: hosts
}