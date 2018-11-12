var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var compression = require('compression');
// var logger = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
const env = require('./config/env.js');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

//默认设置
if(!env.setDefaults.cache) {
    swig.setDefaults(env.setDefaults); //模板设置为缓存/不缓存
}

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
//压缩
app.use(compression()); 
//处理大请求
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

//路由设置
apiRouter(app);
indexRouter(app);


module.exports = app;
