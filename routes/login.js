var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');


authLogin = function(req, res) {
	if (req.body.username === "ttymed" && req.body.password === "I") {
		req.session.admin = req.body.username;
		console.log(req.session.admin);
		// data = {
		// 	redirect: '/projects',
		// 	admin: req.session.admin,
		// }	
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