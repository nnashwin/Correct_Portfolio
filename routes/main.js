var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');


showMain = function(req, res) {
	res.render('main');
};

showAbout = function(req, res) {
  res.render('about');
};

module.exports = function() {
	app.get('/', this.showMain);
  app.get('/about', this.showAbout);
	return app;
}();