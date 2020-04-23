### 1.阶段解读

首先上vue官网的图片

![](https://cn.vuejs.org/images/lifecycle.png)

这个图片除了反复看之外最好的办法是动手敲一遍甚至几遍。好像说了废话哈，谁学新东西不实际动手敲几遍呢？下面就发一些我实践的思路，大家可以参考看看，大佬请忽略。

直接上代码：

```html
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div id="app"></div>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
  <script>
    new Vue({
      template:'<div>示例demo<img src="https://cn.vuejs.org/images/lifecycle.png" alt=""></div>',
      data:{
        a:''
      },
      beforeCreate() {
        console.log('beforecreate');
      },
      created() {
        console.log('created');
      },
      beforeMount() {
        console.log('beforemount');
      },
      mounted() {
        console.log('mounted');
      },
      beforeUpdate() {
        console.log('beforeupdate');
      },
      updated() {
        console.log('updated');
      },
      beforeDestroy() {
        console.log('beforedestroy');
      },
      destroyed() {
        console.log('destroyed');
      },
    })
  </script>
</body>
</html>
```

上面的代码主要解释了`beforeCreate`和`created`的触发机制问题：在挂载实例之前只触发这两个钩子

将上述代码在浏览器中打开，会发现只打印了`beforecreate`和`created`，聪明的你肯定想到了这是因为没有挂载`el`才出现了这个原因，这时可以在实例外面通过`.$mount('#app')`的方式挂载实例

