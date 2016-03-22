var RedisSession = require('../lib/redis/session');
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    username: String
});

// 类方法用 UserModel调用
// var UserModel = mongoose.model('User', UserSchema);
UserSchema.statics.findByUsername = function(username,cb){
    this.find({username: username}, cb);
};
//实例方法,用userEntity调用
//var userEntity = new UserModel({username:'Krouky'});
UserSchema.methods.handleUsername = function(){
    return this.username + 'hahaha!!';
};

var UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;

UserModel.login = function(githubUser, fn){
    RedisSession.save(githubUser, function(err){
        fn(err, githubUser);
    });
};
