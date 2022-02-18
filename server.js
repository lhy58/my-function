let http  = require('http')
let fs = require('fs')

/*
* 一. 实现前端页面的代理，接口转发
* 二. server.js 和index.html 同级目录下
* 三. 启动
* 执行node server.js，浏览器打开localhost:8000即可看到页面以及前端ajax数据
*/



/*
//哪些url请求需要代理（代理配置）
let conifg = {
  '/api/':{//   /api/开头的url需要代理到http://172.1.1.250:80这台服务器
      target: 'http://172.1.1.250:80',
  },
  '/test/':{
      target: 'http://172.1.1.250:80',
  }
}

let app = http.createServer ( function(request,response){
  let url = request.url
  if(request.url!=='/favicon.ico'){//清除第二次访问
      //请求的数据是否存在代理
      for ( var key in conifg){
          if( url.indexOf(key) >-1 ){
              let info = conifg[key].target.split(':')
              let opt = {
                  protocol: info[0]+':',
                  host:    info[1].slice(2),
                  port:    info[2] || 80,
                  method:  request.method,//这里是发送的方法
                  path:    url,     //这里是访问的路径
                  json: true,
                  headers: request.headers
              }
              proxy( opt, response,request )//代理方法
              return;
          }
      }
      //正常的读取文件和其他资源加载
      fs.readFile( __dirname + ( url==='/' ? '/index.html':url ), function( err, data ){
          if( err ){
              console.log( 'file-err',err )
          }else{
              console.log(data)
              response.end( data )
          }
      });
  }
} ) 

//代理转发的方法
function proxy( opt,res ,req){
  var proxyRequest = http.request(opt, function(proxyResponse) { //代理请求获取的数据再返回给本地res
      proxyResponse.on('data', function(chunk) {
          console.log( chunk.toString('utf-8') )
          res.write(chunk, 'binary');
      });
      //当代理请求不再收到新的数据，告知本地res数据写入完毕。
      proxyResponse.on('end', function() {
          res.end();
      });
      res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  }); 
  //data只有当请求体数据进来时才会触发
  //尽管没有请求体数据进来，data还是要写，否则不会触发end事件
  req.on('data', function(chunk) {
      console.log('in request length:', chunk.length);
      proxyRequest.write(chunk, 'binary');
  });
  req.on('end', function() {
      //向proxy发送求情，这里end方法必须被调用才能发起代理请求
      //所有的客户端请求都需要通过end来发起
      proxyRequest.end();
  }); 
}
*/

let app = http.createServer ( function(request,response){
  let url = request.url
  if(request.url!=='/favicon.ico'){//清除第二次访问//正常的读取文件和其他资源加载
      fs.readFile( __dirname + ( url==='/' ? '/index.html':url ), function( err, data ){
          if( err ){
              console.log( 'file-err',err )
          }else{
              response.end( data )
          }
      });
  }
} ) 

app.listen(8000)


/*****2. 使用 npx http-server 命令快速的开启一个静态服务器*****/


/*****3. live-server 的使用 ********/
// 项目目录使用live-server命令行命令便可直接在浏览器中预览,并且自动全局监听实时更新