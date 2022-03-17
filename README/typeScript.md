# 一.typescript 环境搭建

### 1.安装 ts 和对应的 loader

```
  npm install typescript ts-loader --sace-dev
```

### 2.初始化 ts 的配置文件----tsconfig.js

```
  npx tsc --init
```

- 根据我们想要的效果来打开对应的配置

```
  {
   "compilerOptions": {
     "outDir": "./dist/", // 输出文件位置
     "noImplicitAny": true,
     "sourceMap": true,
     "module":"es6",
     "target":"es5",
     "jsx":"react",
     "allowJs":true,
     "moduleResolution":"node",
   }
  }
```

### 3.webpack.config.js 的一些配置

```
  module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: './src/app.ts',
    output: {
      filename: '[name].[contenthash].js', // 输出文件名称及hash
      path: path.resolce( __dirname + '/dist'),
    }
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    }
    plugins: [
      new HtmlWebpackPlugins()
    ],
  };
```

### [安装插件是需要安装一些类型文件](https://www.typescriptlang.org/dt/search?search=)

```
  地址：https://www.typescriptlang.org/dt/search?search=
```
