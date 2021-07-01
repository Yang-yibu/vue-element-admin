<template>
  <div class="pub_dialog">
    <el-dialog :visible.sync="visibleDialog" v-bind="$props" size="small" v-on="$listeners">
      <slot />
      <slot name="footer">
        <template slot="footer">
          <el-button type="primary" :class="`pub_button ${confirmClass}`" size="small" @click.stop="onConfirm">{{ confirmTxt }}</el-button>
          <el-button plain type="primary" :class="`pub_button ${cancelTxt}`" size="small" @click.stop="$emit('update:visible', false)">{{ cancelTxt }}</el-button>
        </template>
      </slot>
    </el-dialog>
  </div>
</template>

<script>
import { Dialog } from 'element-ui'
export default {
  name: 'PubDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    confirmTxt: {
      type: String,
      default: '确定'
    },
    confirmClass: {
      type: String,
      default: ''
    },
    cancelTxt: {
      type: String,
      default: '取消'
    },
    cancelClass: {
      type: String,
      default: ''
    },
    ...Dialog.props
  },
  data() {
    return {}
  },
  computed: {
    visibleDialog: {
      get() {
        return this.visible
      },
      set() {
        this.$emit('update:visible')
      }
    }
  },
  methods: {
    onConfirm() {
      this.$emit('click-confirm')
    }
  }
}
</script>
