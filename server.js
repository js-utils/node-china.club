var config = require('./config');
var app = require('./app');
var server = app.listen(config.port, function(){
	console.log('server start at:  http://localhost:' + config.port);
});