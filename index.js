// import express from 'express';
var express = require('express');

// var config = require('config-lite');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var connectMongo = require('connect-mongo');
let bodyParser = require('body-parser');
var mongoose = require('mongoose');
// import db from './mongodb/db';
// import config from 'config-lite';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import connectMongo from 'connect-mongo';
var http = require('http');
var fs = require('fs');
var User = require("./model/user.js");
var app = express();
console.log('wf1111');
console.log('wf222');
console.log('wf333');
app.allow_url = {
    domainName: 'localhost',
    port: 3000
};
var opts = {
    server: {
        socketOptions: { keepAlive: 1 }
    }
}

// to setting default port
app.set('port', process.env.PORT || 3000);

// const MongoStore = connectMongo(session);
mongoose.connect('test', opts);
app.use(bodyParser.json());
app.use(cookieParser());
let httpSession = require('./routes/session');
app.use(httpSession.createSession(app.allow_url));

/* 
  to add handlerbars settting start 
 */
var handlebars = require('express3-handlebars').create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
// to add handlerbars settting end

/* 
 to to the static setting 
 两种方法都可以
 */
// app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));

let router = require('./routes/home');
app.use(router);


// to do 404 html
app.use(function(req, res, next) {
    /* 
     res.status:  设置http状态吗，成功默认是200
     res.redirect: 默认重定向状态码是302，重定向到浏览器
     res.cookie:设置或者清楚客户端的cookie
     res.send/res.json:向客户端发送相应以及可选的状态码
     res.set(设置响应头)
     res.type:用于设置content-type头信息
     res.format:根据不同的请求头发送不同的内容
     res.locals/res.render:渲染视图
     */
    // res.type("text/plain");
    res.status(404);
    res.render('404');
})

// to do 500 html
app.use(function(err, req, res, next) {
    // res.type('text/plain');
    res.status(500);
    res.render('500');
})
console.log('bug here');
app.listen(app.get('port'), function() {
    console.log('express started in ' + app.get('env') + ' ' + app.get('port'));
})