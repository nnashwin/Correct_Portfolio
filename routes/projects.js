var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/portfolio');


var projectSchema = new mongoose.Schema({
	title: String,
	description: String,
	date_begun: String,
	date_ended: String,
	github: String,
	comments: String
}); // ends projectSchema

// instantiate a model to post projects

//  find all projects in the database
getAllProjects = function (req, res) {
	projectModel.find(function(err, projects) {
		res.render('projects', {
			projects: projects
		});
	});
} // ends getAllProjects


//	function to render create project page
showCreateProject = function (req, res) {
	if(req.session.admin) {
	console.log(req.session.admin);
	res.render('create-project');
	} else {
		res.send("Hey!  You're not Kingtak!")
	}
}; // ends showCreateProject page


// post function to create new project
createNewProject = function (req, res) {
	if(req.session.admin) {
	var new_title = req.body.title;
	var new_description = req.body.description;
	var new_date_begun = req.body.date_begun;
	var new_date_ended = req.body.date_ended;
	var new_github = req.body.github;
	var new_comments = req.body.comments;

	//create new job post from model
	var new_project = new projectModel({
		title: new_title,
		description: new_description,
		date_begun: new_date_begun,
		date_ended: new_date_ended,
		github: new_github,
		comments: new_comments
	}); //ends new_project variable

	new_project.save(function(err) {
		if (err) {
			console.log('error: could not save your project (fool)')
		}
	}); //saves new_project

	res.redirect('/projects');

} else {
	res.redirect('/projects');
	} 
}//ends createNewProject

// renders form by which user can edit a project
editProject = function(req, res) {
	projectModel.findOne({_id: req.params.id}, function(err, project) {
		if(err) return console.log('Project not found');
		console.log(project);
		res.render('edit-project', {project: project});
	});
}// ends edit Project

// post function to update a project
updateProject = function(req, res) {
	projectModel.findOne({_id: req.params.id}, function(err, project) {
		if(err) return console.log('Your project could not be updated.');
		project.title = req.body.title;
		project.description = req.body.description;
		project.date_begun = req.body.date_begun;
		project.date_ended = req.body.date_ended;
		project.github = req.body.github;
		project.comments = req.body.comments;
		project.save (function(err) {
			if(err) return console.log('Your project could not be saved.');
		});
		res.redirect('/projects');
	})
};

deleteProject = function(req, res) {
	projectModel.findOneAndRemove( {_id: req.params.id}, function(err, project) {
		if(err) return console.log('Project not found');
		res.redirect('/projects');
	});
};




var projectModel = mongoose.model('project', projectSchema);

module.exports = function() {
	app.get('/projects', this.getAllProjects);
	app.get('/projects/create-project', this.showCreateProject);
	app.post('/projects', this.createNewProject);
	app.get('/projects/:id', this.editProject);
	app.put('/projects/:id', this.updateProject);
	app.delete('/projects/:id', this.deleteProject);
	return app;
}();
