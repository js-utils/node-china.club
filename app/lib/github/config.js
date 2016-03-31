var config = {
    "oauth_client_id": "1c12b4a1306f5348dd81",
    "oauth_client_secret": "2e507f76390b9b80de65b30b2ea93ec5dfcf0bb3",
    "get_access_token_config": {
        "oauth_host": "github.com",
        "oauth_port": 443,
        "oauth_path": "/login/oauth/access_token",
        "oauth_method": "POST"
    }
};

if (process.env.NODE_ENV != 'production'){
    config["oauth_client_id"] = "9892ac0590408f2767dc"
    config["oauth_client_secret"] = "e5324ef4d6ca159373bb7fdfb0f23aaab194ef81"
}

config.authVisitUrl = "https://github.com/login/oauth/authorize?scope=user:email&client_id=" + config.oauth_client_id;

module.exports = config;