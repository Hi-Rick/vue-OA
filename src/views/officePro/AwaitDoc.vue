<template>
    <div class="app-container">
      <div class="app-title">
        <div>
          <span>标题：</span><el-input class="input-style" v-model="queryParams.title"></el-input>
          <span class="span-style">类型：</span><el-input class="input-style" v-model="queryParams.documentType"></el-input>
          <el-button type="primary" class="span-style" @click="queryInfo">查询</el-button>
          <el-button type="warning">清空</el-button>
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
            label="公文号"
            align="center">
          </el-table-column>
          <el-table-column
            prop="creator"
            label="创建人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="mainDelivery"
            label="审批人"
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            label="收件时间"
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
              <td class="table-style-td1 color-bg-two" align="center">文号：</td>
              <td class="table-style-td2 color-bg-two" align="center">{{number}}</td>
            </tr>
            <tr>
              <td class="table-style-td1 color-bg-one" align="center">发件人：</td>
              <td class="table-style-td2 color-bg-one" align="center">{{creator}}</td>
            </tr>
            <tr>
              <td class="table-style-td1 color-bg-two" align="center">收件人：</td>
              <td class="table-style-td2 color-bg-two" align="center">{{main_delivery}}</td>
            </tr>
            <tr>
              <td class="table-style-td1 color-bg-two" align="center">收件时间：</td>
              <td class="table-style-td2 color-bg-two" align="center">{{date}}</td>
            </tr>
            <tr>
              <td class="table-style-td1 color-bg-two" align="center">类型：</td>
              <td class="table-style-td2 color-bg-two" align="center">{{type_exp}}</td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">撤 销</el-button>
        <el-button type="primary" @click="dialogVisible = false">批 复</el-button>
      </span>
      </el-dialog>
    </div>
</template>

<script>
import {getdaibanList,getdocselect,select}  from '@/api/index'
    export default {
        name: "AwaitDoc",
      data() {
          return {
            queryParams: {
              title:undefined,
              documentType:undefined

            },
            tableData:[],
            title: '',
            num: '',
            sendPeople: '',
            applePeople: '',
            time: '',
            type_exp: '',
            dialogVisible: false
          }
      },
      mounted() {
          this.findDoc()
      },
      methods: {
        findDoc() {
          select().then(res => {
            this.tableData = res.data.data.list
            console.log(res.data.msg)
          })
        },
        getlist(){
          getdaibanList({
            role:'管理员',
            userId:'123456'
          }).then(res => {
            console.log(res)
            this.tableData = res.data.data.list
          })
        },
        queryInfo(){
          getdocselect(this.queryParams).then(res => {
            console.log('111')
            console.log(res)
            this.tableData = res.data.data.list
          })
        },
        edit_show(row) {
          console.log(row)
          this.dialogVisible = true
          this.title = row.title
          this.num = row.num
          this.sendPeople = row.sendPeople
          this.applePeople = row.applePeople
          this.time = row.time
          this.type_exp = row.type_exp
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
        }
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
