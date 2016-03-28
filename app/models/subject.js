var mongoose = require('mongoose');
var SubjectSchema = new mongoose.Schema({
    group: String,  //比如: 后台 ...
    category: [{
        key: String,   //比如: node meteor rails
        value: String, //比如: Node.js Meteor Rails ...
        tags: Array    // 比如: express gulp koa ...
    }],
    updateAt: {type: Date, default: Date.now},
    createAt: {type: Date, default: Date.now}
});
var SubjectModel = mongoose.model('Subject', SubjectSchema);
module.exports = SubjectModel;

