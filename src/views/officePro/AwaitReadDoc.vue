<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <span>角色ID：</span><el-input class="input-style" v-model="userid"></el-input>
        <span class="span-style">角色：</span><el-input class="input-style" v-model="username"></el-input>
        <el-button type="primary" class="span-style" @click="findNotRead(userid,username)">查询</el-button>
        <el-button type="warning" @click="userid = ''; username = ''">清空</el-button>
      </div>

    </div>
    <div class="table-style">
      <el-table
        :data="tableData"
        :header-cell-style="{'text-align':'center', 'background-color' : '#EFEFEF'}">
        <el-table-column
          prop="title"
          label="标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="number"
          label="文件号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="mainDelivery"
          label="主送"
          align="center">
        </el-table-column>
        <el-table-column
          prop="secondDelivery"
          label="抄送"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="公文日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="documentType"
          label="类型"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small" @click="edit_show(scope.row)">
              编辑
            </el-button>
            <el-button
              type="text"
              size="small" @click="cancel_submit">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <div class="dialog-content">
        <table border="1" class="table-style2">
          <tr>
            <td class="table-style-td1 color-bg-one" align="center">标题：</td>
            <td class="table-style-td2 color-bg-one" align="center">{{title}}</td>
          </tr>
          <tr>
            <td class="table-style-td1 color-bg-two" align="center">文件号：</td>
            <td class="table-style-td2 color-bg-two" align="center">{{number}}</td>
          </tr>
          <tr>
            <td class="table-style-td1 color-bg-two" align="center">文件类型：</td>
            <td class="table-style-td2 color-bg-two" align="center">{{documentType}}</td>
          </tr>
          <tr>
            <td class="table-style-td1 color-bg-one" align="center">主送：</td>
            <td class="table-style-td2 color-bg-one" align="center">{{mainDelivery}}</td>
          </tr>
          <tr>
            <td class="table-style-td1 color-bg-two" align="center">抄送：</td>
            <td class="table-style-td2 color-bg-two" align="center">{{secondDelivery}}</td>
          </tr>
          <tr>
            <td class="table-style-td1 color-bg-two" align="center">公文日期：</td>
            <td class="table-style-td2 color-bg-two" align="center">{{date}}</td>
          </tr>
        </table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">撤 销</el-button>
        <el-button type="primary" @click="modifyApproval">批 复</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {findNotApproveDocument,addProcess,select,modifyProcess}  from '@/api/index'
  export default {
    name: "AwaitReadDoc",
    data() {
      return {
        userid: 0,
        username: '',
        tableData: [],
        title: '',
        number: '',
        mainDelivery: '',
        secondDelivery: '',
        insertTime: '',
        documentType: '',
        dialogVisible: false,

        defaultProps: {
          id: 0,
          documentType: "",
          number: "",
          creator: "",
          title: "",
          mainDelivery: "",
          secondDelivery: "",
          date: "",
          sign: "",
          proofreading: "",
          countersign: "",
          draft: "",
          duplicate: "",
          ifDraft: false,
          insertTime: "",
          updateTime: "",
          body: "",
          modelOrder: '',
          order: ''
        },

        modify_App: {
          documentType: "",
          id: 0,
          insertTime: "",
          modelOrder: "",
          order: "",
          updateTime: "",
          date: "",
        },
      }
    },
    mounted() {
      this.findDoc()
    },
    methods: {
      edit_show(row) {
        console.log(row)
        this.dialogVisible = true
        this.title = row.title
        this.number = row.number
        this.mainDelivery = row.mainDelivery
        this.secondDelivery = row.secondDelivery
        this.documentType = row.documentType
        this.date = row.date
        this.modify_App.documentType = row.documentType
        this.modify_App.id = row.id
        this.modify_App.order = row.secondDelivery
        this.modify_App.modelOrder = row.mainDelivery
        this.modify_App.date = row.date
      },
      cancel_submit() {
        this.$confirm('此操作将移除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      findNotRead(id, name) {
        let data = {
          userId: id,
          role: name
        }
        findNotApproveDocument(data).then(res => {
          this.tableData = res.data.list
          console.log(res.data.msg)
        })
      },
      agreeProcess() {
        // json 要传的数据 待编辑
        addProcess(data).then(res => {
          console.log(res.data.msg)
        })
      },
      findDoc() {
        select().then(res => {
          this.tableData = res.data.data.list
          console.log(res.data.msg)
        })
      },
      // 500
      modifyApproval() {
        this.modify_App.id = parseInt(this.modify_App.id)
        modifyProcess(this.modify_App).then(res => {
          console.log(res.data.msg)
        })
      },
    }
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
  .dialog-content {
    width: 400px;
    height: 300px;
    margin: 0 auto;
    /*border: 1px solid rgba(28,31,33,.1);*/
  }
  .table-style2 {
    height: 300px;
    width: 100%;
  }
  .table-style-td1 {
    width: 100px;
  }
  .table-style-td2 {
    width: 300px;
  }
  .color-bg-one {
    background-color: #F6F6F6;
  }
  .color-bg-two {
    background-color: #fff;
  }
</style>
