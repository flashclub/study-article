## vue-cli-service.js

### 1.找入口：

官方文档已经告诉入口了，在CLI服务章节，：

> 你可以在 npm scripts 中以 `vue-cli-service`、或者从终端中以 `./node_modules/.bin/vue-cli-service` 访问这个命令。

找到vue-cli-service，打开后看到`node  "%*~dp0*\..\@vue\cli-service\bin\vue-cli-service.js" %***`，继续去依赖的`@vue`下面找`vue-cli-service.js`，就找到入口文件了。

先从入口`vue-cli-service.js`看起。

### 2.前置知识点：process（进程）
>process 对象是一个全局变量，它提供有关当前Node.js进程的信息并对其进行控制。作为一个全局变量，它始终可供 Node.js 应用程序使用，无需使用 require()。
本例中用到的关于process的相关内容如下

-	`process.version`	返回字符串，Node.js的版本信息。
-	`process.exit(1)`	以退出状态 1 指示 Node.js 同步地终止进程。
-	`process.env`	返回对象，包含用户环境的对象。
-	`process.argv`	返回数组，前两项是node所在目录和当前文件所在目录，其余为当启动 Node.js 进程时传入的命令行参数。
-	`process.cwd()`	返回字符串， Node.js 进程的当前工作目录。

参考：[nodejs process(进程)](http://nodejs.cn/api/process.html)

### 2.前置知识点：第三方库

- `semver` 是一个语义化版本号管理的模块，实现了版本和版本范围的解析、计算、比较，`semver.satisfies('first','second') `方法可以比较first是否在second要求的范围内，返回布尔值。

  参考：[语义化版本控制模块-Semver](https://juejin.im/post/5a1ad2166fb9a044fd117874)，[npm-semver(1) -- The semantic versioner for npm](https://www.npmjs.com/package/semver)

- `minimist` 第三方库，nodejs的命令行参数解析工具，接收的两个参数分别为被解析参数和解析选项。

  参考： [minimist轻量级的命令行参数解析引擎](https://jarvys.github.io/2014/06/01/minimist-js/)，[npm-minimist](https://www.npmjs.com/package/minimist)

### 3.看源码：

*本例运行`npm run build`，并且`package.json`配置：`"build": "vue-cli-service build --no-clean --report --report-json"`，出于学习目的注释较多，可读性差一些请各位看官海涵*

```javascript
const semver = require("semver");
const { error } = require("@vue/cli-shared-utils");
const requiredVersion = require("../package.json").engines.node;

//  检查当前node版本是否符合要求
if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but vue-cli-service ` +
      `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  );
  process.exit(1);
}
// 	@vue/cli-service 并没有直接提供 serve， build 以及 inspect 等命令相关的服务， 而是动态注册内置服务和插件服务
const Service = require("../lib/Service"); // 核心的 Service.js

// 	实例化 Service
// 	console.log(17, process.env.VUE_CLI_CONTEXT, process.cwd());
//	17 undefined 'E:\\code\\what-is-vue\\engineering'
const service = new Service(process.env.VUE_CLI_CONTEXT || process.cwd());

/**
 * 输入npm run build时，查看package.json scripts.build设置，本例基于以下设置：
 * "build": "vue-cli-service build --no-clean --report --report-json",
 */
// console.log("20 vue-cli-service.js", process.argv);
/*20 vue-cli-service.js
 *['C:\\Program Files\\nodejs\\node.exe',
 *"E:\\code\\what-is-vue\\engineering\\node_modules\\@vue\\cli-service\\bin\\vue-cli-service.js",
 *"build", "--no-clean", "--report", "--report-json"];
 * */

const rawArgv = process.argv.slice(2);
//console.log(rawArgv); //[ 'build', '--no-clean', '--report', '--report-json' ]

const args = require("minimist")(rawArgv, {
  boolean: [
    // build
    "modern",
    "report",
    "report-json",
    "watch",
    // serve
    "open",
    "copy",
    "https",
    // inspect
    "verbose"
  ]
});
// console.log("77 vue-cli-service.js ", args);
/*	77 vue-cli-service.js
  { 
    _: [ 'build' ],
    modern: false,
    report: true,
    'report-json': true,
    watch: false,
    open: false,
    copy: false,
    https: false,
    verbose: false,
    clean:false 
  }
  args生成的规则参见minimist的源码
*/
const command = args._[0]; //'build'
// 	build 默认对应production serve 默认对应 --mode development
// 	console.log("48 vue-cli-service.js", command, args, rawArgv);
//  三个参数分别是'build'，args见上面，['build', '--no-clean', '--report', '--report-json']
service.run(command, args, rawArgv).catch(err => {
  error(err);
  process.exit(1);
});
```

### 4.vue-cli-service总结
vue-cli-service总共做了两件事：

- 实例化Service.js
- 运行service.run()，将启动的方式和参数通过run传递到实例中

## Service.js

### 5.Service.js

先看引入的模块。为了方便后面理解，作为一个前端小菜鸟，只用过几个nodejs核心库的我来说很多库都不怎么熟悉，所以特意搜了一些资料，将这些模块在`Service.js`中用到的功能罗列一下：

```javascript
const fs = require("fs");			//fs     核心库  文件系统
const path = require("path");	//path   核心库  路径
const debug = require("debug");		//debug  第三方库  [Nodejs 进阶：用 debug 模块打印调试日志](https://juejin.im/post/58fe94e55c497d00580ca7c5)
const chalk = require("chalk");		//chalk  第三方库  作用是修改控制台中字符串的样式，比如这里面用到的加粗什么的(git bash看不出效果，cmd可以) [Node模块--chalk](https://segmentfault.com/a/1190000011808938)
const readPkg = require("read-pkg");	//read-pkg   第三方库	读package.json用到的
const merge = require("webpack-merge");	//webpack-merge	第三方库
const Config = require("webpack-chain");//webpack-chain 第三方库 可以开始创建一个webpack的配置
const PluginAPI = require("./PluginAPI");//
const dotenv = require("dotenv");	//第三方库，可以让node.js从文件中加载环境变量
const dotenvExpand = require("dotenv-expand");
const defaultsDeep = require("lodash.defaultsdeep");
const { warn, error, isPlugin, loadModule } = require("@vue/cli-shared-utils");
const { defaults, validate } = require("./options");
```

- path使用：

  1. path.join() 方法使用平台特定的分隔符作为定界符将所有给定的 path 片段连接在一起，然后规范化生成的路径，eg:path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');返回: '/foo/bar/baz/asdf'
  2. path.resolve()  方法将路径或路径片段的序列解析为绝对路径。参数从右向左拼接

  核心库参考链接：[Node.js v10.16.3 文档](http://nodejs.cn/api/)

### 6.实例化Service时：

主要运行了`resolvePkg`，`resolvePlugins`，`resolvePlugins`主要是准备一些东西：初始化命令的可用配置和项目一些参数，例如

```javascript
[ { id: 'built-in:commands/serve', apply: { [Function] defaultModes: [Object] } },
  { id: 'built-in:commands/build', apply: { [Function] defaultModes: [Object] } },
  { id: 'built-in:commands/inspect', apply: { [Function] defaultModes: [Object] } },
  { id: 'built-in:commands/help', apply: [Function] },
  { id: 'built-in:config/base', apply: [Function] },
  { id: 'built-in:config/css', apply: [Function] },
  { id: 'built-in:config/dev', apply: [Function] },
  { id: 'built-in:config/prod', apply: [Function] },
  { id: 'built-in:config/app', apply: [Function] },
  { id: '@vue/cli-plugin-babel', apply: [Function] },
  { id: '@vue/cli-plugin-eslint', apply: [Function] } ]

```



继续看run中的内容：

```javascript
async run (name, args = {}, rawArgv = []) {
    // resolve mode
    // prioritize inline --mode
    // fallback to resolved default modes from plugins or development if --watch is defined
    // 这里面主要是区分运行环境模式，build:production，serve:development 
    const mode = args.mode || (name === 'build' && args.watch ? 'development' : this.modes[name])
    
    // load env variables, load user config, apply plugins
    // 加载 env 变量，加载用户配置，应用插件
    this.init(mode)
    
    args._ = args._ || []
    let command = this.commands[name]	//将command[]
    if (!command && name) {
      error(`command "${name}" does not exist.`)
      process.exit(1)
    }
    if (!command || args.help || args.h) {
      command = this.commands.help
    } else {
      args._.shift() // remove command itself
      rawArgv.shift()
    }
    const { fn } = command
    return fn(args, rawArgv)
  }
```

这个run()最后运行了fn()，fn是从command产生的，command最初由this.commands赋值，后面根据情况不同有再次赋值的可能。我们先看不会再次赋值的情况，这时取决于this.commands（暂时未知this.commands是如何生成的）。

参考资料：

1. [NPM酷库：dotenv，从文件加载环境变量](https://segmentfault.com/a/1190000012826888)
2. [webpack-生产环境构建](https://www.webpackjs.com/guides/production/)

