var https = require('https');
var fs = require('fs');
var qs = require('querystring');
var router = require('express').Router();

function loadConfig(){
    var config = JSON.parse(fs.readFileSync("config.json", 'utf-8'))['github'];
    return config;
}

var config = loadConfig();

function get_access_token(code, cb){
    var data = qs.stringify({
        client_id: config.oauth_client_id,
        client_secret: config.oauth_client_secret,
        code: code
    });

    var get_access_token_config = config.get_access_token_config;
    var reqOptions = {
        host: get_access_token_config.oauth_host,
        port: get_access_token_config.oauth_port,
        path: get_access_token_config.oauth_path,
        method: get_access_token_config.oauth_method,
        headers: {'Content-Length': data.length}
    };

    var body = "";
    var req = https.request(reqOptions, function(res){
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            cb(null, qs.parse(body).access_token);
        });
    });
    req.write(data);
    req.end();

    req.on('error', function(err){
        cb(err.message);
    });
}


function get_oauth_token(accessToken, cb){
    var options = {
        hostname: 'api.github.com',
        port: 443,
        path: '/user',
        method: 'GET',
        headers: {
            'Authorization': 'token OAUTH-TOKEN'
        }
    };
    var req = https.request(options, function(res){
        console.log('statusCode: ', res.statusCode);
        console.log('headers: ', res.headers);
        var body = "";
        res.setEncoding('utf8');
        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            cb(null, body);
        }).on("error", function (err) {
            cb(err.message);
        });
    });
    req.write(qs.stringify({access_token: accessToken}));
    req.end();

    req.on('error', function(err){
        cb(err.message);
    });
}


router.all('/github/*', function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//function redirect_to_github(){
//    return 'https://github.com/login/oauth/authorize?client_id=' + config.oauth_client_id + '&redirect_uri=http://127.0.0.1:3000/githubAuthCallback&state=nodeChina'
//}
//console.log(redirect_to_github());

/*
 https://github.com/login/oauth/authorize?client_id=1c12b4a1306f5348dd81&redirect_uri=http://127.0.0.1:3000/github/authCallback&state=nodeChina
 访问: 'https://github.com/login/oauth/authorize?client_id=' + config.oauth_client_id + '&redirect_uri=http://127.0.0.1:3000/github/authCallback&state=nodeChina'
 点击授权后,跳转到该路由,并带有token值和state值(state值就是url传的值,可随便填写)
 */
router.get('/authCallback', function(req, res){
    get_access_token(req.query.code, function(err, access_token){
        if(err) throw err;
        console.log('access_token: ' + access_token);
        get_oauth_token(access_token, function(err, oauth_token){
            if (err) throw err;
            console.log(oauth_token);
        })
        res.redirect('/');
    })
});

module.exports = router;