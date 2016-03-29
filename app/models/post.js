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
    var postEntity = new postModel({userId: post.userId, title: post.title, category: post.category, tags: post.tags, markdown: post.markdown});
    postEntity.save(function(err, data){
        return cb(err, data);
    });
};

var postModel = mongoose.model('Post', postSchema);
module.exports = postModel;