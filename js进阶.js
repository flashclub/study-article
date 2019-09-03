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

// 箭头函数
var fn6 = i => console.log(i);

console.log(fn6(1));
console.log(fn6.name); //

/**
 * 抽象词法树：不执行 只看语法
 */

/**
 * 函数柯里化：如果函数的返回值是函数，那么函数就有一个特殊的名字
 */

// 柯里化之前：
function sum(x,y) {
  return x+y
}
var template = "<h1>I'm {{name}}</h1>";

function handlerBar(name) {
  return template.replace("{{name}}", name);
}
console.log(handlerBar("laughing"));

// 柯里化：
// 可以用做惰性求值
function addOne(y) {
  return sum(1 , y)
}
function handleBar2(template) {
  return function(data) {
    return template.replace("{{name}}", data.name);
  };
}
var t = handleBar2(`<h1>I'm {{name}}</h1>`);
console.log(t({name:'jack'}));

/**
 * 高阶函数：如果接受一个或多个函数输入或者输出一个函数，或者两个条件都满足
 */
var arr = []
//  输入一个函数
arr.sort(function () {})  //map filter reduce foreach
//  输出一个函数 bind


/**
 * 回调，将函数作为参数
 */


/**
 * 返回对象的函数就叫构造函数
 */

/**
 * 箭头函数
 */

setTimeout(function () {
  console.log(this);
  setTimeout(() => {
    console.log(this);
    
  }, 1000);
}.bind({name:'laughing'}), 1000);