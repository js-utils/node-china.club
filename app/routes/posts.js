var express = require('express');
var router = express.Router();
var Subject = require('../models/subject');
var Post = require('../models/post');
/* GET users listing. */
router.get('/', function(req, res, next) {
    Post.findPosts(0, 0, 0, function(err, posts){
        console.log(posts);
        res.render('posts', {
            title: '文章列表',
            posts: posts || []
        })
    });

});

router.get('/new', function(req, res, next){

    if (!res.locals.user){
        res.send('请先登录');
    }

    Subject.getAll(function(err, subjects){
        if (err) return next(err);
        console.log('data');
        console.log(subjects);
        res.render('posts/new', {
            title: '新增话题',
            subjects: subjects
        })
    });
});

router.get('/show/:id', function(req, res, next){
    var _id = req.params.id;
    Post.findById(_id, function(err, post){
       res.render('posts/show', {
           title: '话题详情',
           post: post
       })
    });
});

// api
router.get('/api/category/tags', function(req, res, next){
    var categoryKey = req.query.category_key;
    if (categoryKey){
        Subject.getTagsWithCategoryKey(categoryKey, function(err, data){
            if (err) return next(err);
            res.send(data);
        })
    }
});
// post 添加数据
router.post('/api/new', function(req, res, next){
    var post = req.body;
    console.log(req.body);
    post.userId = res.locals.user.mongo_id;
    Post.insertPost(post, function(err, post){
        if (err) return next(err);
        res.setHeader('Content-Type', 'text/plain');
        res.writeHead(200);
        res.end(post._id.toString());
    });

});


module.exports = router;
