/**
 * 函数声明
 * 匿名 具名 箭头
 */

// 匿名函数 函数是个对象，fn1记录的是这个函数的地址
var fn1 = function() {};

var fn2 = fn1; //  将函数的地址赋值给fn2
console.log(fn1.name, fn2.name); //fn1 fn1
// 具名函数 作用域是整个文件
function fn3() {}
console.log(fn3.name);

// fn4作用域是一部分
var fn5 = function fn4() {
  console.log("fn4内部");
};

// console.log(fn4);  //  报错 fn4 is not defined
console.log(fn5()); //fn4内部 undefined

// 箭头函数   无法使用arguments
var fn6 = i => console.log(i);

fn6(1);
console.log("箭头函数", fn6.name); //

/**
 * 抽象词法树：不执行 只看语法
 */

/**
 * 函数柯里化：如果函数的返回值是函数，那么函数就有一个特殊的名字
 */

// 柯里化之前：
function sum(x, y) {
  return x + y;
}
var template = "<h1>I'm {{name}}</h1>";

function handlerBar(name) {
  return template.replace("{{name}}", name);
}
console.log(handlerBar("laughing"));

// 柯里化：
// 可以用做惰性求值
function addOne(y) {
  return sum(1, y);
}
function handleBar2(template) {
  return function(data) {
    return template.replace("{{name}}", data.name);
  };
}
var t = handleBar2(`<h1>I'm {{name}}</h1>`);
console.log(t({ name: "jack" }));

/**
 * 高阶函数：如果接受一个或多个函数输入或者输出一个函数，或者两个条件都满足
 */
var arr = [];
//  输入一个函数
arr.sort(function() {}); //map filter reduce foreach
//  输出一个函数 bind

/**
 * 回调，将函数作为参数
 */

/**
 * 返回对象的函数就叫构造函数
 */

/**
 * 箭头函数，使用call没法将call的第一个参数作为this
 */

// setTimeout(function () {
//   console.log(this);
//   setTimeout(() => {
//     console.log(this);

//   }, 1000);
// }.bind({name:'laughing'}), 1000);

var fn10 = () => {
  console.log("fn10", this);
  console.log(arguments);
};

// fn10()

// 柯里化函数
var abc = function(a, b, c) {
  return [a, b, c];
};
function curry(fn) {
  return function(data1,data2) {
    const lg = arguments.length;
    var arr = [];
    if (lg === 1) {
      arr.push(data1);
      return function(data2) {
        arr.push(data2);
        return function(data3) {
          arr.push(data3);
          var arr3 = fn.apply(undefined, arr);
          return arr3;
        };
      };
    } else if (lg === 2) {
      var arr = [];
      arr.push(data1,data2);
      return function(data3) {
        arr.push(data3);
        var arr2 = fn.apply(undefined, arr);
        return arr2;
      };
    } else if (lg === 3) {
      arr = fn.apply(undefined, arguments);
      return arr;
    }
  };
}

var curried = curry(abc);
// var arr = curried(1,2,3)
// console.log('arr : ',arr);
console.log("arr1 : ", curried(122)(299)(300));
console.log("arr2 : ", curried(1, 200)(3));
console.log("arr3 : ", curried(100, 2, 3));
// 理想状态：
// curried(1)(2)(3);
// => [1, 2, 3]

// curried(1, 2)(3);
// => [1, 2, 3]

// curried(1, 2, 3);
// => [1, 2, 3]
