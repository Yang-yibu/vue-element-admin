<template>
  <div class="app-container">
    <el-card>
      <div slot="header">Element-UI 可编辑表格实例</div>
      <el-edit-table />
    </el-card>

    <el-card style="margin-top: 20px">
      <div slot="header">i-view 可编辑表格示例</div>
      <i-edit-table />
    </el-card>

    <el-card style="margin-top: 20px">
      <div slot="header">i-view 可编辑表格示例</div>
      <i-edit-table1 />
    </el-card>

  </div>
</template>

<script>
import IEditTable from './components/i-edit-table'
import IEditTable1 from './components/i-edit-table1'
import ElEditTable from './components/el-edit-table'

export default {
  name: 'InlineEditTable',
  components: { IEditTable, ElEditTable, IEditTable1 }
}
</script>
