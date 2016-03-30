var User = require('./user');
var mongoose = require('mongoose');
var postSchema = new mongoose.Schema({
    userId: String,
    title: String,
    category: String,
    tags: [String],
    markdown: String,
    voters: [{type: String, unique: true, default: []}],
    voterCount: {type: String, default: 0}
},{
    timestamps: true
});
postSchema.pre('save', function(next) {
    this.voterCount = this.voters.length;
});


postSchema.statics.insertPost = function(post, cb){
    var postEntity = new postModel({userId: post.userId, title: post.title, category: post.category, tags: post["tags[]"], markdown: post.markdown});
    postEntity.save(function(err, data){
        return cb(err, data);
    });
};

postSchema.statics.findPosts = function(pageNumber, limit, searchText, cb){
    pageNumber = pageNumber || 1;
    limit = limit || 20;
    this.find({}, {voters: 0}, {skip: limit*(pageNumber-1), limit: limit, sort:{ createdAt: -1}}, function(err, posts){
        cb(err, posts);
    })
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