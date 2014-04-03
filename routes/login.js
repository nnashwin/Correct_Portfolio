var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var crypt = require('sha1');

authLogin = function(req, res) {
	if (req.body.username === "ttymed" && crypt(req.body.password) === "CA73AB65568CD125C2D27A22BBD9E863C10B675D") {
		req.session.admin = req.body.username;
		console.log(req.session.admin);	
		res.redirect('/projects');
		console.log('req.session.admin'); 
	} else {
			res.send('Check yo credentials!  Foo!.');
		}
}

authLogout  = function(req, res) {
	req.session.destroy();
	res.redirect('/');
}

showLoginForm = function(req, res) {
	res.render('login-form');
};

module.exports = function() {
	app.get('/login', this.showLoginForm);
	app.post('/login', this.authLogin);
	app.get('/logout', this.authLogout);
	return app;
}();