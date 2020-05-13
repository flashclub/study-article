create-react-app



- `npm eject`开启配置 包括webpack配置

- React 中重要的知识点：
  1. 不可变值：setState中传入一个新的值，替换原来的值，而不是改变原来的值
  2. setState有时是同步的有时是异步的，如果在回调函数里或者，setTimeout使用setState或者在原生事件中是同步的，如果直接使用setState下面写逻辑，那么是异步的
  3. 为什么会是这种情况，这要从isBatchingUpdate说起

