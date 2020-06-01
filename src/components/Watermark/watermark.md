
## 水印组件

来源：aVue

函数组件

### 参数

| 参数      | 说明             | 类型   | 可选值 | 默认值                    |
| --------- | ---------------- | ------ | ------ | ------------------------- |
| text      | 水印显示的文字   | String | -      | 无敌大水印                |
| font      | 水印字体和大小   | String | -      | 30px 黑体                 |
| textAlign | 水印文本对齐方式 | String | -      | center                    |
| textStyle | 水印文本样式     | String | -      | rgba(100, 100, 100, 0.15) |
| degree    | 水印文本旋转角度 | String | -      | -20                       |

### 方法

| 方法名 | 说明         | 参数 |
| ------ | ------------ | ---- |
| this.Repeat(opt) | 重新绘制水印 | -    |


### 实现讲解

- Canvas 绘制文字内容，生成 dataUrl，用作背景图，开启 repeat 重复属性，被追加到 body 中
- 设置样式 `pointer-events: none;` 使得当前元素不会成为鼠标事件的 target
- 使用 MutationObserver 接口，监视对 DOM 树的修改，防止水印被删除