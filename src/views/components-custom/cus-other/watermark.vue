<template>
  <div style="width: 400px;">
    <el-button type="primary" style="margin-top: 10px" size="mini" @click="submit">添加水印</el-button>
  </div>
</template>

<script>
import { watermark as cusWaterMatrk } from '@/components/Watermark'

export default {
  name: 'PageCusWatermark',
  data() {
    return {}
  },
  methods: {
    cusWaterMatrk,
    submit() {
      this.$message.success('添加水印成功')
      var a = this.cusWaterMatrk({ text: '' })
      console.log(a)
    }
  }
}
</script>
