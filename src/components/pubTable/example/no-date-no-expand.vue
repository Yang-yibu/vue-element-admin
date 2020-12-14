<template>
  <div class="office-sup-purchase">
    <div class="pub_table--tip">共添加 <em>XXX</em> 类 <em>XXX</em> 件办公用品</div>
    <pub-table :options="tableOpt" :column="tableColumn" :data="tableData" @handleRowDel="handleRowDel">
      <template slot="typeExpand" slot-scope="{ row }">
        <pub-table v-if="row.expandChild" :options="childOptions" :column="childColumn" :data="row.expandChild">
          <template slot="editSlot" slot-scope="{ row, column }">
            <el-input-number v-model="row[column.property]" :min="0" controls-position="right" style="width: 150px;" size="small" />
          </template>
        </pub-table>
      </template>
      <template slot="editSlot" slot-scope="{ row, column }">
        <el-input-number v-model="row[column.property]" :disabled="!canEditCell(row, column)" :min="0" controls-position="right" style="width: 99%;" size="small" />
      </template>
    </pub-table>
  </div>
</template>
<script>
import PubTable from '../index'

/**
 * 办公用品清单-采购清单-办公用品采购
 */
export default {
  name: 'OfficeSupListB',
  components: { PubTable },
  data() {
    return {
      childOptions: {
        size: 'mini'
      },
      childColumn: [{ label: '申请科室', dataIndex: 'department' }, { label: '申请科室', dataIndex: 'appalyNum', slot: 'editSlot', editOpt: { edit: true, min: 0, type: 'number' }}],
      tableOpt: {
        /**
         * @param {Object} p
         * @param {Object} p.row
         * @param {number} p.rowIndex
         * @return {String} className
         */
        rowClassName: ({ row }) => {
          let className = ''
          if (!(row.expandChild && row.expandChild.length)) {
            className += 'expand__no-data'
          }
          return className
        }
      },
      tableColumn: [
        { label: '', dataIndex: 'expand', type: 'expand' },
        { label: '办公用品类型', dataIndex: 'assetType', width: 150 },
        { label: '办公用品名称', dataIndex: 'name' },
        { label: '申请采购量', dataIndex: 'appalyNum', slot: 'editSlot', width: 150 },
        { label: '库存量', dataIndex: 'stockNum', slot: 'editSlot', width: 150 },
        { label: '计划采购量', dataIndex: 'planNum', slot: 'editSlot', width: 150 },
        { label: '单位', dataIndex: 'unit', width: 120 }
      ],
      tableData: [
        { id: '1', name: '黑色A4幅面激光打印机-1', appalyNum: '10', stockNum: '0', planNum: '10', assetType: '打印设备', unit: '个' },
        { id: '2', name: '黑色A4幅面激光打印机-2', appalyNum: '20', stockNum: '0', planNum: '20', assetType: '打印设备', unit: '个' },
        {
          id: '3',
          name: '黑色A4幅面激光打印机-3',
          appalyNum: '5',
          stockNum: '0',
          planNum: '5',
          assetType: '打印设备',
          unit: '个',
          expandChild: [{ id: '3-1', department: '投资科', appalyNum: 1 }, { id: '3-2', department: '财政科', appalyNum: 1 }, { id: '3-3', department: '整改科', appalyNum: 2 }]
        }
      ]
    }
  },
  methods: {
    /**
     * 当前 cell 是否可以编辑
     * @param {{}} row
     * @param {{}} column
     * @return {Boolen} flag
     */
    canEditCell() {
      const flag = true

      return flag
    },
    handleRowDel({ index }) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

