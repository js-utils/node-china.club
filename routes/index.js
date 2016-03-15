var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Express',
    github_client_id: '1c12b4a1306f5348dd81'
  });
});

module.exports = router;
