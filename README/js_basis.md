# 基础知识点

### 1、JavaScript有几种数据类型？
* 基础类型
  - number：数字类型
  - string：字符串类型
  - boolean：布尔值类型
  - undefined：未定义类型
  - null：空值类型
  - symbol：symbol类型
  - bigint：大数字类型
* 引用类型
  - object：对象类型
  - array：数组类型
  - function：函数类型

### 2、JavaScript最大安全数字与最小安全数字？

  ```
  console.log(Number.MAX_SAFE_INTEGER)
  // 9007199254740991

  console.log(Number.MIN_SAFE_INTEGER)
  // -9007199254740991`
  ```

### 3、闭包是什么？
  闭包是一个能读取其他函数内部变量的函数
   - 优点：使外部能访问到局部的东西
   - 缺点：使用不当容易造成内存泄漏的问题
  例子：
  ```
  fucntion a() {
    let num = 0;
    // 这是闭包
    return function () {
      return num++
    }
  }
  const b = a()
  console.log(b()) // 1
  console.log(b()) // 2
  ``` 

### 4、什么是变量提升？函数提升？
  变量提升
  ```
  console.log(name) // undefined
  var name = 'Sunshine_Lin'

  if (false) {
    var age = 23
  }
  console.log(age) // undefined 不会报错
  ```

  函数提升
  ```
  console.log(fun) // function fun() {}
  function fun() {}

  if (false) {
    function fun2(){}
  }
  console.log(fun2) // undefined 不会报错
  ```

  函数提升优先级 > 变量提升优先级
  ```
  console.log(fun) // function fun() {}
  var fun = 'Sunshie_Lin'
  function fun() {}
  console.log(fun) // 'Sunshie_Lin'
  ```
### 5、函数声明和函数表达式的区别？
  - 函数声明：享受函数提升
  - 函数表达式：归类于变量声明，享受变量提升
  - 函数提升优先级 > 变量提升优先级  
  ```
  console.log(fun) // fun () {}
  // 函数表达式
  var fun = function(name) {}
  // 函数声明
  function fun () {}
  console.log(fun) // fun (name) {}
  ```
### 6、什么是匿名函数？
  匿名函数：就是没有函数名的函数，如：
  ```
  // 这里创建了一个匿名函数(在第一个括号内)，第二个括号用于调用该匿名函数，并传入参数
  (function(x, y){
    alert(x + y);  
  })(2, 3);
  ```  

### 7、解决遍历对象时，把原型上的属性遍历出来了咋办？
  使用hasOwnProperty判断
  ```
  function Person(name) {
    this.name = name
  }
  Person.prototype.age = 23
  const person = new Person('Sunshine_lin')
  for (const key in person) { console.log(key) } // name age
  // 使用 hasOwnProperty
  for (const key in person) {
    person.hasOwnProperty(key) && console.log(key) // name
  } 
  ```

### 8、JavaScript变量在内存中具体存储形式？
 - 基本数据类型：存在栈内存里
 - 引用数据类型：指针存栈内存，指向堆内存中一块地址，内容存在堆内存中
 ```
 let obj = new Object()
 obj.name = 'LHY'
 let obj2 = obj
 obj2.name = '旧城'
 console.log(obj) // {name: '旧城'}
 console.log(obj2) // {name: '旧城'}
 ```
 栈内存                            
  | 变量名 | 值 |             
  | --- | --- |              
  | - - | - - |
  | - - | - - |
  | - - | - - |
  |obj2 |0x123|
  |obj  |0x123|
  |a    |null |

 堆内存
  | 0x123 |
  | --- |
  | - - |
  | {name: '旧城'} |


### 9、null和undefined的异同点有哪些？
相同点
 - 都是空变量
 - 都是假值，转布尔值都是false
 - null == undefined 为 true
不同点
 - typeof判断null为object，判断undefined为undefined
 - null转数字为0，undefined转数字为NaN
 - null是一个对象未初始化，undefined是初始化了，但未定义赋值
 - null === undefined 为 false

### 10、如何判断数据类型？
 - typeof xxx：能判断出number，string，undefined，boolean，object，function（null是object）
 - Object.prototype.toString.call(xxx)：能判断出大部分类型
 - Array.isArray(xxx)：判断是否为数组

### 11、为什么typeof null 是object？
不同的数据类型在底层都是通过二进制表示的，二进制前三位为 000 则会被判断为 object类型，而 null 底层的二进制全都是 0，那前三位肯定也是 000，所以被判断为 object

### 12、JavaScript的隐式转换规则？
 - 转成string类型： +（字符串连接符）
 ```
 let a = 111 + ''
 console.log(a) // '111'
 ```
 - 转成number类型：++/--(自增自减运算符) + - * / %(算术运算符) > < >= <= == != === !=== (关系运算符)
 - 转成boolean类型：!（逻辑非运算符)

### 13、双等号左右两边的转换规则？
 - null == undefined 为 true
 - 1、如果有一个操作数是布尔值，则在比较相等性之前先将其转换为数值——false转换为0，而true转换为1；
 - 2、如果一个操作数是字符串，另一个操作数是数值，在比较相等性之前先将字符串转换为数值
 - 3、如果一个操作数是对象，另一个操作数不是，则调用对象的toString()方法，用得到的基本类型值按照前面的规则进行比较

### 14、undefined >= undefined 为什么是 false ？
 按照隐式转换规则，可转换成NaN >= NaN，NaN 不等于 NaN，也不大于，所以是false

### 15、null >= null 为什么是 true？
 按照隐式转换规则，可转换成0 >= 0，0 等于 0，所以是true

### 16、[] == ![] 为什么是 true ？
按照 双等号左右两边的转换规则 
 - 1、! 优先级高于 ==，[]不是假值，所以先转换成 [] == false
 - 2、右边为布尔值，false先转数字0，所以可转换为[] == 0
 - 3、左边为对象，[]调用toString转为 ''，转换为'' == 0
 - 4、左边为字符串，''转换为0，最终为 0 == 0


### 17、0.1 + 0.2 === 0.3，对吗？
 不对，JavaScript的计算存在精度丢失问题
  ```
  console.log(0.1 + 0.2 === 0.3) // false
  ```
  * 原因：JavaScript中小数是浮点数，需转二进制进行运算，有些小数无法用二进制表示，所以只能取近似值，所以造成误差
  * 解决方法：
    - 先变成整数运算，然后再变回小数
    - toFixed() 性能不好，不推荐

### 18、绑定点击事件有几种方式？ 
 三种  
 * 1.xxx.onclick = function (){}
 * 2.<xxx onclick=""></xxx>
 * 3.xxx.addEventListence('click', function(){}, false)

### 19、JavaScript的事件流模型有哪些？
 - 事件冒泡：由最具体的元素接收，并往上传播
 - 事件捕获：由最不具体的元素接收，并往下传播
 - DOM事件流：事件捕获 -> 目标阶段 -> 事件冒泡

 如何阻止事件冒泡？
 ```
  function stopBubble(e) {
    if (e.stopPropagation) {
      e.stopPropagation()
    } else {
      window.event.cancelBubble = true;
    }
  }
 ```
 如何阻止事件默认行为？
 ```
  function stopDefault(e) {
    if (e.preventDefault) {
      e.preventDefault();
    } else {
      window.event.returnValue = false;
    }
  }
 ```

### 20、什么是事件委托？
当所有子元素都需要绑定相同的事件的时候，可以把事件绑定在父元素上，这就是事件委托，
优点有：
 - 绑定在父元素上只需要绑定一次，节省性能
 - 子元素不需要每个都去绑定同一事件
 - 如果后续又有新的子元素添加，会由于事件委托的原因，自动接收到父元素的事件监听 

### 21、load、$(document).ready、DOMContentLoaded的区别？
 DOM文档加载的步骤为：
  - 1、解析HTML结构。
  - 2、加载外部脚本和样式表文件。
  - 3、解析并执行脚本代码。
  - 4、DOM树构建完成。// DOMContentLoaded触发、$(document).ready触发
  - 5、加载图片等外部文件。
  - 6、页面加载完毕。// load触发

### 22、Set与Array的区别是什么？ Map与Object的区别是什么？
建议看阮一峰老师的文章：[Set 和 Map 数据结构](https://es6.ruanyifeng.com/#docs/set-map)

### 23、处理异步的方法有哪些？
 - 回调函数
 - promise
 - 事件监听
 - 发布订阅
 - async await

### 24、 数组的常用方法有哪些？ 
 | 方法 | 作用 | 是否影响原数组 |
 | --- | --- | --- |        
 | push | 在数组后添加元素，返回数组长度 | 是 |
 | pop | 删除数组最后一项，返回被删除项 | 是 |
 | shift | 删除数组第一项，返回被删除项 | 是 |
 | unshift | 数组开头添加元素，返回新数组长度 | 是 |
 | reserve | 反转一个数组，返回修改后的数组 | 是 |
 | sort | 排序一个数组，返回修改后的数组 | 是 |
 | splice | 截取数组，返回被截取的区间 | 是 |
 | join | 将一个数组所有元素连接成字符串并返回这个字符串 | 否 |
 | concat |  [].concat(arr2, arr3) 连接数组 | 否 |
 | map | 操作数组每一项并返回一个新数组 | 否 |
 | forEach | 遍历数组，没有返回值 | 否 |
 | filter | 对数组所有项进行判断，返回符合规则的新数组 | 否 |
 | every | 数组每一项都符合规则才返回true | 否 |
 | some | 数组有符合规则的一项就返回true | 否 |
 | reduce | 接收上一个return和数组的下一项 | 否 |
 | flat | 数组扁平化 | 否 |
 | slice | 	截取数组，返回被截取的区间 | 否 |

 ### 25、 Math的常用方法有哪些？
 | 方法 | 作用 |
 | --- | --- |
 | Math.max(...arr)| 取arr中的最大值 |
 | Math.min(...arr)| 取arr中的最小值 |
 | Math.ceil(小数) | 小数向上取整 |
 | Math.floor(小数) | 小数向下取整 |
 | Math.round(小数) | 小数四舍五入 |
 | Math.sqrt(num) | 对num进行开方 |
 | Math.pow(num, n) | 对num取m次幂 |
 | Math.random() * num | 取0-num的随机数 |

 ### 26、 哪些因素导致内存泄漏？如何解决？
  如何监控内存状况
   - 浏览器任务管理器
   - 浏览器按F12打开调试窗口-选择Performance - 录制后查看
   - 堆快照：浏览器按F12打开调试窗口-选择Memory-录制后选中Statistics，查看数组，对象，字符串等所占内存
  如何避免 
   - 减少全局变量
   - 未清除定时器
   - 合理使用闭包
   - 分离DOM

### 27、 如何将 JS 日期转换为ISO标准   
toISOString() 方法用于将js日期转换为ISO标准。 它使用ISO标准将js Date对象转换为字符串
  ```
  var date = new Date();
  var n = date.toISOString();
  console.log(n);
  ```

### 28、如何在JS中编码和解码 URL
 * 编码：encodeURI()
   - 注意： encodeURI()不会编码类似这样字符： / ? : @ & = + $ #，如果需要编码这些字符，请使用encodeURIComponent()。
 * 解码：decodeURI() 

 ### 29、什么是BOM？有哪些api？
 BOM就是browser object model，浏览器对象模型；
  | api | 作用 | 代表方法或属性 |
  | window.history | 操纵浏览器的记录 | history.back() |
  | | | history.go(-1) |
  |window.innerHeight | 获取浏览器窗口的高度 ||
  |window.innerWidth | 获取浏览器窗口的宽度 ||