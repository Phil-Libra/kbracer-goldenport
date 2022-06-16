# 键盘车神教易车金港榜单

参考教主的[锐思榜单](https://kbracer.github.io/)样式，使用[React](https://github.com/facebook/react/)和[Ant Design 组件](https://github.com/ant-design/ant-design/)实现。

### 实现功能

1. 榜单数据展示（分原厂和改装两个榜单）；
2. 车型实时筛选（不区分大小写）；
3. 根据圈速分级显示每列背景色（分级标准待优化）；
4. 前后轮胎型号宽度显示；
5. 响应式布局。

### 待实现功能

1. 分页开关（已完成，数据多了以后启用）；
2. 榜单切换（已完成，两个榜单数据多了以后启用）；
3. 首行固定（因 Chrome 89.0.4350.0 以前版本 及 Safari 兼容性问题，且暂时数据较少不需要，暂未启用）；
4. Safari 对 table-row 元素背景渐变渲染有 bug，待寻找更好的方法来兼容。

### 不再考虑实现的功能

1. 动画背景；
2. 动态效果说明书按钮；
3. 根据改装程度和车型级别显示（现榜单无此两项数据，且改装程度定义不一样）。
