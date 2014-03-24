var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');


showProjects = function (req, res) {
	res.render('projects');
};

module.exports = function() {
	app.get('/projects', this.showProjects);
	return app;
}();
