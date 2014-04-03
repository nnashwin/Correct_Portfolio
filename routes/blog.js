var express = require('express');
var app = module.exports = express();
var mongoose = require('mongoose');
var moment = require('moment');

// Schema for blog posts posted by author
var postSchema = new mongoose.Schema({
  title: String,
  content: String,
  description: String,
  created_at: {
    type: Date,
    default: Date.now()
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
showBlogs = function(req, res) {
  postModel.find(function(err, posts) {
    res.render('blog', {
      posts: posts,
      moment: moment
    });
  });

} // ends showBlog

//show single blog when clicked upon

showBlogPost = function(req, res) {
  postModel.findOne( {_id: req.params.id }, function(err, post) {
    res.render('edit-post', {
      post: post,
      moment: moment
    });
  });
} // ends showBlogPost

//edits single blog post when clicked

updateBlogPost = function(req, res) {
  postModel.findOne( {_id: req.params.id }, function(err, post) {
    if(err) return console.log('Your Post could not be updated.');
    post.title = req.body.title;
    post.content = req.body.content;
    post.description = req.body.description;
    post.created_at = Date.now();
    post.save (function(err) {
      if(err) return console.log('Your Post could not be saved');
    });
    res.redirect('/blog');
  })
};

createNewBlog = function(req, res) {
  if(req.session.admin) {
    var new_title = req.body.title;
    var new_content = req.body.content;
    var date = new Date();
    date = date.toDateString();
    console.log(date);
    //create new blog post from model
    var new_blog = new postModel({
      title: new_title,
      content: new_content,
      created_at: date
      // created_at: "Posted " + date
    }); //ends createNewPost
    //saves new post
    new_blog.save(function(err) {
      if (err) {
        console.log("error: could not save blog post");
      }
    }); //ends new_post.save

  res.redirect('/blog');

  } else {
  res.send('You are not authorized to view this page')
  }
}

showCreatePostForm = function(req, res) {
  if(req.session.admin) { 
    res.render('create-post');
  } else {
    res.send('You are not authorized to view this page')
  }
};

module.exports = function() {
  app.get('/blog', this.showBlogs);
  app.get('/blog/create-post', this.showCreatePostForm);
  app.get('/blog/:id', this.showBlogPost);
  app.post('/blog', this.createNewBlog);
  return app;
}();





  