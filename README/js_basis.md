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

### 5.解决遍历对象时，把原型上的属性遍历出来了咋办？
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

### 6.JavaScript变量在内存中具体存储形式？
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
 |栈内存|                    |堆内存|
 | --- |                    | --- |
 | 变量名 | 值 |              | 0x123 |
 | --- | --- |              | {name: '旧城'} |
 | - - | - - |
 | - - | - - |
 | - - | - - |
 |obj2 |0x123|
 |obj  |0x123|
 |a    |null |
