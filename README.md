# 键盘车神教易车金港圈速榜

参考教主的[锐思榜单](https://kbracer.github.io/)样式，使用[React](https://github.com/facebook/react/)和[Ant Design 组件](https://github.com/ant-design/ant-design/)实现。

### 实现功能

1. 榜单数据展示（分原厂和改装两个榜单）；
2. 车辆实时筛选（不区分大小写）；
3. 特殊车型单独显示（SUV 和电车），且和车辆筛选可同时起作用；
4. 根据圈速分级显示每列背景色（分级标准待优化）；
5. 前后轮胎型号宽度显示（不同则分开显示，相同则合并显示）；
6. 响应式布局；
7. 首行固定；
8. 不同榜单切换；
9. 根据多个数据源生成总榜单；
10. 专题高亮；
11. 分页开关。

### 待实现功能

1. Safari 对 table-row 元素背景渐变渲染有 bug，待寻找更好的方法来兼容。

### 不再考虑实现的功能

1. 动画背景；
2. 动态效果说明书按钮；
3. 根据改装程度和车型级别显示（现榜单无此两项数据，且改装程度定义不一样）。
