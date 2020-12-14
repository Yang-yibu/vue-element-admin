<template>
  <div class="pub_table">
    <pub-table
      ref="child1"
      show-page
      style="padding-top: 16px"
      :loading="tableData1.loading"
      :column="tableData1.column"
      :data="tableData1.data"
      :page="tableData1.page"
      @selection-change="selectionChange"
      @page-current-change="onChangePage"
    >
      <template #operate="scope">
        <div v-loading="scope.row.loading">
          <template v-if="scope.row.tabActive === '0'">
            <el-button type="text" size="mini" class="btn-default">编辑</el-button>
            <el-button type="text" size="mini" class="btn-default">提交</el-button>
          </template>

          <template v-if="scope.row.tabActive === '1'">
            <el-button type="text" size="mini" class="btn-default">审核</el-button>
            <el-button type="text" size="mini" class="btn-default">入库</el-button>
          </template>
        </div>
      </template>
    </pub-table>
  </div>
</template>
<script>
import pubTable from '../index'

export default {
  name: 'CustomOperate',
  components: {
    pubTable
  },
  data() {
    return {
      tableData1: {
        loading: false,
        column: [
          { type: 'selection', width: 45, align: 'center' },
          { label: '序号', type: 'index', width: 80, align: 'center' },
          { label: '标题', dataIndex: 'title', showOverflowTooltip: true, minWidth: 240 },
          { label: '发布机构', dataIndex: 'issueAgency', minWidth: 160 },
          { label: '发布时间', dataIndex: 'issueDate', width: 180 },
          {
            className: 'btn-default',
            btnType: 'text',
            width: 150,
            slot: 'operate'
            // operate: [
            // { name: '编辑', func: 'edit' },
            // { name: '查看', func: 'watch' },
            // { name: '审核', func: 'check' },
            // { name: '入库', func: 'put' }
            // ]
          }
        ],
        data: [],
        page: {
          pageSize: 10,
          current: 1,
          total: 0
        }
      }
    }
  },
  mounted() {
    this.getPolicyList()
  },
  methods: {
    getPolicyList(params) {
      this.tableData1.data = [
        { id: 1, title: '第一行', issueAgency: '2010-01-01', issueDate: '', tabActive: '0' },
        { id: 2, title: '第二行', issueAgency: '2020-01-01', issueDate: '', tabActive: '1' }
      ]
    }
  }
}
</script>
