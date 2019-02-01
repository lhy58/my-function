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


// 九种跨域方式实现原理
// 地址: https://juejin.im/post/5c23993de51d457b8c1f4ee1
// 一.JSONP实现流程

function jsonp({ url, params, callback }) {
    return new Promise((resolve, reject) => {
        let script = document.createElement('script')
        window[callback] = function(data) {
            resolve(data)
            document.body.removeChild(script)
        }
        params = { ...params, callback } // wd=b&callback=show
        let arrs = []
        for (let key in params) {
            arrs.push(`${key}=${params[key]}`)
        }
        script.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}
jsonp({
    url: 'http://localhost:3000/say',
    params: { wd: 'Iloveyou' },
    callback: 'show'
}).then(data => {
    console.log(data)
})

