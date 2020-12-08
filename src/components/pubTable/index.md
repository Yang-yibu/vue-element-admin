```js
props.options = {
  maxHeight: null,
  border: '不设置此属性，考虑整个系统中的 Table 应是统一的样式'
}
props.column = [
  {
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
