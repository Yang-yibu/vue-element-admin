<template>
  <div class="example-com">
    <el-card class="box-card" header="弹窗组件示例" style="margin-top: 20px">
      <div class="space-box" style="display: flex">
        <el-button size="small" type="primary" @click="showDialog('dialog1')">示例一</el-button>
      </div>

      <pub-dialog title="示例弹窗一" width="67%" :visible.sync="dialog1">
        测试
      </pub-dialog>
    </el-card>
  </div>
</template>

<script>
import PubDialog from './index'

/**
 * 示例组件
 */
export default {
  name: 'PubTableExamples',
  components: { 'pub-dialog': PubDialog },
  data() {
    return {
      dialog1: false
    }
  },
  methods: {
    showDialog(dialogType) {
      this[dialogType] = true
    }
  }
}
</script>
