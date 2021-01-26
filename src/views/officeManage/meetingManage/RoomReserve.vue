<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <span>会议室名称：</span><el-input placeholder="请输入会议室名称" class="input-style" v-model="search"></el-input>
        <span class="span-style">指定日期：</span>
        <el-date-picker
          v-model="value1"
          class="input-style"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-button type="primary" class="span-style" @click="findByName(search)">查询</el-button>
        <el-button type="warning" @click="inputMeetingRoom = ''">清空</el-button>
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
          <el-button style="margin-left: 55%" type="primary" @click="dialogFormVisible1 = true" size="small">+</el-button>
        </div>
      </div>
      <el-table v-if="isShow === false" :data="tableData.filter(data => !search || data.roomName.toLowerCase().includes(search.toLowerCase()))" stripe border style="margin-top: 10px">
        <el-table-column
          prop="roomName"
          width="100">
        </el-table-column>
        <el-table-column
          label="8:00-8:30">
        </el-table-column>
        <el-table-column
          label="8:30-9:00">
        </el-table-column>
        <el-table-column
          label="9:00-9:30">
        </el-table-column>
        <el-table-column
          label="9:30-10:00">
        </el-table-column>
        <el-table-column
          label="10:00-10:30">
        </el-table-column>
        <el-table-column
          label="10:30-11:00">
        </el-table-column>
        <el-table-column
          label="11:00-11:30">
        </el-table-column>
        <el-table-column
          label="11:30-12:00">
        </el-table-column>
        <el-table-column
          label="12:00-12:30">
        </el-table-column>
        <el-table-column
          label="12:30-13:00">
        </el-table-column>
        <el-table-column
          label="13:00-13:30">
        </el-table-column>
        <el-table-column
          label="13:30-14:00">
        </el-table-column>
        <el-table-column
          label="14:00-14:30">
        </el-table-column>
        <el-table-column
          label="14:30-15:00">
        </el-table-column>
        <el-table-column
          label="15:00-15:30">
        </el-table-column>
        <el-table-column
          label="15:30-16:00">
        </el-table-column>
        <el-table-column
          label="16:00-16:30">
        </el-table-column>
        <el-table-column
          label="16:30-17:00">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">

            <el-button type="text" size="small"  @click="findByName(scope.row.roomName)">查看</el-button>
            <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
            <el-popconfirm
              @onConfirm="deleteMeetingRoom(scope.$index)"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
            >
            <el-button slot="reference" style="margin-left: 10px" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-table v-if="isShow === true" :data="tableData1.filter(data => !search || data.roomName.toLowerCase().includes(search.toLowerCase()))" stripe border style="margin-top: 10px">
        <el-table-column
          prop="roomName"
          width="100">
        </el-table-column>
        <el-table-column
          label="8:00-8:30">
        </el-table-column>
        <el-table-column
          label="8:30-9:00">
        </el-table-column>
        <el-table-column
          label="9:00-9:30">
        </el-table-column>
        <el-table-column
          label="9:30-10:00">
        </el-table-column>
        <el-table-column
          label="10:00-10:30">
        </el-table-column>
        <el-table-column
          label="10:30-11:00">
        </el-table-column>
        <el-table-column
          label="11:00-11:30">
        </el-table-column>
        <el-table-column
          label="11:30-12:00">
        </el-table-column>
        <el-table-column
          label="12:00-12:30">
        </el-table-column>
        <el-table-column
          label="12:30-13:00">
        </el-table-column>
        <el-table-column
          label="13:00-13:30">
        </el-table-column>
        <el-table-column
          label="13:30-14:00">
        </el-table-column>
        <el-table-column
          label="14:00-14:30">
        </el-table-column>
        <el-table-column
          label="14:30-15:00">
        </el-table-column>
        <el-table-column
          label="15:00-15:30">
        </el-table-column>
        <el-table-column
          label="15:30-16:00">
        </el-table-column>
        <el-table-column
          label="16:00-16:30">
        </el-table-column>
        <el-table-column
          label="16:30-17:00">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150">
          <template slot-scope="scope">

            <el-button type="text" size="small"  @click="findByName(scope.row.roomName)">查看</el-button>
            <el-button type="text" size="small" @click="dialogFormVisible = true">编辑</el-button>
            <el-popconfirm
              @onConfirm="deleteMeetingRoom(scope.$index)"
              icon="el-icon-info"
              icon-color="red"
              title="确定删除吗？"
            >
              <el-button slot="reference" style="margin-left: 10px" type="text" size="small">删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog title="修改" :visible.sync="dialogFormVisible">
        <el-form :model="dataModify">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="dataModify.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="门牌号" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议室名称" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="室内描述" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomDescribe" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约时间" :label-width="formLabelWidth">
            <el-input v-model="dataModify.insertTime" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyRoom">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="新建" :visible.sync="dialogFormVisible1">
        <el-form :model="dataModify">
          <el-form-item label="ID" :label-width="formLabelWidth">
            <el-input v-model="dataModify.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="门牌号" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="会议室名称" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="室内描述" :label-width="formLabelWidth">
            <el-input v-model="dataModify.roomDescribe" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="预约时间" :label-width="formLabelWidth">
            <el-input v-model="dataModify.insertTime" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="addRoom">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="会议室信息" :visible.sync="dialogTableVisible">
        <el-table :data="findData">
          <el-table-column prop="id" label="ID" width="150"></el-table-column>
          <el-table-column prop="roomId" label="门牌号" width="200"></el-table-column>
          <el-table-column prop="roomName" label="会议室名称"></el-table-column>
          <el-table-column prop="roomDescribe" label="室内描述"></el-table-column>
          <el-table-column prop="insertTime" label="预约时间"></el-table-column>
        </el-table>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import {findConferenceRoomByName,selectByData,findAllConferenceRoom,deleteRoom,modifyRoomInfo,addConferenceRoom} from '@/api/index'
    export default {
        name: "RoomReserve",
      data() {
          return {
            value1: '',
            updateValue: '',
            inputMeetingRoom: '',
            dialogTableVisible: false,
            tableData: [],
            tableData1: [],
            findData: [],
            isShow: false,
            defaultProps: {
              roomName: 'roomName',
              insertTime: 'insertTime',
              roomId: 'roomId',
              id: 'id',
              roomDescribe: 'roomDescribe'
            },
            dataModify: {
              id: null,
              insertTime: '',
              roomDescribe: '',
              roomId: '',
              roomName: '',
            },
            search: '',
            visible: false,

            dialogFormVisible: false,
            dialogFormVisible1: false,
            form: {
              name: '',
              region: '',
              date1: '',
              date2: '',
              delivery: false,
              type: [],
              resource: '',
              desc: ''
            },
            formLabelWidth: '120px',

          }
      },
      mounted() {
        this.findAllRoom()
      },
      methods: {
        findAllRoom() {
          findAllConferenceRoom().then(res => {
            this.tableData = res.data.data.list
          })
        },
        findByName(name) {
          let data = {
            name: name
          }
            findConferenceRoomByName(data).then(res => {
              this.tableData1[0] = res.data.data.result
              console.log(res.data.data.result.roomName)
            })
          this.dialogTableVisible = true
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
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        deleteMeetingRoom(id) {
          let data = {
            id: id
          }
            deleteRoom(data).then(res => {
              console.log(res.data.msg)
              findAllConferenceRoom()
            })
        },
        modifyRoom() {
          this.dataModify.id = parseInt(this.dataModify.id);
          console.log(this.dataModify)
          modifyRoomInfo(this.dataModify).then(res => {
            console.log(res.data.msg)
            findAllConferenceRoom()
            this.dialogFormVisible = false
          })
        },
        addRoom() {
          this.dataModify.id = parseInt(this.dataModify.id)
          console.log(this.dataModify)
          addConferenceRoom(this.dataModify).then(res => {
            console.log(res.data.msg)
            findAllConferenceRoom()
            this.dialogFormVisible1 = false
          })
        }
      }
    }
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}
  .app-title {
    padding: 30px;
    background-color: #fff;
  }
  .input-style {
    height: 10px;
    width: 200px;
  }
  .span-style {
    margin-left: 150px;
  }
.table {
  width: 100%;
  font-size: 14px;
}
  .table-style {
    width: 98%;
    height: 650px;
    background-color: #fff;
    margin: 20px 20px 20px 20px;
    padding: 10px 10px 10px 10px;
  }
  .table-title {
    font-size: 12px;
  }
.item {
  margin: 4px;
}
</style>
