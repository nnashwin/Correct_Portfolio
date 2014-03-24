var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');


showMain = function(req, res) {
	res.render('main');
};

module.exports = function() {
	app.get('/', this.showMain);
	return app;
}();