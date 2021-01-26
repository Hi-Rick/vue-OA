<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <span>会议标题：</span><el-input class="input-style"></el-input>
        <el-button type="primary" class="span-style">查询</el-button>
        <el-button type="warning">清空</el-button>
      </div>
    </div>
    <div class="table-style">
      <div class="button-style">
        <el-button type="warning" plain>取消预订</el-button>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{'text-align':'center', 'background-color' : '#EFEFEF'}">
        <el-table-column
          prop="title"
          label="会议标题"
          align="center">
        </el-table-column>
        <el-table-column
          label="会议室"
          align="center">
        </el-table-column>
        <el-table-column
          label="会议日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="会议开始时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="会议结束时间"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {findConferenceRoomByName,selectByData,findAllConferenceRoom,deleteRoom,modifyRoomInfo,addConferenceRoom,selectByWeek} from '@/api/index'
  export default {
    name: "MyReserve",
    data() {
      return {
        tableData: [],
        value1: '',
        defaultProps: {

        },
      }
    },
    mounted() {
      this.showConference()
    },
    methods: {
      showConference() {
        selectByWeek().then(res => {
          this.tableData = res.data.data.list
          console.log(res.data.data.list)
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
  .button-style {
    float: right;
    margin-bottom: 20px;
  }
</style>
