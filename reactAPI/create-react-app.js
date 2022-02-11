// 在create-react-app中使用装饰器
/* 
npm run eject
*/

// 2.安装相关插件
/*
npm install babel-preset-stage-2 --save-dev
npm install babel-preset-react-native-stage-0 --save-dev
*/

// 3.根目录下创建 .babelrc
{ 
  "presets": ["react-native-stage-0/decorator-support"]
}