var redis = require('redis');
var db = redis.createClient();

// 简化存到redis用户信息
function RedisSession(user){
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url
    }
}

// 保存用户信息
RedisSession.save = function(user, fn){
    if (user.id){
        update(user, fn);
    }else {
        db.incr('session:user:ids', function(err, id){
            if (err) return fn(err);
            user.id = id;
            update(user, fn);
        })
    }
};
// private
function update(user, fn){
    var id = user.id;
    db.set('session:user:name' + user.name, id, function(err){
        if (err) return fn(err);
        db.hmset('session:user' + id, RedisSession(user), function(err){
            fn(err);
        })
    });
}

RedisSession.getSessionById = function(id, fn){
     db.hgetall('session:user' + id, function(err, session){
         fn(err, session);
     })
}

RedisSession.getSessionByName = function(name, fn){
    db.get('session:user:name' + name, function(err, id){
        if (err) return fn(err);
        RedisSession.getSessionById(id, fn);
    })
}

module.exports = RedisSession;


