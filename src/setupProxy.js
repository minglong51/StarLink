const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        //我的request以url开头
        '/api',
        createProxyMiddleware({
            target: 'https://api.n2yo.com',
            changeOrigin: true,
        })
    );
};
