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

- semver 是一个语义化版本号管理的模块，实现了版本和版本范围的解析、计算、比较，`semver.satisfies('first','second') `方法可以比较first是否在second要求的范围内，返回布尔值。

  参考：[语义化版本控制模块-Semver](https://juejin.im/post/5a1ad2166fb9a044fd117874)，[npm-semver(1) -- The semantic versioner for npm](https://www.npmjs.com/package/semver)

- minimist 第三方库，nodejs的命令行参数解析工具，接收的两个参数分别为被解析参数和解析选项。

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

### 4.总结
vue-cli-service总共做了两件事：

- 实例化Service.js
- 运行service.run()，将启动的方式和参数通过run传递到实例中

下篇文章我将详解实例化`Service.js`和运行`service.run()`做了什么，敬请期待