<template>
  <Table border :columns="columns1" :data="data1">
    <template slot="title" slot-scope="{row}">
      <template v-if="row.edit">
        <Input v-model="row.title" class="edit-input" size="small" />
        <Button
          class="cancel-btn"
          size="small"
          type="warning"
          @click="cancelEdit(row)"
        >
          cancel
        </Button>
      </template>
      <span v-else>{{ row.title }}</span>
    </template>
    <template slot="action" slot-scope="{ row }">
      <Button
        v-if="row.edit"
        type="primary"
        size="small"
        style="margin-right: 5px"
        @click="confirmEdit(row)"
      >OK</Button>
      <Button
        v-else
        type="error"
        size="small"
        @click="row.edit=!row.edit"
      >Edit</Button>
    </template>
  </Table>
</template>
<script>
// IView Table
export default {
  name: 'IEditTable',
  data() {
    return {
      columns1: [
        {
          title: 'Name',
          key: 'name'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          slot: 'title',
          title: 'Title',
          key: 'title'
        },
        {
          slot: 'action',
          title: '操作',
          width: 200
        }
      ],
      data1: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      const items = [
        {
          name: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          title: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          name: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          title: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          name: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          title: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          name: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          title: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
      this.data1 = items.map(v => {
        // this.$set(v, 'edit', false)
        v.edit = false
        v.originalTitle = v.title
        return v
      })
    },
    cancelEdit(row) {
      row.title = row.originalTitle
      row.edit = false
      this.$Message.warning('The title has been restored to the original value')
    },
    confirmEdit(row) {
      debugger
      console.log(this.data1[0] === row)
      row.edit = false
      row.originalTitle = row.title
      this.$Message.success('The title has been edited')
    }
  }
}
</script>

<style scoped>
/deep/ .ivu-table-cell-slot {
  position: relative;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 0px;
}
</style>
