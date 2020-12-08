<template>
  <div style="width: 400px;">
    <el-button type="primary" style="margin-top: 10px" size="mini" @click="submit">{{ hasCusWater? '取消水印': '添加水印' }}</el-button>
  </div>
</template>

<script>
import { watermark as cusWaterMatrk } from '@/components/Watermark'

/**
 * 自动以水印
 *
 * 1. 实现可以取消水印方法
 */
export default {
  name: 'PageCusWatermark',
  data() {
    return {
      hasCusWater: false
    }
  },
  mounted() {
    if (window.cusWaterMatrk) {
      this.hasCusWater = true
    } else {
      this.hasCusWater = false
    }
  },
  methods: {
    cusWaterMatrk,
    submit() {
      if (!window.cusWaterMatrk) {
        this.$message.success('添加水印成功')
        window.cusWaterMatrk = this.cusWaterMatrk({ text: '' })
        this.hasCusWater = true
      } else {
        window.cusWaterMatrk.isObserver = true
        const selfNode = document.getElementById(window.cusWaterMatrk.CONTAINERID)
        selfNode.parentElement.removeChild(selfNode)
        window.cusWaterMatrk = null
        this.hasCusWater = false
      }
    }
  }
}
</script>
