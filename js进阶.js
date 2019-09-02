/**
 * 函数声明
 * 匿名 具名 箭头
 */

// 匿名函数 函数是个对象，fn1记录的是这个函数的地址
var fn1 = function () {
  
}

var fn2 = fn1 //  将函数的地址赋值给fn2
console.log(fn1.name,fn2.name);   //fn1 fn1
// 具名函数 作用域是整个文件
function fn3() {
  
}
console.log(fn3.name);

// fn4作用域是一部分
var fn5 = function fn4() {
  console.log('fn4内部');
}

// console.log(fn4);  //  报错 fn4 is not defined
console.log(fn5()); //fn4内部 undefined

// 箭头函数
var fn6 = i=>console.log(i);

console.log(fn6(1));
console.log(fn6.name);  //  


/**
 * 抽象词法树：不执行 只看语法
 */