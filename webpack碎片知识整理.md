### 1.关于NODE_ENV

通常情况下我们习惯将`npm run dev`和`npm run build`分别对应开发环境和生产环境

`package.json`文件中一般要设置mode值：`--mode=development`和`--mode=production`，

这里设置和webpack.config.js中设置mode是一个意思，官方文档说此时设置会将process.env.NODE_ENV设置为对应值，但是在webpack.config.js中打印值时并没有看到现象，在查证的过程中发现webpack文档的说法有两种，https://www.webpackjs.com/concepts/mode/的说法是：

> `webpack --mode=production` 会将 process.env.NODE_ENV 的值设为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。

而https://webpack.docschina.org/concepts/mode/的说法是：

> `webpack --mode=production` 会将 `DefinePlugin` 中 `process.env.NODE_ENV` 的值设置为 `development`。启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`

细微差别但是实际差很多，如果按照前者所说，在`webpack.config.js`中应该直接获取到`NODE_ENV`的值，实际并没有获取到。

由此可见并不能通过`--mode=development`的值设置全局process.env.NODE_ENV，那么只能通过NODE_ENV=development和NODE_ENV=production来设置了。

### 2.cross-env
windows在使用NODE_ENV=production时会报异常，因此需要使用cross-env进行设置

### 3.loader相关说明

- loader全部都写在module的rules里
- 常见的loader有：
  - babel-loader（处理js，可以将ES6语法转为ES5以下），
  - css-loader等，包括less-loader和style-loader，处理样式，支持样式引用和less语法，
  - url-loader，处理样式中的图片和字体处理
  - html-withimg-loader，处理html中的本地图片（一般将图片资源放在oss上）

### 4.文件路径问题

- 起因：路径填写的是基于开发时的路径，在打包成一个文件后路径修改为基于html 文件的，这时需要使用url-loader，然而在css文件中引入img时，会因为url-loader的设置引起错误
- 不想写了，这人写的挺好的看这个吧 https://juejin.im/post/5b8d1e926fb9a019b66e4657

###  5.package设置script问题



### 6.自定义插件

插件中必须有apply方法，否则在使用插件时会报错：

```bash
Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
- configuration.plugins[0] misses the property 'apply'.
function
   -> The run point of the plugin, required method.
```

### 常见拼写错误

例如`plugins`拼成`plugin`时：

```bash
-configuration has an unknown property 'plugin'
```

loader中

`options`的`presets`拼成了`preset`：

```bash
Error: Unknown option: .preset. Check out ······
```

