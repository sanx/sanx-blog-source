var koa = require('koa');
var serve = require('koa-static');
var mount = require('koa-mount');

var app = koa();
var approot = __dirname;

app.use(mount('/', serve(approot + '/_site')));

module.exports = app;
//module.exports = [serve('_site')];
