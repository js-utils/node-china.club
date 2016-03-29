var User = require('./user');
var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    userId: String,
    title: String,
    category: String,
    tags: [String],
    markdown: String,
    voters: [String]
});

postSchema.statics.insertPost = function(post, cb){
    var postEntity = new postModel({userId: post.userId, title: post.title, category: post.category, tags: post["tags[]"], markdown: post.markdown});
    postEntity.save(function(err, data){
        return cb(err, data);
    });
};
postSchema.statics.findById = function(_id, cb){
    this.findOne({_id: _id}, function(err, post){
        if (err) return cb(err);
        User.findById({_id: post.userId}, function(err, author){
            cb(err, {post: post, author: {username: author.username, email: author.githubInfo.email}});
        });
    });
}

var postModel = mongoose.model('Post', postSchema);
module.exports = postModel;