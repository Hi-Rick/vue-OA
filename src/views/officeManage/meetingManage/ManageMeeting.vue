<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <el-input placeholder="请输入要查询的会议室ID" class="input-style" v-model="searchRoomID"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="searchRoom(searchRoomID)">查询</el-button>
        <br>
        <div style="margin-top: 20px"></div>
        <el-input placeholder="请输入要删除的会议室ID" class="input-style" v-model="inputRoomID"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="deleteMeetingRoom(inputRoomID)">删除</el-button>
      </div>
    </div>
    <div class="table-style">
      <div class="table-title">
        <div>
          <span>*</span>
          <span>1、默认显示当天全部会议室使用情况。可以填写条件查询某个会议室的使用情况。</span>
        </div>
        <div>
          <span>*</span>
          <span>2、根据当前显示的会议室使用情况，点击想要预定的会议室名称，进行预定会议室操作。</span>
        </div>
      </div>
      <div class="content">
        <div style="margin-top: 10px"></div>
        <el-row :gutter="20">
          <el-col >
            <div class="left-content">
              <div class="left-title">
                <span>会议室信息</span>
                <div class="tree-people">
                  <el-tree :data="tableData" :props="defaultProps" default-expand-all node-key="id">
                  <span  slot-scope="{ node, data}">
                     <span style="font-size: 14px"><i class="el-icon-s-home icon-style" style="margin-right: 10px" ></i>{{ node.label}}</span>
                  </span>
                  </el-tree>
                </div>
              </div>
              </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import {findConferenceRoomByName,selectByData,findAllConferenceRoom,deleteRoom,findConferenceRoomById} from '@/api/index'
export default {
  name: "ManageMeeting",
  data() {
    return {
      value1: '',
      updateValue: '',
      inputMeetingRoom: '',
      inputRoomID: null,
      searchRoomID: null,
      tableData: [
      ],
      defaultProps: {
        children: 'children',
        label: 'roomName',
      }
    }
  },
  mounted() {
    this.findAllRoom()
  },
  methods: {
    findByName(name) {
      let data = {
        name: name
      }
      if(name === '') alert('会议室不能输入为空!')
      else {
        findConferenceRoomByName(data).then(res => {
          this.tableData = res.data.data.result
          console.log(res.data.data.result.roomName)
          this.inputMeetingRoom = ''
        })
      }
    },
    // 待编辑
    findByData(time) {
      let data = {
        data: time
      }
      selectByData(data).then(res => {
        console.log('hi')
      })
    },
    findAllRoom() {
      findAllConferenceRoom().then(res => {
        this.tableData = res.data.data.list
      })
    },

    // 1. 删除时如果没有这个会议室问题

    deleteMeetingRoom(id) {
      let data = {
        id: id
      }
      if(id === null) alert('请输入正确的会议室ID!')
      else {
        deleteRoom(data).then(res => {
          console.log(res.data.msg)
          alert('删除成功!')
          findAllConferenceRoom()
          this.inputRoomID = null
        })
      }
    },

    // result中的数据类型 与 findAll中返回的数据类型不一致

    searchRoom(id) {
      let data = {
        id: id
      }
      findConferenceRoomById(data).then(res => {
        this.tableData[0] = res.data.data.result
        console.log(res.data.data.result)
        this.searchRoomID = null
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
  width: 100%;
  height: 600px;
  background-color: #fff;
  margin-top: 30px;
  padding: 10px;
}
.table-title {
  font-size: 12px;
}
.left-content {
  width: 100%;
  height: 400px;
  border: 1px solid rgba(28,31,33,.1);

}
.left-title {
  width: 100%;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background: #2980B9;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #FFFFFF, #6DD5FA);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #FFFFFF, #6DD5FA); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.tree-people {
  /*overflow: hidden;*/
  height: 330px;
  overflow: auto;
  /*overflow-y: scroll;*/
}
</style>
