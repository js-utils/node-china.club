var express = require('express');
var router = express.Router();
var Post = require('../models/post');
/* GET home page. */
router.get('/', function(req, res, next) {

  Post.findPosts(0, 0, 0, function(err, posts){
    console.log(posts);
    res.render('index', {
      title: 'Express',
      posts: posts || []
    });
  });
});

module.exports = router;
