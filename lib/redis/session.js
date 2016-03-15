var redis = require('redis');
var db = redis.createClient();

// 简化存到redis用户信息
function RedisSession(user){
    return {
        //redis_id: user.redis_id,
        name: user.name + '1111',
        email: user.email,
        avatar_url: user.avatar_url
    }
}

// 保存用户信息
RedisSession.save = function(user, fn){
    if (user.redis_id){
        update(user, fn);
    }else {
        //该用户是否已经存在redis中
        getRedisIdByName(user.name, function(err, redis_id){
            if(err) return fn(err);
            // 如果已经存在用户信息,直接用该redis,多点登录
            // 若想单点登录,先删除已有用户,创建新的reids_id即可
            if(redis_id){
                user.redis_id = redis_id;
                update(user, fn);
            }else {
                db.incr('session:user:ids', function(err, redis_id){
                    if (err) return fn(err);
                    user.redis_id = redis_id;
                    update(user, fn);
                })
            }
        });
    }
};
// private
function update(user, fn){
    var redis_id = user.redis_id;
    db.set('session:user:name' + user.name, redis_id, function(err){
        if (err) return fn(err);
        db.hmset('session:user' + redis_id, RedisSession(user), function(err){
            fn(err);
        })
    });
}

RedisSession.getSessionById = function(redis_id, fn){
     db.hgetall('session:user' + redis_id, function(err, session){
         fn(err, session);
     })
}

function getRedisIdByName(name, fn){
    db.get('session:user:name' + name, function(err, redis_id){
        fn(err, redis_id);
    })
}
RedisSession.getSessionByName = function(name, fn){
    getRedisIdByName(name, function(err, redis_id){
        if (err) return fn(err);
        RedisSession.getSessionById(redis_id, fn);
    });
};

module.exports = RedisSession;


