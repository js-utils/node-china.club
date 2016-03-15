var RedisSession = require('../redis/session');

module.exports = function(req, res, next){
    var uid = req.session.uid;
    if (!uid) return next();
    RedisSession.getSessionById(uid, function(err, session){
        if (err) return next(err);
        res.locals = req.locals || {};
        res.locals.user = req.user = session;
        next();
    });
};