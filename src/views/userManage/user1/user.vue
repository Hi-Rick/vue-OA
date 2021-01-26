<template>
  <div class="app-container">
    <div class="app-title">
      <span>ID</span><el-input style="margin-left: 10px" class="input-style" placeholder="请输入要查询的用户ID" v-model="search"></el-input>
      <el-button style="margin-left: 10px">查询</el-button>
    </div>
    <div class="table-style">
      <el-button style="margin-left: 92%" type="primary" @click="dialogFormVisible1 = true" size="small">+</el-button>

      <el-table
        ref="filterTable"
        :data="tableData.filter(data => !search || data.userId.toLowerCase().includes(search.toLowerCase()) || data.userName.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          prop="userId"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="role"
          label="角色"
          width="180"
          :filters="[{ text: '普通用户', value: '普通用户' },{ text: '院长', value: '院长' },{ text: '辅导员', value: '辅导员' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.role === '院长' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.role}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickName"
          label="角色名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="更新时间"
          width="180"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="dialogFormVisible2 = true">添加</el-button>
            <el-button @click="dialogFormVisible = true" type="text" size="small">修改</el-button>
            <el-button type="text" size="small">删除</el-button>

            <el-dialog title="分配角色" v-show="dialogFormVisible2">
              <div slot="footer" class="dialog-footer">
                <el-input v-model="roleModify" autocomplete="off"></el-input>
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="setUserRole_1(scope.$index,roleModify)">确 定</el-button>
              </div>
            </el-dialog>

          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="新建账号" :visible.sync="dialogFormVisible1">
        <el-form :model="dataModify">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="dataModify.userId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="dataModify.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="dataModify.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名" :label-width="formLabelWidth">
            <el-input v-model="dataModify.nickName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="dataModify.department" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改账号" :visible.sync="dialogFormVisible">
        <el-form :model="dataModify">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="dataModify.userId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="dataModify.userName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="dataModify.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名" :label-width="formLabelWidth">
            <el-input v-model="dataModify.nickName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="部门" :label-width="formLabelWidth">
            <el-input v-model="dataModify.department" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="">确 定</el-button>
        </div>
      </el-dialog>


    </div>
  </div>

</template>

<script>
import {getAllUsers,getUserInfo,getUserByRole,setUserRole} from '@/api/index'
export default {
  name: "user",
  data() {
    return {
      search: '',
      findId: null,
      tableData: [],
      dialogFormVisible1: false,
      dialogFormVisible: false,
      dialogFormVisible2: false,
      formLabelWidth: '120px',
      roleModify: '',
      dataModify: {
        id: null,
        userId: null,
        userName: '',
        password: '',
        role: '',
        nickName: '',
        department: '',
        insertTime: '',
        updateTime: ''
      },

      defaultProps: {
        id: null,
        userId: null,
        userName: '',
        password: '',
        role: '',
        nickName: '',
        department: '',
        insertTime: '',
        updateTime: ''
      },
    }
  },
  mounted() {
    this.showUsers()
  },
  methods: {
    showUsers() {
      getAllUsers().then(res => {
        // res.data.data.list.userId = String(res.data.data.list.userId)
        this.tableData = res.data.data.list
        for(let i = 0; i < this.tableData.length; i ++) {
          this.tableData[i].userId = String(this.tableData[i].userId)
        }
      })
    },
    filterTag(value, row) {
      return row.role === value;
    },
    findUser(id) {
      let data = {
        userId: id
      }
      getUserInfo(data).then(res => {
        this.tableData[0] = res.data.data.user
        console.log(res.data.msg)
      })
      this.search = null
    },
    getUserByRole_1(role) {
      let data = {
        role: role
      }
      getUserByRole(data).then(res => {
        this.tableData = res.data.data.list
      })
    },
    setUserRole_1(id,role){
      let data = {
        id: id,
        role: role
      }
      setUserRole(data).then(res => {
        console.log(res.data.msg)
        this.dialogFormVisible2 = false
      })
    },
  },
}
</script>

<style scoped>
.app-title {
  padding: 30px;
  background-color: #fff;
}
.input-style {
  width: 200px;
}
.span-style {
  margin-left: 150px;
}
.table-style {
  background-color: #fff;
  margin-top: 30px;
  padding: 30px;
}
</style>
