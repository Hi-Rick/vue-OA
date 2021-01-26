<template>
    <div class="app-container">
      <div class="buttons">
        <el-button type="primary" size="mini" @click="submitDocument">派发表单</el-button>
        <el-button type="primary" size="mini" @click="submit_button">保存为草稿</el-button>
        <el-button type="primary" size="mini" @click="submit_button">附件操作</el-button>
      </div>

      <div class="page-size">
        <div class="page-title">
          中共××××学院委员会发文稿纸
        </div>
        <div class="page-content">
          <div class="content-one">
            <div class="content-one-left">
              <div class="page-text">
                <div class="inputDeep">
                <span>签发：<el-input type="textarea" autosize v-model="dataModify.sign"></el-input></span>
                </div>
            </div>
            </div>
            <div class="content-one-right">
              <div class="page-text">
                <div class="inputDeep">
                <span>核稿：<el-input type="textarea" autosize v-model="dataModify.proofreading"></el-input></span>
                </div></div>
            </div>
          </div>
          <div class="content-two">
            <div class="content-two-left">
              <div class="page-text">
                <div class="inputDeep">
                <span>会签:：<el-input type="textarea" autosize v-model="dataModify.countersign"></el-input></span>
                </div></div>
            </div>
            <div class="content-two-right">
              <div class="page-text">
                <div class="inputDeep">
                <span>拟稿：<el-input type="textarea" autosize v-model="dataModify.draft"></el-input></span>
                </div></div>
            </div>
          </div>
          <div class="content-three">
            <div class="page-text">
              <div class="inputDeep">
              <span>标题：<el-input type="textarea" autosize v-model="dataModify.title"></el-input></span>
              </div></div>
          </div>
          <div class="content-four">
            <div class="page-text">
              <div class="inputDeep">
              <span>事由：
                <el-input type="textarea" autosize v-model="dataModify.body"></el-input>
              </span>
              </div></div>
          </div>
          <div class="content-three">
            <div class="page-text">
              <div class="inputDeep">
              <span>主送：
                <el-input type="textarea" autosize v-model="dataModify.mainDelivery"></el-input>
              </span>
              </div>
            </div>
          </div>
          <div class="content-five">
            <div class="content-five-left">
              <div class="page-text">
                <div class="inputDeep">
                <span style="float:left;">抄报：</span>
                <el-input  style="float:left; height: 40px; width: 180px; margin-top: -10px" type="textarea" autosize v-model="dataModify.duplicate"></el-input>
                </div></div>
            </div>
            <div class="content-five-right">
              <div class="page-text">
                <div class="inputDeep">
                <span style="float:left;">抄送：</span>
                <el-input  style="float:left; height: 40px; width: 180px; margin-top: -10px" type="textarea" autosize v-model="dataModify.secondDelivery"></el-input>
                </div></div>
            </div>

          </div>
          <div class="content-five">
            <div class="content-five-left">
              </div>
<!--            <div class="content-five-right-two">-->
              <div class="page-text">
                <div class="inputDeep">
                <span style="float: left">发出时间：</span>
                <el-input style="float:left; height: 40px; width: 180px" type="textarea" autosize v-model="dataModify.updateTime"></el-input>
                </div></div>
<!--            </div>-->
          </div>
          <div class="content-six">
            <div class="page-text">
              </div>
          </div>
          <div class="content-seven"></div>
          <div class="cotent-eight">
            说明：全部公文可在已办公文中自行查询，2020年之后，办公室不再提供大型检查所需以外的文件检索服务。
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getdaibanList,getdocselect,createDocument}  from '@/api/index'
    export default {
        name: "DraftPage",
      data() {
        return {
          dataModify: {
            body: "",  //事由
            countersign: "",  //会签
            creator: "",   //发起人
            // date: "string",
            // "documentType": "string",
            draft: "",  //拟稿
            duplicate: "",  //抄报
            // "id": 0,
            // "ifDraft": true,
            // "insertTime": "2021-01-20T02:21:05.680Z",
            mainDelivery: "",  //主送
            // "number": "string",
            proofreading: "", //核稿
            secondDelivery: "",  //抄送
            sign: "",  //签发
            title: "",  //标题
            updateTime: ""  //更新时间
          }
        }
      },
      methods: {
          submit_button() {
            this.$message.warning('此功能暂未对您开放！')
          },
        submitDocument() {
            createDocument(this.dataModify).then(res => {
              console.log('11')
            })
        },
        createNew(){
            this.dataModify.updateTime = ''
          this.dataModify.title = ''
          this.dataModify.sign = ''
          this.dataModify.proofreading = ''
          this.dataModify.secondDelivery = ''
          this.dataModify.mainDelivery = ''
          this.dataModify.duplicate = ''
          this.dataModify.draft = ''
          this.dataModify.creator = ''
          this.dataModify.body = ''
          this.dataModify.countersign = ''
        }
      }
    }
</script>

<style scoped>
  .page-size {
    width: 650px;
    height: 978px;
    background-color: #fff;
    margin: 0 auto;
    padding: 50px;
  }
  .page-title {
    text-align: center;
    margin-top: 20px;
    font-size: 25px;
    color: red;
    font-weight: bold;
    font-family: '宋体';
  }
  .page-content {
    margin-top: 30px;
    border-top: 2px solid red;
  }
  .content-one {
    border-bottom: 1px solid red;
    height: 190px;
  }
  .content-one-left {
    height: 190px;
    width: 275px;
    float: left;
    border-right: 1px solid red;
    padding: 10px 0 10px 0;
  }
  .page-text {
    color: red;
    font-size: 15px;
    font-family: '宋体';
    font-weight: 700;
  }
  .content-one-right {
    height: 190px;
    width: 275px;
    float: left;

    padding: 10px 0 10px 0;
  }
  .content-two {
    border-bottom: 1px solid red;
    height: 95px;
  }
  .content-two-left {
    height: 95px;
    width: 275px;
    float: left;
    border-right: 1px solid red;
    padding: 10px 0 10px 0;
  }
  .content-two-right {
    height: 95px;
    width: 275px;
    float: left;
    padding: 10px 0 10px 0;
  }
  .content-three {
    padding: 10px 0 10px 0;
    border-bottom: 1px solid red;
  }
  .content-four {
    width: 100%;
    height: 100px;
    border-bottom: 1px solid red;
    /*line-height: 100px;*/
  }
  .content-five {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid red;
  }
  .content-five-left {
    width: 275px;
    border-right: 1px solid red;
    float: left;
    height: 40px;
    padding: 10px 0 10px 0;
  }
  .content-five-right {
    width: 275px;
    float: left;
    height: 40px;
    padding: 10px 0 10px 0;
  }
  .content-five-right-two {
    width: 90px;
    float: left;
    height: 40px;
    padding: 10px 0 10px 0;
    border-right: 1px solid red;
  }
  .content-six {
    height: 180px;
    width: 100%;
    border-bottom: 1px solid red;
  }
  .content-seven {
    height: 50px;
    width: 100%;
    border-bottom: 1px solid red;
  }
  .cotent-eight {
    margin-top: 20px;
    font-size: 12px;
    color: red;
  }
  .buttons {
    width: 650px;
    margin: 10px auto;
    margin-top: 30px;
  }
  .inputDeep>>>.el-input__inner {
    border: 0;
  }
  .inputDeep>>>.el-textarea__inner {
    border: 0;
    resize: none;/* 这个是去掉 textarea 下面拉伸的那个标志，如下图 */
  }
</style>
