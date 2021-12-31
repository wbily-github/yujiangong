let proxyObj = {}
proxyObj['/'] = {
    //websocket
    ws: false,
    //
    target: "http://localhost:8088",
    changeOrigin: true,
    //不重写请求
    pathReWrite: {
        '^/': '/'
    }
}

module.exports = {
    devServer: {
        host: "localhost",
        port: 8099,
        proxy: proxyObj
    }
}