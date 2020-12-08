```js
props.options = {
  maxHeight: null,
  border: '不设置此属性，考虑整个系统中的 Table 应是统一的样式'
}
props.column = [
  {
    label: '列表头文字',
    dataIndex: '',
    slot: '插槽名；使用插槽渲染单元格数据'
  },
  {
    className: '',
    btnType: '统一这只 btn 的 type 类型，防止与表格行属性 type 冲突',
    operate: [
      {
        name: '分析',
        type: 'text',
        className: 'btn-default',
        func: 'actionAnalyse'
      }
    ]
  }
]

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
