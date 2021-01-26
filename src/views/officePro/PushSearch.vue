<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <span>标题：</span><el-input class="input-style" v-model="search"></el-input>
        <span class="span-style">编号：</span><el-input class="input-style"></el-input>
        <el-button type="primary" class="span-style">查询</el-button>
        <el-button type="warning">清空</el-button>
      </div>

    </div>
    <div class="table-style">
      <el-table
        :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
        :header-cell-style="{'text-align':'center', 'background-color' : '#EFEFEF'}">
        <el-table-column
          prop="id"
          label="编号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          align="center">
        </el-table-column>
        <el-table-column
          prop="documentType"
          label="文件类型"
          align="center">
        </el-table-column>
        <el-table-column
          prop="creator"
          label="发起人"
          align="center">
        </el-table-column>
        <el-table-column
          prop="date"
          label="公文日期"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {select}  from '@/api/index'
  export default {
    name: "PushSearch",
    data() {
      return {
        tableData: [],
        search: '',
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
          body: ""
        }
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
      }
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
