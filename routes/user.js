
/*
 * GET users listing.
 */

 var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	adminUser: {
		type: Boolean,
		default: false
	}
});

var userModel = mongoose.model('user', userSchema);

exports.list = function(req, res){
  res.send("respond with a resource");
};