## Props

- `table-class` 外部样式类，在 `el-table` 同一元素上设置 `class`

- `options` 其他配置项

```js
props.options = {
  maxHeight: null,
  border: '不设置此属性，考虑整个系统中的 Table 应是统一的样式',
  size: 'el-table 的 size 属性',
  headerCellClassName: '',
  spanMethod: ''
}
```

- `column` 表头配置

```js
props.column = [
	{
		label: '列表头文字',
		dataIndex: '',
		slot: '插槽名；使用插槽渲染单元格数据',
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

## Method

### 操作函数

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
