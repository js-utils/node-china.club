var RedisSession = require('../lib/redis/session');

module.exports = User;

function User(){

}

User.login = function(githubUser, fn){
    RedisSession.save(githubUser, function(err){
        fn(err, githubUser);
    });
}
