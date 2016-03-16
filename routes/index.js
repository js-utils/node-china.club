var githubConfig = require('../lib/github/config');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session.uid);
  console.log(req.session);
  res.render('index', {
    title: 'Express',
    authVisitUrl: githubConfig.authVisitUrl
  });
});

module.exports = router;
