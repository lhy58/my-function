# 一，

### 1. 初始化 package.json

```
npm init -y
```

### 2.安装 webpack，webpack-cli，（推荐本地目录安装）

```
npm install  webpack webpack-cli --save-dev
```

### 3.执行 npx webpack 打包

- npx 是 npm 模块下的

# 二， webpack 配置

### 1.自定义 webpack 配置

- 项目的根部录下创建 webpack.config.js 文件

### 入口 entry 配置

```
  module.exports = {
    entry: './scr/app.js',
  };
```

### 输出 output 配置

```
  module.exports = {
    output：{
      filename: '[name].[contenthash].js', // 输出文件名称及hash
      path: path.resolce( __dirname + '/dist'),
      clean: true, // 清除
      assetModuleFilename：'images/[contenthash][ext]', // 资源的输出位置
    }
  };
```

- 将打包输出的 js 文件放到一个文件夹中

```
  module.exports = {
    output：{
      filename: 'scripts/[name].[contenthash].js', // scripts文件夹
    }
  };
```

### 2.使用插件 plugins

```
  npm install html-webpack-plugin -D

  module.exports = {

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'app.html', // 输出文件名
        inject: 'body' // 引入的script在body标签里
      })
    ]

  };
```

### 3. mode 配置：development

```
module.exports = {

  mode: 'development' // 开发模式

};
```

- 根据命令参数 env 来设置不同的环境
  执行命令：npx webpack --env prduction

```
module.exports = (env) => {
  return {
    mode: env.production? 'production': 'development'
  }
};
```

### 4.devtool 配置：cheap-source-map

- 精准定位开发过程中浏览器代码报错定位(代码行数的锁定)。

```
  module.exports = {

    devtool: cheap-source-map'

  };
```

5.使用 webpack-dev-server 实时刷新浏览器

- 执行命令：npx webpack server

```
  module.exports = {

    devServer: {
      static: './dist' // 执行 npx webpack-dev-server 命令
      compress: true, // 压缩
      port: 9000,

      host: '0.0.0.0', // 让你的服务器可以被外部访问

      hot: true, // 启用模块热替换, 默认开启
      liveReload: true, // 热加载，默认开启

      proxy: { // 设置代理
        '/api': 'http://localhost:3000',
      },

      http2: true, // https使用浏览器默认证书

      historyApiFallback: true, // 通过配置来提供页面代替任何404的静态资源响应
    }

  };
```

### 5. module 配置

```
  module.exports = {

    module: {
      rules: [
        {
          test: /\.png$/,
          type: 'asset/resource', // 图片资源
          generator: {
            filename: 'images/[contenthash][ext]' // 输出的文件名 例如：9ec112121abfe123131b.png
          }
        },
        {
          text:/\.svg/,
          type: 'asset/inline' // base64地址
        }
        {
          test: /\.jpg/,
          type: 'asset', // 通用资源类型
          parser: { // 解析器
            dataUrlCondition： {
              maxSize：4 * 1024 * 1024 // 8k; 小于8kb的文件，讲会视为inline模块类型（base64地址）, 否则视为resource模块类型（图片路径）
            }
          }
        }
      ]
    }

  };
```

### 6. loader 的配置

- 加载 css
  安装 style-loader css-loader less-loader
  - html 使用 style 引入 css

```
  module.exports = {

    rules: [
      {
        test: /\.(css|less)$/i,
        use: ['style-loader', 'css-loader', 'less-loader'], // use使用什么loader, 顺序很重要，从右-左执行
      }
    ]
  };
```

- 使用 mini-css-extract-plugin 插件
  html 使用 line 引入 css

```
module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
    }),
  ],
  rules: [
    {
      test: /\.(css|less)$/i,
      use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    }
  ]
};
```

- css 压缩插件 css-minimizer-webpack-plugin
  mode 要配置 production

```
module.exports = {

  mode：'production',

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[contenthash].css',
    }),
  ],

  rules: [
    {
      test: /\.(css|less)$/i,
      use: [ MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
    }
  ]

  optimization: { // 优化配置项
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(), // 使用terser-webpack-plugin 插件压缩js代码
    ],
  },
};
```

### 加载 fonts 字体

```
module.exports = {

  rules: [
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: 'asset/resource',
    }
  ]

};
```

### 加载数据

- 如：json，csv，tsv，xml
- json 支持是内置的 也就是说：import Data from './data.json' 默认正常运行
- 要导入 csv，tsv，xml， 可以使用 csv-loader 和 xml-loader

```
module.exports = {

  rules: [
    {
      test: /\.(csv|tsv)$/i, // console.log后得出数组
      use:'csv-loader',
    },
    {
      test: /\.xml$/i, //  console.log后得出对象
      use:'xml-loader',
    }
  ]

};
```

### 使用 babel-loader

- 解析 ES6 的桥梁
- @babel/core: babel 核心模块
- @babel/preset-env: babel 预设，一组 babel 插件的集合
- @babel/runtime, @babel/plugin-transform-runtime: 用于兼容 async/await 的语法

```
module.exports = {

  rules: [
    {
      test: /\.js$/i,
      exclude：/node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presers: ['@babel/preset-env'], // 预设
          plugins: [
            '@babel/plugin-transform-runtime'
          ]
        }
      }
    },
  ]

};
```

### 常用的代码分离方法

- 1.使用 entry 配置手动分离代码

  ```
  module.exports = {
    // 多入口打包后的代码重复 【index,another：名字可以随便取】
    entry: {
      index: './src/index.js', // 主入口
      another: './src/another.js', // 其他入口
      // ...
    }

  };
  ```

- 2.使用 entry dependencies 或者 splitChunksPlugin 去重和分离代码

  - 入口依赖
    配置 dependOn option 选项，这样可以在多个 chunk 之间共享

    - 方法一

    ```
      module.exports = {
        entry: {
          index: {
            import：'./src/index.js',
            dependOn: 'shared',
          },
          another: {
            import: './src/another.js',
            dependOn: 'shared',
          },
          shared: ['lodash', 'react', 'react-dom'], // 当 index.js 和 another.js 有lodash, react, react-dom模块时，打包进行抽离
        }

      };
    ```

    - 方法二

    ```
      module.exports = {
        entry: {
          index: './src/index.js', // 主入口
          another: './src/another.js' // 其他入口
        }
        optimization: { // 优化
          splitChunks: {
            chunks: 'all' // 抽离公共代码
          }
        }
      };
    ```

- 3.用过模块的内联函数调用来分离代码

  - 动态导入：import()

    ```
      funtion getLodash() {
        import('lodash').then(({default: _}) => {
          console.log(_.join(['1','2']))
        })
      }
    ```

    - A.懒加载（按需加载）

      - 创建 math.js

      ```
        export const add = (x, y) => {
          return x + y
        }

      ```

      - 操作 点击某个事件

      ```
        funtion onClick() {
          // webpackChunkName:魔法注释
          import(/* webpackChunkName: 'math' */'./math.js').then(({ add }) => {
            console.log(add(2,3))
          })
        }
      ```

    - B.预获取/预加载模块
      - prefetch(预获取)：将来某些导航下可能需要的资源
      - preload(预加载)：当前导航下可能需要资源
      ```
        funtion onClick() {
          // 魔法注释
          import(/* webpackChunkName: 'math', webpackPrefetch: true */'./math.js').then(({ add }) => {
            console.log(add(2,3))
          })
        }
        // 这将会生成<link rel='prefetch' href='math.js'> 并追加到页面头部，指示这浏览器在闲置时间预获取 math.js 文件
      ```

### 缓存第三方库

- 例如 lodash 提取到单独的 vendor chunk 文件中，是比较推荐的做法

```
  module.exports = {
    optimization: { // 优化
      cacheGroups： {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', // 缓存文件名字
          chunks: 'all',
        }
      }
    }
  };
```

### 公共路径

- publicPath 配置 ASSET_PATH = 'http://localhost:8080/'

```
  const ASSET_PATH = process.env.ASSET_PATH || '/'

  module.exports = {
    output: {
      publicPath: ASSET_PATH,
    }
  };

```

### resolve 模块解析

```
  // import Math from '@/math.js'
  module.exports = {
    resolve: {
      alias: { // 别名
        '@': path.resolve(__dirname, './src')
      }
    }
  };
```

### externals 外部扩展器

- 1.html 使用 script 标签 CND 引入
  页面使用：import $ from 'jquery'

  ```
    module.exports = {
      plugins: [
        new HtmlWebpackPlugins({
          tempalte: './index.html' //  index.html 使用 script CND 引入： <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js"></script>
        })
      ],
      externals：{ // 外部扩展
        jquery: 'jQuery',
      }
    };
  ```

- 2. webpack 配置引入
  ```
    module.exports = {
      externalsType: 'script', // html以script标签引入
      externals：{
        jquery: [
          'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.js',
          '$' // 别名： import $ from 'jquery'
        ]
      }
    };
  ```
