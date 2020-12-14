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

      <el-collapse-item title="正常功能" name="2">
        <pub-table :column="table2.column" :data="table2.data" />
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
      collapseIdx: '1',
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
