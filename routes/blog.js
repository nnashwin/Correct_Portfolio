var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');

// Schema for blog posts posted by author
var postSchema = new mongoose.Schema({
	title: String,
	content: String,
	description: String,
	created_at: {
		type: Date,
		default: Date.now
	}
});//schema end


//schema for blog comments posted by users
var commentSchema = new mongoose.Schema({
	name: String,
	email: String,
	url: String,
	comment: String
});//end schema

//instantiating models for both schemas
var postModel = mongoose.model('post', postSchema);
var commentModel = mongoose.model('comment', commentSchema);
//models instantiated


// show all posts in blog
showBlog = function(req, res) {
	postModel.find(function(err, posts) {
		res.render('blog', {
			posts: posts
		});
	});
} // ends showBlog

createNewBlog = function(req, res) {
	var new_title = req.body.title;
	var new_content = req.body.content;
	// var date = new Date();
	// date = date.toDateString();
	// console.log(date);
	//create new blog post from model
	var new_blog = new postModel({
		title: new_title,
		content: new_content,
		// created_at: "Posted " + date
	}); //ends createNewPost
	//saves new post
	new_blog.save(function(err) {
		if (err) {
			console.log("error: could not save blog post");
		}
	}); //ends new_post.save

	res.redirect('/blog');
}

showCreatePostForm = function(req, res) {
	res.render('create-post');
};


module.exports = function() {
	app.get('/blog', this.showBlog);
	app.get('/blog/create-post', this.showCreatePostForm)
	app.post('/blog', this.createNewBlog);
	return app;
}();





	