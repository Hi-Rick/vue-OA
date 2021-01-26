<template>
  <div class="app-container">
    <div class="app-title">
      <span>ID</span><el-input class="input-style" placeholder="请输入要查询的用户ID" v-model="search"></el-input>
      <el-button class="input_1-style">查询</el-button>
    </div>

    <div class="table-style">
      <el-button class="input_2-style" type="primary" @click="dialogFormVisible1 = true" size="small">+</el-button>
      <el-table
    ref="filterTable"
    :data="tableData.filter(data => !search || data.id.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
      prop="id"
      label="ID"
      width="120">
    </el-table-column>
    <el-table-column
      prop="role"
      label="标签"
      width="130"
      :filters="[{ text: '普通用户', value: '普通用户' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.role === '普通用户' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.role}}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="document"
      label="文件号"
      sortable
      width="130">
    </el-table-column>
    <el-table-column
      prop="documentType"
      label="文件类型"
      width="140">
    </el-table-column>
        <el-table-column
          prop="conferenceRoom"
          label="会议室"
        width="120">
        </el-table-column>
        <el-table-column
          prop="insertTime"
          label="插入时间"
        width="200">
        </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="200">
      <template slot-scope="scope">
        <el-button @click="dialogFormVisible = true" type="text" size="small">修改</el-button>
        <el-popconfirm
          @onConfirm="deleteRole1(scope.row.id)"
          icon="el-icon-info"
          icon-color="red"
          title="确定删除吗？"
        >
        <el-button type="text" size="small" slot="reference">删除</el-button>
        </el-popconfirm>
      </template>
    </el-table-column>
  </el-table>

      <el-dialog title="新建角色" :visible.sync="dialogFormVisible1">
        <el-form :model="dataModify">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="dataModify.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-input v-model="dataModify.role" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文件号" :label-width="formLabelWidth">
            <el-input v-model="dataModify.document" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" :label-width="formLabelWidth">
            <el-input v-model="dataModify.documentType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议室" :label-width="formLabelWidth">
            <el-input v-model="dataModify.conferenceRoom" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="insertRole()">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form :model="dataModify">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="dataModify.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-input v-model="dataModify.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文件号" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="文件类型" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议室" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomDescribe" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {getAllRole,deleteRole,insertPermission,getPermissionByRole} from '@/api/index'
export default {
  name: "character",
  data() {
    return {
      tableData: [],
      search: '',
      dialogFormVisible1: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      dataModify: {
        id: null,
        insertTime: '',
        role: '',
        document: null,
        documentType: '',
        conferenceRoom: null
      },
      defaultProps: {
        id: null,
        insertTime: '',
        role: '',
        document: null,
        documentType: '',
        conferenceRoom: null
      }
    }
  },
  mounted() {
    this.showRoles()
  },
  methods: {
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date');
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter();
    },
    formatter(row, column) {
      return row.address;
    },
    filterTag(value, row) {
      return row.role === value;
    },
    filterHandler(value, row, column) {
      const property = column['property'];
      return row[property] === value;
    },
    showRoles() {
      getAllRole().then(res => {
        this.tableData = res.data.data.list
        for(let i = 0; i < this.tableData.length; i ++) {
          this.tableData[i].id = String(this.tableData[i].id)
        }
      })
    },
    deleteRole1(id) {
      let data = {
        id: id
      }
      deleteRole(data).then(res => {
        console.log(res.data.msg)
        getAllRole()
      })
    },
    insertRole() {
      this.dataModify.id = parseInt(this.dataModify.id)
      this.dataModify.document = parseInt(this.dataModify.document)
      this.dataModify.conferenceRoom = parseInt(this.dataModify.conferenceRoom)
      insertPermission(this.dataModify).then(res => {
        console.log(res.data.msg)
        getAllRole()
      })
      this.dialogFormVisible1 = false
    },
    selectRole(role) {
      let data = {
        role: role
      }
      getPermissionByRole(data).then(res => {

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
  margin-left: 10px;
}
.span-style {
  margin-left: 150px;
}
.table-style {
  background-color: #fff;
  margin-top: 30px;
  padding: 30px;
}
.input_1-style {
  margin-left: 10px;
}
.input_2-style {
  margin-left: 92%;
}
</style>
