<template>
  <Table :columns="columns1" :data="data1">
    <template slot="user" slot-scope="{ row }">
      <Select v-model="row.user">
        <Option
          v-for="item in row.users"
          :key="item.userName"
          :value="item.userName"
        >{{ item.displayName }}</Option>
      </Select>
    </template>
    <template slot="title" slot-scope="{row}">
      <template v-if="row.edit">

        <Input v-model="row.user" class="edit-input" size="small" />
        <!--<Select  v-model="row.user" @on-change="changeAppointer">
          <Option v-for="item in row.users" :value="item.userName" :key="item.userName">{{item.displayName}}</Option>
        </Select>-->
        <Button size="small" type="warning" @click="cancelEdit(row, index)">cancel</Button>
      </template>
      <span v-else>{{ row.user }}</span>
    </template>
    <template slot="action" slot-scope="{ row, index }">
      <Button
        v-if="row.edit"
        type="primary"
        size="small"
        style="margin-right: 5px"
        @click="confirmEdit(row, index)"
      >OK</Button>
      <!-- <Button v-else type="error" size="small" @click="data1[index].edit=!row.edit">Edit</Button> -->
      <Button v-else type="error" size="small" @click="data1[index].edit=!row.edit">Edit</Button>
    </template>
  </Table>
</template>
<script>
export default {
  data() {
    return {
      columns1: [
        {
          slot: 'title',
          title: 'user',
          key: 'User'
        },
        {
          slot: '',
          title: 'Title',
          key: 'title'
        },
        {
          title: 'Age',
          key: 'age'
        },
        {
          title: 'Address',
          key: 'address'
        },
        {
          slot: 'action',
          title: '操作'
        }
      ],
      data1: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    changeAppointer(val) {
      console.log('val---', val)
      console.log('this.data1---', this.data1)
    },
    getList() {
      const items = [
        {
          users: [
            {
              userName: '111',
              displayName: '哈哈哈哈'
            },
            {
              userName: '222',
              displayName: '嘿嘿嘿嘿'
            }
          ],
          user: 'a',
          title: 'John Brown',
          age: 18,
          address: 'New York No. 1 Lake Park',
          date: '2016-10-03'
        },
        {
          users: [
            {
              userName: '111',
              displayName: '哈哈哈哈'
            },
            {
              userName: '222',
              displayName: '嘿嘿嘿嘿'
            }
          ],
          user: null,
          title: 'Jim Green',
          age: 24,
          address: 'London No. 1 Lake Park',
          date: '2016-10-01'
        },
        {
          users: [
            {
              userName: '111',
              displayName: '哈哈哈哈'
            },
            {
              userName: '222',
              displayName: '嘿嘿嘿嘿'
            }
          ],
          user: null,
          title: 'Joe Black',
          age: 30,
          address: 'Sydney No. 1 Lake Park',
          date: '2016-10-02'
        },
        {
          users: [
            {
              userName: '111',
              displayName: '哈哈哈哈'
            },
            {
              userName: '222',
              displayName: '嘿嘿嘿嘿'
            }
          ],
          user: null,
          title: 'Jon Snow',
          age: 26,
          address: 'Ottawa No. 2 Lake Park',
          date: '2016-10-04'
        }
      ]
      this.data1 = items.map(v => {
        // this.$set(v, 'edit', false)
        v.edit = false
        v.originalUser = v.user
        return v
      })
    },
    cancelEdit(row, index) {
      Object.assign(this.data1[index], {
        edit: false,
        user: row.originalUser
      })
      // row.user = row.originalUser
      // row.edit = false

      // this.data1.splice(index, 1, row)
      this.$Message.warning(
        'The title has been restored to the original value'
      )
    },
    confirmEdit(row, index) {
      console.log(this.data1)
      console.log(row)
      // console.log(this.data1[0] === row)

      Object.assign(this.data1[index], {
        edit: false,
        user: row.user,
        originalUser: row.user
      })
      // row.edit = false
      // row.originalUser = row.user

      // this.data1.splice(index, 1, row)
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
