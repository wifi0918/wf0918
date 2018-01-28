'use strict'

var session = require('express-session');
var uid = require('uid-safe').sync;
var RedisStore = require('connect-redis');
var config = require('config');

class HTTPSession {
    constructor() {}

    static getSession_id_prefix(option) {
        if (option && option.domainName) {
            return 'chanquan.portal.' + option.domainName + '.sid';
        }
        return 'chanquan.portal.sid';
    }

    static get DEFAULT_TIMEOUT() {
        // session expiration time 20 mins
        return 20 * 60 * 1000;
    }

    getSession_id_prefix(option) {
        return HTTPSession.getSession_id_prefix(option);
    }

    getCookieConf(option) {

        if (option && option.domainName) {
            var cookieConf = {
                domain: option.domainName,
                maxAge: HTTPSession.DEFAULT_TIMEOUT
            };
            return cookieConf;
        }
        return {};
    }

    getSessionStore() {
        if (
            process.env.NODE_ENV === 'development'
        ) {
            return null;
        }

        var SessionStore = new RedisStore(session);
        var host = '80';
        var port = 3000;
        var redisStore = new SessionStore({ host: host, port: port, db: 1 });
        return redisStore;
    }

    getSessionSecret(option) {
        if (option && option.domainName) {
            var secret = option.domainName;
            if (option.port)
                secret = option.domainName + ':' + option.port;
            return secret;
        }
        return 'V39Y7FtnTIKM4y5O4M9r95sno85MZOa';
    }

    createSession(option) {
        return session({
            secret: this.getSessionSecret(option),
            resave: false,
            saveUninitialized: true,
            name: this.getSession_id_prefix(option),
            genid: function() {
                return this.getSession_id_prefix(option) + ':' + uid(24);
            }.bind(this),
            store: this.getSessionStore(),
            cookie: this.getCookieConf(option),
            rolling: true
        });
    }

}

var httpSession = new HTTPSession();
module.exports = exports = httpSession;