## 待完善

- [ ] 添加底部页码；调用只需传入相关页码属性
- [ ] 添加空白页
- [ ] 设置最大高度、高度占满当前页剩余空间

## Props

- `table-class` 外部样式类，在 `el-table` 同一元素上设置 `class`

- `options` 其他配置项

```js
props.options = {
  maxHeight: null,
  border: '不设置此属性，考虑整个系统中的 Table 应是统一的样式',
  size: 'el-table 的 size 属性',
  headerCellClassName: '',
  spanMethod: '',
  showHeader: ''
}
```

- `column` 表头配置

```js
props.column = [
	{
		label: '列表头文字',
		dataIndex: '',
		slot: '插槽名；使用插槽自定义单元格内容',
		showOverflowTooltip: true, // 使用 el-table-colum 自带的 tooltip
		renderHeader: 'header 渲染函数；注：通过 header#slot 封装不成功，原因不详',
	},
	{
		label: '列名，默认“操作“',
		dataIndex: '默认 operate',
		className: '',
		btnType: '统一设置 btn 的 type 类型，防止与表格行属性 type 冲突；el-button type 属性',
		operate: [
			{
				name: '按钮文字',
				type: 'btn type 类型',
				className: 'btn-default',
				func: 'actionAnalyse'
			}
		]
	}
];

{
	className: 'primary-text',
	btnType: 'text',
	minWidth: '100',
	operate: [
		{
			name: '查看',
			func: 'actionView'
		}
	]
}
```

- `data` 表格数据

```js
props.data = [
  {
    operate: [{ name: '', disabled: true }] // 支持单行数据配置重新排序设置操作按钮是否禁用
  }
]
```

## slot 插槽

### 其他

```js
{ lable: '列名', slot: '插槽名' }
```

```vue
// scope: { row, $index, column } // scope 可以使用 JS 解构语法
<template slot="插槽名" slot-scope="scope">
  <!-- {{ rowAppalyStatus(scope.row) }} -->
  <span>{{ scope.row.status }}</span>
</template>
```

### 特定具名插槽 typeExpand

当 column 的 type 为 expand 时使用

## Method

### Btn 操作 operate 函数

这两种方式会同时触发

#### 单独触发通知

```html
<pub-table @actionA="actionA" />
```

```js
methods = {
  /**
   * @param {} idxRow.index - 当前行下标
   * @param {} idxRow.row - 当前行数据
   */
  actionA(idxRow) {}
}
```

#### 一起触发通知

```html
<pub-table @click-btns="handleBtns" />
```

```js
methods = {
  /**
   * @param {} idxRow.func - operate 中的 func 属性
   * @param {} idxRow.index - 当前行下标
   * @param {} idxRow.row - 当前行数据
   */
  handleBtns(idxRow) {}
}
```
