import React from 'react';

const Pro = () => {
  //请求某个图片资源
  function requestImg() {
    var p = new Promise((resolve, reject) => {
      var img = new Image();
      img.onload = function () {
        resolve(img);
      };
      // 错误写法
      img.src = '图片的路径';
    });
    return p;
  }
  //延时函数，用于给请求计时
  function timeout() {
    var p = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('图片请求超时');
      }, 5000);
    });
    return p;
  }

  // 赛跑
  /*
   * requestImg函数会异步请求一张图片，我把地址写为"图片的路径"，所以肯定是无法成功请求到的.
   * timeout函数是一个延时5秒的异步操作。我们把这两个返回Promise对象的函数放进race，于是他俩就会赛跑，
   * 如果5秒之内图片请求成功了，那么遍进入then方法，执行正常的流程。如果5秒钟图片还未成功返回，
   * 那么timeout就跑赢了，则进入catch，报出“图片请求超时”的信息
   */
  Promise.race([requestImg(), timeout()])
    .then((res) => {
      console.log('race', res);
    })
    .catch((err) => {
      console.log('err', err);
    });

  function funcAll(id) {
    return new Promise((resolve, reject) => {
      /*
       * 这里写接口请求
       */
      resolve(id);
    });
  }
  Promise.all([1, 2, 3, 4, 5].map((id) => funcAll(id)))
    .then((res) => {
      console.log('all', res);
    })
    .catch((err) => {
      console.log('err', err);
    });
  return '';
};

export default Pro;
