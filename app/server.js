var config = require('./../config');
var app = require('./app');
app.listen(config.port, function(){
	console.log('server start at:  http://localhost:' + config.port);
});

module.exports = app;

