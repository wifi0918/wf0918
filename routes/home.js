let express = require('express');
let Admin = require('../controller/admin/admin');
const router = express.Router();


router.get('/', Admin.home);
router.get('/about', Admin.about);
router.get('/project/:type', Admin.project);
router.get('/login', Admin.login);
router.get('/register', Admin.register);
router.post('/register', Admin.doPostRegister);
router.post('/login', Admin.doPostLogin);



/* 
  app.use是express添加中间件的一种方法
 */
// app.get("/", function(req, res) {
//     // res.send('hhaha');
//     res.render('home', {});
// })
// app.get("/about", function(req, res) {
//     if (!req.session) {
//         res.redirect(303, '/login');
//     }
//     res.render('about', {});
// })

// app.get('/login', function(req, res) {
//     res.render('login');
// })
// app.get('/register', function(req, res) {
//     res.render('register');
// })
console.log('learning git info');
console.log('conflict in master');
console.log('confilct in feature');

console.log('modify bug');
module.exports = router;