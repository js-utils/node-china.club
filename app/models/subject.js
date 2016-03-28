var mongoose = require('mongoose');
var SubjectSchema = new mongoose.Schema({
    group: {
        key: String,
        value: String,
        tags: Array
    },
    updateAt: {type: Date, default: Date.now},
    createAt: {type: Date, default: Date.now}
});
var SubjectModel = mongoose.model('Subject', SubjectSchema);
module.exports = SubjectModel;

