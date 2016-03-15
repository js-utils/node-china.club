var bcrypt = require('bcrypt');
var RedisSession = require('../lib/redis/session');

module.exports = User;

function User(){

}

User.login = function(githubUser, fn){
    RedisSession.save(githubUser, function(err){
        if (err) throw err;
        RedisSession.getSessionByName(githubUser.name, function(err, session){
            fn(err, session);
        })
    });
}
