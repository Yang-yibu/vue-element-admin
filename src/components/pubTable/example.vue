<template>
  <div class="pub-table-example">
    <h3>EL-Table 二次封装示例</h3>

    <el-collapse v-model="collapseIdx">
      <el-collapse-item title="展开行功能" name="1">
        <pub-table class="notExpandCellPadTB" :options="{ showHeader: false }" :column="table1.column" :data="table1.data">
          <template slot="typeExpand" slot-scope="{ row }">
            <el-row :span="24">
              <el-col :span="8" class="total-box">
                <p class="total-title">待处理申诉</p>
                <p class="total-num">{{ row.dclss }} 个</p>
              </el-col>
              <el-col :span="8" class="total-box">
                <p class="total-title">事中预警次数</p>
                <p class="total-num">{{ row.szyj }} 次</p>
              </el-col>
              <el-col :span="8" class="total-box">
                <p class="total-title">事后抽查问题</p>
                <p class="total-num">{{ row.shcc }} 个</p>
              </el-col>
            </el-row>
          </template>
        </pub-table>
      </el-collapse-item>

      <el-collapse-item title="其他类型 Type" name="2">
        <pub-table :column="table2.column" :data="table2.data" />
      </el-collapse-item>

      <el-collapse-item title="组件基本用法" name="3">
        <ul>
          <li>自定义单元格、设置单元格对其方式（或只有表头对齐）、最小最大宽度、监听操作列点击事件、不同行操作列显示不同内容（是否禁用、显示顺序）</li>
          <li>show-page 是否显示分页器</li>
        </ul>
        <!-- 示例一 -->
        <pub-table show-page style="padding-top: 16px" :loading="tableData1.loading" :column="tableData1.column" :data="tableData1.data" :page="tableData1.page" @click-btns="handleBtns" @page-current-change="onChangePage">
          <!-- 自定义单元格内容 -->
          <template slot="slotStatus" slot-scope="scope">
            <!-- {{ rowAppalyStatus(scope.row) }} -->
            <i :class="`icon-status ${statusMap[scope.row.status].icon}`" />
            <span>{{ statusMap[scope.row.status].text }}</span>
          </template>
        </pub-table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import PubTable from './index'

export default {
  name: 'PubTableExample',
  components: { PubTable },
  data() {
    return {
      collapseIdx: '3',
      table1: {
        column: [{ type: 'expand', width: 50 }, { label: '项目名称', dataIndex: 'xmmc', minWidth: 200 }],
        data: [
          {
            id: 1,
            xmmc: '肇庆扶贫小哥信贷资金项目',
            dclss: 5,
            szyj: 2,
            shcc: 9
          },
          {
            id: 2,
            xmmc: '汕头市农机补贴购置资金补贴项目',
            dclss: 5,
            szyj: 2,
            shcc: 9
          }
        ]
      },
      table2: {
        column: [
          { type: 'selection', align: 'center', width: 50 },
          { label: '申报项目名称', dataIndex: 'sbxmmc', minWidth: 150 },
          { label: '所属政策', dataIndex: 'sszc', minWidth: 150 },
          { label: '主管部门', dataIndex: 'zgbm', minWidth: 100 }
        ],
        data: [
          {
            id: '1',
            sbxmmc: '广州市疫情防控重点保障企业优惠贷款项目',
            sszc: '广州市疫情防控重点保障企业优惠到款',
            zgbm: '广东省科学技术厅'
          },
          {
            id: '2',
            sbxmmc: '深圳市阶段性减免缓征企业医疗保险费',
            sszc: '深圳市人力资源和社会保障局关于阶段性减免缓征企业医疗保险费',
            zgbm: '广州市财政局'
          }
        ]
      },
      statusMap: [{ icon: 'icon-1', text: '审批中' }, { icon: 'icon-2', text: '已审批' }],
      tableData1: {
        loading: false,
        column: [
          // el-table 自己的 index 序号；此序号不满足可自定义列
          // 还可以通过提供 dataIndex="idx"; 数据中使用 idx 渲染序号
          { label: '序号', type: 'index', width: 80, align: 'center' },
          { label: '标题', dataIndex: 'title', minWidth: 200 },
          { label: '申请类型', dataIndex: 'appalyType', width: 120 },
          { label: '发起时间', dataIndex: 'startTime', width: 140 },
          { label: '流转状态', dataIndex: 'status', width: 150, slot: 'slotStatus' },
          {
            className: 'btn-default',
            btnType: 'text',
            width: 100,
            headerAlign: 'center',
            operate: [{ name: '催办', func: 'btnUrging' }, { name: '删除', className: 'btn-danger', func: 'btnDel' }]
          }
        ],
        data: [
          { id: 1, title: '采购申请-1', appalyType: '用章申请', startTime: '2020-05-29', status: '0' },
          { id: 2, title: '采购申请-2', appalyType: '用章申请', startTime: '2020-05-29', status: '1', operate: [{ name: '删除', disabled: true }] },
          { id: 3, title: '采购申请-3', appalyType: '用章申请', startTime: '2020-05-29', status: '0', operate: ['删除', '催办'] }
        ],
        page: {}
      }
    }
  },
  methods: {
    onChangePage(val) {
      window.console.log(val)
      this.tableData1.page.current = val
    },
    rowAppalyStatus(row) {
      // return this.statusMap[row.status];
      const statusTxt = this.statusMap[row.status]
      return (
        <div>
          <i class={`icon-status ${statusTxt.icon}`} />
          <span>{statusTxt.text}</span>
        </div>
      )
    },
    handleBtns({ func, row, index }) {
      switch (func) {
        case 'btnUrging': {
          this.$message.success(`第 ${index} 行 - 催办操作： ${row.title}`)
          break
        }
        case 'btnDel': {
          this.$message.error(`第 ${index} 行 - 删除操作： ${row.title}`)
          break
        }
        default: {
          break
        }
      }
    }
  }
}
</script>

<style lang="scss">
.pub-table-example {
  padding: 0 16px;
}
</style>
