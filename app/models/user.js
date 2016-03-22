var RedisSession = require('../lib/redis/session');
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String,
    githubInfo: Object
});

// 类方法用 UserModel调用
// var UserModel = mongoose.model('User', UserSchema);

UserSchema.statics.findByUsername = function(username,cb){
    this.findOne({username: username}, cb);
};
UserSchema.statics.login = function(githubUser, fn){
    if (!githubUser) fn(new Error('没有获取到用户信息'));
    this.findOne({username: githubUser.login}, function(err, user){
        if(err) return fn(err);
        if (!user){
            user = new UserModel({username: githubUser.login});
        }
        user.githubInfo = githubUser;
        user.save(function(err, user){
            githubUser.mongoId = user._id.toString();
            //保存到redis
            RedisSession.save(githubUser, function(err){
                if(err) return fn(err);
                fn(err, githubUser);
            });
        });
    });
};
//实例方法,用userEntity调用
//var userEntity = new UserModel({username:'Krouky'});
UserSchema.methods.handleUsername = function(){
    return this.username + 'hahaha!!';
};

var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
