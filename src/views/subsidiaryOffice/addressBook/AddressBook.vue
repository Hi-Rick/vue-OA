<template>
    <div class="app-container">
      <div class="app-title">
        <div>
          <span style="margin-left: 32px">姓名：</span><el-input placeholder="请输入要查询的姓名" class="input-style" v-model="inputName"></el-input>
          <el-button type="primary" style="margin-left: 20px" @click="queryName(inputName)">查询</el-button>
          <br>
          <div style="margin-top: 20px"></div>
          <span>部门名称：</span><el-input placeholder="请输入要查询的部门名称" class="input-style" v-model="inputDepartment"></el-input>
          <el-button type="warning" style="margin-left: 20px" @click="querydepartment(inputDepartment)">查询</el-button>
        </div>
      </div>
      <div class="content">
        <div class="content-button">
          <el-button type="primary" style="margin-left: 60%" plain>管理我的部门</el-button>
          <el-button type="success" plain>管理我的通讯录</el-button>
        </div>
        <div style="margin-top: 20px"></div>
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="left-content">
              <div class="left-title">
                <span style="position: center">部门列表</span>
                <el-button icon="el-icon-delete" size="mini" style="margin-left: 10px" @click="isShow = !isShow" round></el-button>
              </div>
              <div class="tree-people">
                <el-tree :data="data" :props="defaultProps" default-expand-all node-key="id">
                  <span  slot-scope="{ node, data }">
                     <span style="font-size: 14px"  @click="querydepartment(node.label)"><i class="el-icon-folder-opened icon-style" ></i>{{data.id}}{{ node.label}}</span>
                    <el-button v-show="isShow" icon="el-icon-close" size="mini" style="margin-left: 10px" @click="deletetree(data.id)" circle></el-button>
                  </span>
                </el-tree>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="left-content">
              <div class="left-title">
                <span>人员列表</span>
                <el-button icon="el-icon-delete" size="mini" style="margin-left: 10px" @click="isShow1 = !isShow1" round></el-button>
              </div>

              <el-tree :data="peopleList" :props="defaultProps">
                <span slot-scope="{node, data}">
                <span style="font-size: 14px" @click="queryName(data.name)"><i class="el-icon-user icon-style" ></i>{{data.name}}</span>
                <el-button v-show="isShow1" icon="el-icon-close" size="mini" @click="deletePerson(data.id)" circle></el-button>
                </span>
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
  import {findAllDepartment,selectByDepartment,selectByName,insertDepartment,deleteDepartment,modifyDepartment,deleteAddress} from '@/api/index'
    export default {
        name: "AddressBook",

      data() {
        return {
          data:[],
          infoitem: {},
          peopleList: [],
          queryParams: {
            name:undefined,
          },
          counter: 0,
          inputValue: '',
          inputName: '',
          inputDepartment: '',
          selectDepartment: '',
          isShow: false,
          isShow1: false,

          //2. 什么时候需要props
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
        // clearinput() {
        //   this.infoitem=''
        // },
        deletetree(id) {
            console.log(id)
          let data = {
            id: id
          }
          deleteDepartment(data).then(res => {
            console.log(res.data.msg)
            findAllDepartment()
          })
          // findAllDepartment()
        },
        inserttree(){
            let data = {
              department: this.inputValue
            }
            if(this.inputValue === '')alert('输入不能为空！')
          else {
            insertDepartment(data).then(res => {
              console.log(res.data.msg)
              findAllDepartment()
            })
          }
          this.inputValue = ''
        },
        modifytree(id) {

            let data = {
              department: this.inputValue,
              id: id
            }
          modifyDepartment(data).then(res =>{
            console.log(res.data.msg)
            findAllDepartment()
          })
        },
        querydepartment(name){
            let data = {
              department: name
            }
            selectByDepartment(data).then(res => {
              this.peopleList = res.data.data.list
              for(let i = 0; i < this.peopleList.length; i ++)
                console.log(this.peopleList[i].name)
              //   alert(this.peopleList[i].name)
              this.inputDepartment = ''
            })
          // }
        },
        deletePerson(id) {
          let data = {
            id: id
          }
            deleteAddress(data).then(res => {
              console.log(res.data.msg)
              alert('删除成功!')
              // getAllAddress()
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
