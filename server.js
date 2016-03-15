var app = require('./app');
var server = app.listen(3000, function(){
	console.log('server start at:  http://localhost:3000');
});