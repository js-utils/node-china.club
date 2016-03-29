var mongoose = require('mongoose');
var SubjectSchema = new mongoose.Schema({
    group: String,  //比如: 后台 ...
    categories: [{
        key: String,   //比如: node meteor rails
        value: String, //比如: Node.js Meteor Rails ...
        tags: [String]    // 比如: express gulp koa ...
    }],
    updateAt: {type: Date, default: Date.now},
    createAt: {type: Date, default: Date.now}
});

SubjectSchema.statics.getAll = function(cb){
  this.find({}, function(err, data){
      cb(err, data);
  });
};

SubjectSchema.statics.initData = function(){
    var data = [{
        group: '后台开发',
        categories: [{
            key: 'node',
            value: 'NodeJS',
            tags: ['express', 'koa', 'socket', 'gulp', 'grunt', 'webpack', 'mongodb', 'mysql', 'redis']
        }, {
            key: 'meteor',
            value: 'Meteor',
            tags: ['router']
        },{
            key: 'rails',
            value: 'Rails',
            tags: ['mysql', 'mongodb']
        }]
    }, {
        group: '移动开发',
        categories: [{
            key: 'iOS',
            value: 'iOS',
            tags: ['oc', 'swift']
        }, {
            key: 'android',
            value: 'Android',
            tags: []
        },{
            key: 'reactNative',
            value: 'reactNative',
            tags: []
        }]
    }, {
        group: '前端',
        categories: [{
            key: 'html',
            value: 'html',
            tags: ['html', 'html5']
        }, {
            key: 'css',
            value: 'css',
            tags: ['css', 'css3']
        },{
            key: 'javascript',
            value: 'javascript',
            tags: ['javascript-ES5', 'javascript-ES6', 'jQuery', 'angular', 'react']
        }]
    }, {
        group: '数据库',
        categories: [{
            key: 'mongodb',
            value: 'mongodb',
            tags: []
        }, {
            key: 'mysql',
            value: 'mysql',
            tags: []
        },{
            key: 'redis',
            value: 'redis',
            tags: []
        }]
    }, {
        group: '服务器/运营',
        categories: [{
            key: 'nginx',
            value: 'nginx',
            tags: []
        }]
    }];

    for (var i in data){
        this.update({group: data[i].group}, {$set: data[i]}, {upsert : true}, function(err, data){
            console.log(err, data);
        });
    }
};


var SubjectModel = mongoose.model('Subject', SubjectSchema);
module.exports = SubjectModel;

