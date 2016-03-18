var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('posts', {
        title: '文章列表'
    })
});

module.exports = router;
