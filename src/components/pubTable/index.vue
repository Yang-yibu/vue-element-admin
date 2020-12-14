<template>
  <div v-loading="loading" class="pub_table">
    <el-table
      ref="pub-table"
      :class="tableClass"
      :data="data"
      :border="true"
      stripe
      :size="options.size"
      :header-cell-class-name="options.headerCellClassName"
      :row-class-name="options.rowClassName"
      :cell-class-name="options.cellClassName"
      :span-method="options.spanMethod"
      :show-header="options.showHeader"
      :row-key="options.rowKey || 'id'"
      :max-height="options.maxHeight"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="$_selectionChange"
      @select="$_select"
      @select-all="$_selectAll"
    >
      <template v-for="item in column">
        <el-table-column
          v-if="item.type === 'expand'"
          :key="item.dataIndex"
          :prop="item.dataIndex"
          :type="item.type"
          :label="item.label && item.label"
          :header-align="item.headerAlign"
          :fixed="item.fixed"
          :align="item.align"
          :sortable="item.sortable"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
        >
          <template slot-scope="{ row, $index, column }">
            <!--  v-if="$scopedSlots.typeExpand"  -->
            <slot name="typeExpand" :row="row" :$index="$index" :column="column" />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.type"
          :key="item.dataIndex"
          :prop="item.dataIndex"
          :type="item.type"
          :label="item.label && item.label"
          :header-align="item.headerAlign"
          :fixed="item.fixed"
          :align="item.align"
          :sortable="item.sortable"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
        />

        <!-- 操作区 -->
        <el-table-column
          v-else-if="item.operate || item.slot === 'operate'"
          :key="item.dataIndex || 'operate'"
          :label="item.label || '操作'"
          :header-align="item.headerAlign"
          :fixed="item.fixed"
          :align="item.align"
          :width="item.width"
          :min-width="item.minWidth"
        >
          <template slot-scope="scope">
            <slot name="operate" v-bind="scope">
              <template v-if="item.operate && item.operate.length">
                <template v-if="scope.row.operate">
                  <el-button
                    v-for="(v, i) in useRowOperate(scope.row.operate, item.operate)"
                    :key="i"
                    :type="v.type || item.btnType"
                    size="mini"
                    :class="v.className || item.className"
                    :style="v.style || item.style"
                    :disabled="v.disabled"
                    @click.native.prevent.stop="$_buttonMethods(v.func, scope.$index, scope.row)"
                  >{{ v.name }}</el-button>
                </template>
                <el-button
                  v-for="(v, i) in item.operate"
                  v-else
                  v-show="buttonToggle(v.show, scope.row, v.name)"
                  :key="i"
                  :type="v.type || item.btnType"
                  size="mini"
                  :class="v.className || item.className"
                  :style="v.style || item.style"
                  @click.native.prevent.stop="$_buttonMethods(v.func, scope.$index, scope.row)"
                >{{ v.name }}</el-button>
              </template>
            </slot>
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :key="item.dataIndex"
          :prop="item.dataIndex"
          :type="item.type"
          :label="item.label && item.label"
          :header-align="item.headerAlign"
          :fixed="item.fixed"
          :align="item.align"
          :sortable="item.sortable"
          :width="item.width"
          :min-width="item.minWidth"
          :formatter="item.formatter"
          :show-overflow-tooltip="item.showOverflowTooltip"
          :render-header="item.renderHeader"
        >
          <!-- <template v-if="item.headerSlot">
            <template slot="header" slot-scope="scope">
              {{
                (function(row) {
                  debugger
                })([item, scope])
              }}
              <slot :name="item.headerSlot" :column="scope.column" />
            </template>
          </template> -->

          <template slot-scope="{ row, $index, column }">
            <template v-if="item.slot">
              <slot :name="item.slot" :row="row" :$index="$index" :column="column" />
            </template>

            <!-- scope = { row, $index, column } -->
            <!-- {{ (function (row) { debugger }(row)) }} -->
            <template v-else-if="item.dataIndex === 'idx'">{{ row[item.dataIndex] }}</template>
            <template v-else-if="item.dataIndex === 'title' && row.idx">
              <div style="padding-left: 16px">{{ row[item.dataIndex] }}</div>
            </template>
            <template v-else>{{ row[item.dataIndex] }}</template>
          </template>

          <template v-if="item.children && item.children.length">
            <el-table-column
              v-for="v in item.children"
              :key="v.dataIndex"
              :prop="v.dataIndex"
              :type="v.type"
              :label="v.label && v.label"
              :header-align="v.headerAlign || item.headerAlign"
              :align="v.align || item.align"
              :sortable="v.sortable || item.sortable"
              :width="v.width || item.width"
              :min-width="v.minWidth || item.minWidth"
              :show-overflow-tooltip="v.showOverflowTooltip"
            />
          </template>
        </el-table-column>
      </template>
      <!-- <template slot="empty">
        <CusEmpty isTableCenter />
      </template> -->
    </el-table>

    <div v-if="showPage" :class="`space-box pages-box pages-${page.align || 'right'} ${pageClass}`">
      <slot name="page-left" />
      <el-pagination :current-page="page.current * 1" :page-size="page.pageSize || 10" layout="total, prev, pager, next, slot" :total="page.total || 0" @current-change="onChangeCurrent">
        <span
          class="el-pagination__jump"
        >前往
          <div class="el-input el-pagination__editor is-in-pagination">
            <input v-model="jumperVal" type="number" autocomplete="off" min="1" :max="jumperMax" class="el-input__inner">
          </div>
          页</span>
      </el-pagination>
      <el-button type="primary" class="pub_button" size="small" @click="handleJumpSure(jumperVal)">确定</el-button>
      <slot name="page-right" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PubTable',
  props: {
    // 调用组件时传入的 class style 等作用在 pub_table 同级
    tableClass: {
      type: String,
      default: ''
    },
    pageClass: {
      type: String,
      default: ''
    },
    showPage: Boolean,

    // <el-table> 上的其他配置项
    options: {
      type: Object,
      default: () => ({})
    },
    // 分页器配置
    page: {
      type: Object,
      default: () => ({})
    },

    loading: {
      type: Boolean,
      default: false
    },
    column: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    toggle: {
      type: Function,
      default: () => false
    }
  },
  data() {
    return {
      jumperVal: null
    }
  },
  computed: {
    jumperMax() {
      const max = this.page.total / (this.page.pageSize || 10)
      return max > 0 ? max : 1
    }
  },
  watch: {
    jumperVal(newVal) {
      if (newVal > this.jumperMax) {
        this.jumperVal = this.jumperMax
      }
      if (newVal === '0') {
        this.jumperVal = 1
      }
    }
  },
  methods: {
    handleJumpSure(val) {
      const rVal = val || this.page.current
      if (val > this.jumperMax) {
        val = this.jumperMax
      }
      this.$emit('page-current-change', rVal)
    },
    onChangeCurrent(val) {
      this.$emit('page-current-change', val)
    },
    $_select(selection, row) {
      this.$emit('select', selection, row)
    },
    $_selectAll(selection) {
      this.$emit('select-all', selection)
    },
    $_selectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    $_buttonMethods(func, index, row) {
      // const that = this;
      // const { methods } = this.$options;
      // methods[func](index, row, that);

      func && this.$emit('click-btns', { func, index, row })
      func && this.$emit(func, { index, row })
    },

    buttonToggle(show, row, name) {
      if (show) {
        return this.toggle(row, name)
      }
      return true
    },
    /**
     * 使用行数据中的 operate 属性对操作按钮进行控制
     *
     * @param {{name: string, disable: boolean}[]} rowOperate - 当前行的 operate 属性
     * @param {{}} originOperate
     * @returns {[]} newOperate
     */
    useRowOperate(rowOperate, originOperate) {
      if (!Array.isArray(rowOperate)) {
        return []
      }

      const originMap = {}
      originOperate.map(v => {
        originMap[v.name] = v
      })
      // 数据示例 [{name: '导出', disabled: true}]
      // disable 就是 el-btn 上的禁用属性
      const newOperate = rowOperate.map(v => {
        if (typeof v === 'string') {
          return { ...originMap[v], disabled: false }
        }
        return { ...originMap[v.name], disabled: v.disabled || false }
      })
      return newOperate
    }
  }
}
</script>
