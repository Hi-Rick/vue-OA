<template>
  <div class="app-container">
    <div class="app-title">
      <div>
        <el-input placeholder="请输入要新增的部门名称" class="input-style" v-model="inputValue"></el-input>
        <el-button  type="primary" @click="inserttree(inputValue)">新增部门</el-button>
        <div style="margin-top: 20px"></div>
        <el-input placeholder="请输入要修改部门的ID" class="input-style" v-model="inputID1"></el-input>
        <el-input placeholder="请输入修改后的部门名称" class="input-style" v-model="inputValue1"></el-input>
        <el-button type="warning" @click="modifytree(inputValue1,inputID1)">修改部门</el-button>
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
                     <span style="font-size: 14px"><i class="el-icon-folder-opened icon-style" ></i>{{data.id}}{{node.label}}</span>
                  </span>
              </el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="left-content">
            <div class="left-title">
              <span>人员列表</span>
            </div>
            <div class="name-list">
              <div v-for="(item, index) in peopleList" :key="index" class="name-style" @click="getInfo(item)">
                <span>{{item.name}}</span>
              </div>
            </div>
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
import {findAllDepartment,selectByDepartment,selectByName,insertDepartment,deleteDepartment,modifyDepartment} from '@/api/index'
export default {
  name: "AddressBook",

  data() {
    return {
      data:[],
      peopleList: [],
      infoitem: {},
      queryParams: {
        name:undefined,
      },
      inputValue: '',
      inputID: null,
      inputValue1: '',
      inputID1: null,
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
        this.data = res.data.data.list
      })
    },
    handleNodeClick(data) {
      console.log(data);
    },
    ListTable(node, data) {
      console.log(node)
      console.log(data)
      // if (data.label === '职称评定') {
      //   this.tableDatas = this.tableData
      //   console.log(this.tableDatas)
      // }
      this.getPeople(data.department)
    },
    queryInfo(){
      selectByName(this.queryParams).then(res => {
        console.log(res)
        this.infoitem = res.data.data.list[0]
        this.queryParams = ''
      })
    },
    clearinput() {
      this.infoitem=''
    },
    getPeople(val) {
      let data = {
        department: val
      }
      selectByDepartment(data).then((res) => {
        console.log('liebiao',res)
        this.peopleList =  res.data.data.list
        console.log(this.peopleList.name)
      })
    },
    getInfo(item) {
      console.log('item',item)
      this.infoitem = item
    },
    deletetree(id) {
      let data = {
        id: id
      }
      if(id === null){
        alert('请输入正确的部门ID!')
      }
      else {
        deleteDepartment(data).then(res => {
          console.log(res.data.msg)
        })
        alert('删除部门成功!')
      }
      this.inputID = null
      findAllDepartment()
    },
    inserttree(input){
      let data = {
        department: input
      }
      if(this.inputValue === '')alert('部门输入不能为空!')
      else {
        insertDepartment(data).then(res => {
          console.log(res.data.msg)
        })
        alert('添加部门成功!')
      }
      this.inputValue = ''
      findAllDepartment()
    },
    modifytree(value,id) {

      let data = {
        department: value,
        id: id
      }
      if(id === null) {
        alert('请输入正确的ID!')
      }
      else if(value === ''){
        alert('部门修改值不能为空!')
      }
      else{
        modifyDepartment(data).then(res => {
          console.log(res.data.msg)
        })
        alert('修改部门成功!')
      }
      this.inputID = null
      this.inputValue = ''
      findAllDepartment()
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
