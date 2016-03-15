var RedisSession = require('../redis/session');

module.exports = function(req, res, next){
    var uid = req.session.uid;
    console.log('userid---', uid);
    if (!uid) return next();
    RedisSession.getSessionById(uid, function(err, session){
        if (err) return next(err);
        console.log('=====');
        console.log(session);
        res.locals = req.locals || {};
        res.locals.user = req.user = session;
        next();
    });
};