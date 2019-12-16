- 1 虚拟dom，目的：实现DOM元素的高效更新

tree diff

component diff

element diff

逐层对比

先进行tree



html用js来描述

节点的三大块：节点类型，节点数据，节点内容

- 节点类型
- 节点数据
- 节点内容：子节点的类型，
  - 没有子元素
  - 单个子元素
  - 多个子元素

渲染：

render函数：参数：要渲染的虚拟dom，容器

- 首次渲染
  - 元素节点
  - 文本节点
- 再次渲染