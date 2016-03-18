var app = require('../server');
var request = require('supertest')(app);
//var should = require('should');

describe('test html', function(){
    describe('visit', function(){
        it('访问首页状态吗必须是200', function(done){
            request.get('/')
                .expect('Content-Type', /html/)
                .expect(200).end(done);
        })
    })
});
