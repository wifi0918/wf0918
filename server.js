// var http = require('http');
// var fs = require('fs');
// var express = require('express');
// var app = express();
// // http.createServer(function(req, res) {
// // res.writeHead(200, { 'Content-type': 'text/html' });

// // fs.readFile(__dirname + '/node.js', function(err, data) {
// //     if (err) {

// //     } else {
// //         res.end(data);

// //     }
// // })

// // }).listen(3000);
// // console.log(__dirname);
// // console.log('server is running at localhost 3000');

// // 没有挂载路径的中间件，应用的每个请求都会执行该中间件
// app.use(function(req, res, next) {
//     console.log('\n\nALLWAYS');
//     next();
// })

// app.get('/a', function(req, res) {
//     console.log('/a:路由终止');
//     res.send('a');
// })
// app.get('/a', function(req, res) {
//     console.log('/a:永远不会被调用');
// })
// app.get('/b', function(req, res, next) {
//     console.log('/b:路由未终止');
//     next();
// })
// app.use(function(req, res, next) {
//     console.log('SOMETIMES');
//     next();
// })
// app.get('/b', function(req, res, next) {
//     console.log('/b part2 :抛出错误');
//     throw new Error('b fail');
// })
// app.use('/b', function(err, req, res, next) {
//     console.log('/b 检测到错误并传递');
//     next(err);
// })


// /* 
// 如果需要在中间件栈中跳过剩余中间件，调用 next('route') 方法将控制权交给下一个路由。 
// 注意： next('route') 只对使用 app.VERB() 或 router.VERB() 加载的中间件有效。
// */
// app.use('/user/:id', function(req, res, next) {
//     console.log('Request URL:', req.originalUrl);
//     next();
// }, function(req, res, next) {
//     console.log('Request Type:', req.method);
//     next();
// });
// app.get('/user/:id', function(req, res, next) {
//     // 如果 user id 为 0, 跳到下一个路由
//     if (req.params.id == 0) next('route');
//     // 否则将控制权交给栈中下一个中间件
//     else next(); //
// }, function(req, res, next) {
//     // 渲染常规页面
//     res.send('regular');
// });
// // 处理 /user/:id， 渲染一个特殊页面
// app.get('/user/:id', function(req, res, next) {
//     res.send('special');
// });
// // 路由处理器是中间件
// app.get("/foo/:name/:age", function(req, res, next) {
//     if (Math.random() < 0.33) return next();
//     res.send("red" + req.params.name + req.params.age);
// }, function(req, res, next) {
//     if (Math.random() < 0.5) return next();
//     res.send("blue" + req.params.name + req.params.age);
// }, function(req, res, next) {
//     res.send("green" + req.params.name + req.params.age);
// })
// app.use(function(err, req, res, next) {
//     console.log('检测到未处理的错误:' + err.message);
// })
// app.use(function(req, res) {
//     console.log('未处理的路由');
//     res.send('404 not found');
// })
// app.listen(3000, function() {
//     console.log('express started in ' + app.get('env'));
//     console.log('app is running at port 3000');
// })

// const cluster = require('cluster');
// const http = require('http');
// const numCPUs = require('os').cpus().length;

// if (cluster.isMaster) {
//     console.log(`主进程 ${process.pid} 正在运行`);
//     console.log(numCPUs);

//     // 衍生工作进程。
//     for (let i = 0; i < numCPUs; i++) {
//         cluster.fork();
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`工作进程 ${worker.process.pid} 已退出`);
//     });
// } else {
//     // 工作进程可以共享任何 TCP 连接。
//     // 在本例子中，共享的是一个 HTTP 服务器。
//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('你好世界\n');
//     }).listen(8000);

//     console.log(`工作进程 ${process.pid} 已启动`);
// }