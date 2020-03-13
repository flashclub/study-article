1. v-if和v-show的区别

>  v-show是css样式上的切换，，v-if是完整的销毁和重新创建。
> 使用 频繁切换时用v-show，运行时较少改变时用v-if
> v-if=‘false’ v-if是条件渲染，当false的时候不会渲染
>

2. 为何在v-for中用key

3. 组件生命周期（包含父子）

4. 组件如何通讯（常见）
> 父子 props/event $parent/$children ref provide/inject
> 兄弟 bus vuex
> 跨级 bus vuex provide inject
5. 描述组件渲染和更新的过程

6. 双向数据绑定v-model 的实现原理
7. 对MVVM的理解
> 提MVVM就不得不提MVC，模型 视图 控制器，视图将指令传给控制器，控制器修改数据，数据渲染到视图上，MV VM是model，view，viewmodel，视图的变动反应在viewmodel上，viewmodel让model修改数据，model修改好之后传递给vm，vm再渲染到视图上
8. computed有何特点
9. 为何组件data必须是一个函数
10. ajax请求应该放在哪个声明周期
11. 如何将组建所有props传递给子组件
12. 如何自己实现v-model
13. 多个组件有相同的逻辑，如何抽离
14. 何时使用异步组件
15. 何时使用keep-alive
16. 何时需要使用beforeDestory
17. 什么是作用域插槽
18. Vuex中的action 和mutation有何区别
19. vue-router常用的路由模式
20. 如何配置vue-router异步加载
21. 用vnode描述一个DOM结构
22. 监听data变化的核心api是什么
23. Vue如何监听数组变化
24. 请描述响应式原理
25. diff算法的时间复杂度
26. 简述diff算法过程
27. vue为何是异步渲染， $nextTick有何用
28. Vue常用性能优化