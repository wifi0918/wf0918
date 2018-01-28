'use strict';

class Admin {
    constructor() {}
    home(req, res, next) {
        res.render('home');
    }
    about(req, res, next) {
        if (!req.session) {
            res.redirect('/');
        }
        res.render('about');
    }
    project(req, res, next) {
        res.send(req.params.type);
    }
    login(req, res, next) {
        res.render('login');
    }
    register(req, res, next) {
        res.render('register');
    }
    doPostRegister(req, res, next) {
        const body = req.body;
        try {
            console.log(body);
            if (!body) {
                throw { errorCode: 406, message: '用户信息无效' };
            }
            if (!body.mobile) {
                throw { errorCode: 406, message: '手机号无效' };
            }
            if (!body.password) {
                throw { errorCode: 406, message: '密码无效' };
            }
            // User.update({ mobile: req.body.mobile }, { password: req.body.password }, { upsert: true }, function(err, data) {
            //     if (err) {
            //         return res.redirect('/register');
            //     }
            //     req.session.user = {
            //         mobile: req.body.mobile,
            //         password: req.body.password
            //     }
            //     return res.redirect('/');
            // })
            // req.session = {
            //     mobile: req.body.mobile,
            //     password: req.body.password
            // }
            // console.log('session--222--', req.session);
            return res.render('', {});

        } catch (error) {
            return res.status(error.errorCode || 500).send(error);
        }

    }

    doPostLogin(req, res, next) {
        try {
            const body = req.body;
            console.log(body);
            if (!body) {
                throw { errorCode: 406, message: '用户信息无效' };
            }
            if (!body.mobile) {
                throw { errorCode: 406, message: '手机号无效' };
            }
            if (!body.password) {
                throw { errorCode: 406, message: '密码无效' };
            }
            req.session = {
                mobile: req.body.mobile,
                password: req.body.password
            }
            res.render('/', {});

        } catch (error) {
            return res.status(error.errorCode || 500).send(error);
        }

    }




}

module.exports = new Admin();