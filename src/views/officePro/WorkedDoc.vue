<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <span>角色ID：</span><el-input class="input-style" placeholder="输入ID查询已办文件" v-model="userid"></el-input>
<!--        <span class="span-style">文号：</span><el-input class="input-style"></el-input>-->
        <el-button type="primary" style="margin-left: 20px" @click="findApproved(userid)">查询</el-button>
        <el-button type="warning">清空</el-button>
      </div>

    </div>
    <div class="table-style">
      <el-table
        :data="tableData"
        :header-cell-style="{'text-align':'center', 'background-color' : '#EFEFEF'}">
        <el-table-column
          prop="num"
          label="公文号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="type_exp"
          label="类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="applePeople"
          label="公文创建人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="sendPeople"
          label="审批人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="更新时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="result"
          label="审批结果"
          align="center">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small" @click="cancel_submit">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {findFinishApprove}  from '@/api/index'
  export default {
    name: "WorkedDoc",
    data() {
      return {
        tableData: [{
          title: '周三例行会议',
          num: 'D463626571',
          sendPeople: '张红',
          applePeople: '郑强',
          time: '2020-06-15',
          type_exp: '会议',
          result: '同意'
        },
          {
            title: '大赛通知',
            num: 'D9979735346',
            sendPeople: '张贺',
            applePeople: '邓世强',
            time: '2020-06-03',
            type_exp: '通知',
            result: '不同意'
          },
          {
            title: '周四例行会议',
            num: 'D685634657',
            sendPeople: '张敏',
            applePeople: '郑强',
            time: '2020-05-28',
            type_exp: '会议',
            result: '不同意'
          },
          {
            title: '人员调配通知',
            num: 'D79476583',
            sendPeople: '董成文',
            applePeople: '刘诗诗',
            time: '2020-05-16',
            type_exp: '通知',
            result: '同意'
          },
          {
            title: '周三例行会议',
            num: 'D89579345',
            sendPeople: '张红',
            applePeople: '郑强',
            time: '2020-05-05',
            type_exp: '会议',
            result: '同意'
          },],
        userid: null,
      }
    },
    methods: {
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
      findApproved(id) {
        let data = {
          userId: id
        }
        findFinishApprove(data).then(res => {
          this.tableData = res.data.data.list
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
</style>
