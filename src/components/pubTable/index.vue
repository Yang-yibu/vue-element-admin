<template>
  <div v-loading="options.loading" class="pub_table">
    <el-table
      ref="pub-table"
      :data="data"
      :border="true"
      stripe
      :row-key="options.rowKey || 'id'"
      :max-height="options.maxHeight"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      @selection-change="handleSelectionChange"
    >
      <template v-for="item in column">
        <el-table-column
          v-if="item.type"
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
          v-else-if="item.operate && item.operate.length"
          :key="item.dataIndex"
          label="操作"
          :header-align="item.headerAlign"
          :fixed="item.fixed"
          :align="item.align"
          :sortable="item.sortable"
          :width="item.width"
          :min-width="item.minWidth"
        >
          <template v-if="item.operate && item.operate.length" slot-scope="scope">
            <!-- {{ (function (row) { debugger }(scope)) }} -->
            <el-button
              v-for="(item, index) in item.operate"
              :key="index"
              :type="item.type"
              size="mini"
              :class="item.className"
              @click.native.prevent.stop="buttonMethods(item.func, scope.$index, scope.row)"
            >
              {{ item.name }}
            </el-button>
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
        >
          <template slot-scope="{ row }">
            <!-- scope = { row, $index, column } -->
            <!-- {{ (function (row) { debugger }(row)) }} -->
            <template v-if="item.dataIndex === 'idx'">{{ row[item.dataIndex] }}</template>
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
  </div>
</template>

<script>
export default {
  name: 'PubTable',
  props: {
    // <el-table> 上的其他配置项
    options: {
      type: Object,
      default: () => ({})
    },
    column: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    handleSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    buttonMethods(func, index, row) {
      // const that = this;
      // const { methods } = this.$options;
      // methods[func](index, row, that);
      this.$emit(func, { index, row })
    }
  }
}
</script>
