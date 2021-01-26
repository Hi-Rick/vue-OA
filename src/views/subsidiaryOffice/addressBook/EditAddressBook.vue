<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <el-input placeholder="请输入要删除人员的ID" class="input-style" v-model="inputPersonID"></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="deletePerson(inputPersonID)">删除</el-button>
        <br>
<!--        <div style="margin-top: 20px"></div>-->
<!--        <span>部门名称：</span><el-input placeholder="请输入要查询的部门名称" class="input-style" v-model="inputDepartment"></el-input>-->
<!--        <el-button type="warning" style="margin-left: 20px" @click="querydepartment(inputDepartment)">查询</el-button>-->
      </div>
    </div>
    <div class="content">
      <el-row :gutter="20">
        <el-col :span="5">
          <div class="left-content">
            <div class="left-title">
              <span>部门列表</span>
            </div>
            <div class="tree-people">
              <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all node-key="id">
                  <span  slot-scope="{ node, data }">
                     <span style="font-size: 14px"><i class="el-icon-folder-opened icon-style" ></i>{{data.id}}{{ node.label}}</span>
                  </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="left-content">
            <div class="left-title">
              <el-button style="background-color: unset" @click="queryPerson">人员列表</el-button>
            </div>

            <el-tree :data="peopleInfo" :props="defaultProps" @node-click="querydepartment(peopleInfo)">
                <span slot-scope="{node, data}">
                <span style="font-size: 14px"><i class="el-icon-user icon-style" ></i>{{data.name}}</span></span>
            </el-tree>

          </div>
        </el-col>
        <el-col :span="15">
          <div class="left-content">
            <div class="left-title">
              <span>用户详细信息</span>
            </div>
            <div class="info-content">
              <table border="1" class="table-style">
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">姓名：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.name}}</td>
                </tr>
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">性别：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.sex}}</td>
                </tr>
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">部门：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.department}}</td>
                </tr>
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">出生日期：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.birthday}}</td>
                </tr>
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">移动电话：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.tel}}</td>
                </tr>
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">办公电话：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.tel}}</td>
                </tr>
                <tr>
                  <td class="table-style-td td-bg" align="right"><span class="td-text">邮箱：</span></td>
                  <td class="table-style-td" align="left">{{infoitem.mails}}</td>
                </tr>
              </table>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {searchPeople} from '../../../api/remoteSearch'
import {findAllDepartment,selectByDepartment,selectByName,deleteAddress,getAllAddress} from '@/api/index'
export default {
  name: "EditAddressBook",

  data() {
    return {
      data:[],
      peopleInfo: [],
      infoitem: {},
      peopleList: [],
      queryParams: {
        name:undefined,
      },
      inputDepartment: '',
      inputPersonID: null,
      defaultProps: {
        children: 'children',
        label: 'department'
      }
    };
  },
  mounted() {
    this.gettree()
  },
  methods: {
    gettree(){
      findAllDepartment().then( res => {
        // console.log('tree',res)
        this.data = res.data.data.list
      })
    },
    handleNodeClick(data) {
      console.log(data);
    },

    queryInfo(){
      selectByName(this.queryParams).then(res => {
        console.log(res)
        this.infoitem = res.data.data.list[0]
        this.queryParams = ''
      })
    },
    queryName(name){
      let data = {
        name: name
      }
      if(name === '') {
        alert('要查询的名字不能为空!')
      }
      else {
        selectByName(data).then(res => {
          this.infoitem = res.data.data.list[0]
          this.inputName = ''
        })
      }
    },
    querydepartment(name){
      let data = {
        department: name
      }
      // console.log(this.data[0])
      // let it = this.data.label.indexOf(name)
      // if(it === -1) alert('full')
      // else {
      selectByDepartment(data).then(res => {
        this.peopleList = res.data.data.list
        for(let i = 0; i < this.peopleList.length; i ++)
          console.log(this.peopleList[i].name)
        //   alert(this.peopleList[i].name)
        this.inputDepartment = ''
      })
    },
    deletePerson(id) {
      let data = {
        id: id
      }
      if(id === null) alert('请输入正确的ID!')
      else {
        deleteAddress(data).then(res => {
          console.log(res.data.msg)
          this.inputPersonID = null
          alert('删除成功!')
          getAllAddress()
        })
      }
    },
    queryPerson() {
      getAllAddress().then( res =>{
        this.peopleInfo = res.data.data.list
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
.content {
  width: 100%;
  height: 450px;
  margin-top: 30px;
  background-color: #fff;
  padding: 20px;
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
.name-list {
  height: 330px;
  overflow: auto;
}
.table-style {
  height: 345px;width: 100%;
}
.table-style-td {
  width: 50%;
}
.td-bg {
  background-color: #F6F6F6;
}
.td-text {
  color: #409EFF;
}
.icon-style {
  color: #FFDA74;
  margin-right: 10px;
}
.name-style {
  margin-top: 5px;
  cursor: pointer;
  padding: 0 10px 0 10px
}
.name-style:hover {
  background-color: rgba(28,31,33,.1);
}
</style>
