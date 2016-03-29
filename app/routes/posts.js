var express = require('express');
var router = express.Router();
var Subject = require('../models/subject.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('posts', {
        title: '文章列表'
    })
});

router.get('/new', function(req, res, next){
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

module.exports = router;
