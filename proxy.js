/*
* 解决跨域
* 在packege.json配置
* /api 只在/api下使用172.213.1.1:3001代理解决跨域
*
 */
{
    "proxy": {
        "/api": {
            "target": "172.213.1.1:3001",
                "changeOrigin": true,
                "pathRewrite": {
                "^/api": "/"
            }
        }
    }
}

// 全局
"proxy": "172.213.1.1:3001"
