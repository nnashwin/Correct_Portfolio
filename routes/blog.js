var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');


// Schema for blog posts posted by author
var postSchema = new mongoose.Schema({
	title: String,
	post: String,
	created_at: {
		type: Date,
		default: Date.now
	}
});

var commentSchema = new mongoose.Schema({
	name: String,
	email: String,
	url: String,
	comment: String
});

	