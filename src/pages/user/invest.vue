<template>
  <div class="invest whitefont">
    <headernav :value="title"></headernav>
    <div class="invest-main">
      <div class="invest-select">
        <div>{{value}}</div>
        <div class="selecter" @click="drawer = true">
          <p>选择充值类型</p>
          <i class="el-icon-arrow-right" style="font-size:18px"></i>
        </div>
      </div>
      <el-drawer
        title="我是标题"
        :visible.sync="drawer"
        :direction="direction"
        :with-header="false"
        :before-close="handleClose">
        <div class="title-select">请选择充值类型</div>
        <div class="cont-select" v-for="(value,i) in mianList" :key="i">
          <div @click="select(value.id,value.title)">{{value.title}}</div>
        </div>
      </el-drawer>
      <div class="invest-cont">
        <input placeholder="请输入手机号" type="number" v-model="phone">
      </div>
      <!-- <div class="invest-cont">
        <input placeholder="请输入身份证后4位数" type="number" v-model="identity">
      </div> -->
      <div class="invest-amount">
        <div>充值金额</div>
        <div>
          <el-radio-group v-model="radio">
            <el-radio-button :label="item.id" v-for="(item,index) in mainLister" :key="index">
              <p>{{item.volume}}</p>
              <p class="small">{{item.price}}GOB</p>
              <div class="none"></div>
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="btn">
        <button class="sambutton" @click="submint">充值</button>
      </div>
      <div class="invest-atten">
        <div class="redfont">注意事项:</div>
        1 请正确输入 您要充值的11位手机号码<br>
        2 充值申请订单提交后，系统将尽快给你充值<br>
        3 更多详情，请咨询客服。感谢您的使用！<br>
      </div>
    </div>
    <nut-shortpassword 
        :visible="isShow2"
        @close="shortpwdClose2"
        type="center"
    ></nut-shortpassword>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { getCard,cardOrder } from '../../api/user'
import headernav from "../../components/headernav";
export default {
  name: "invest",
  components: {
    headernav
  },
  activated(){
    getCard().then(res => {
      this.mianList = res.data
    })
    
  },
  computed:{
    mainLister(){
      let main = this.mianList
      let index = this.select_id
      for(let i in main){
        for(let j in main[i]){
          return main[index].prices
        }      
      }
    }
  },
  data() {
    return {
      title: "充值卡",
      value: "话费充值",
      select_id:'0',
      drawer:false,
      isShow2:false,
      val2:'',
      direction: 'btt',
      mianList:[],
      phone: "",
      radio:'1',
    };
  },
  methods: {
    select(id,title){
      this.value = title
      this.select_id = id -1
      this.drawer = false
    },
    handleClose(done){
      done();
    },
    submint(){
      this.isShow2 = true
    },
    shortpwdClose2(val){
        if(val) this.val2 = val;
        if(this.phone == ""){
          Toast({
            message: '手机号不能为空',
            position: 'middle',
            duration: 2000
          });
        }else{
          cardOrder({
              id: this.radio,
              number: this.phone,
              transfer_password: this.val2
          }).then(res => {
              this.phone = ''
              this.radio = 1
              if(res.code == 0){
                  Toast({
                    message: '订单提交成功',
                    position: 'middle',
                    duration: 2000
                  });
              }
          }) 
        }
        this.isShow2 = false;
      },
  }
};
</script>

<style scoped>
.redfont{
    font-size: 16px;
    padding-bottom: 2%;
}
.invest-main {
  margin-top: 2%;
  background-color: #172748;
  padding: 4% 14px;
  font-size: 14px;
}
.invest-cont {
  background-color: #172748;
  padding: 2% 0px;
  font-size: 14px;
}
.invest-select {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #223660;
  padding: 2% 0px 2%;
  margin-bottom: 2%;
}
.invest-amount div:first-child{
  padding: 2% 0px 3%;
  width: 100%;
}
.el-radio-button p:first-child{
  font-size: 20px;
}
.small{
  font-size: 12px;
  margin: 12% 0px;
}
.none{
  padding: 2%;
  background: #2D4880;
  border-radius: 6px;
  margin: 0px 30%;
}
.title-select{
  padding: 4%;
  border-bottom: #223660 1px solid;
  color: #4865A0 !important;
}
.cont-select div{
  height: 40px;
  line-height: 40px;
}
.invest >>> .el-drawer{
    overflow: scroll;
}
.invest >>> .el-drawer:focus {
    outline: none;
}
.invest >>> .el-drawer__body {
    text-align: center;
    font-size: 14px;
}
.invest >>> .el-drawer__body>* {
    color: white;
}
.invest >>>.el-radio-button__inner {
    border-radius: 3px;
    margin: 0px 4px;
    width: 104px;
    height: 80px;
    color: #4865A0;
    background: #223660;
    border: none;
}
.invest >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    color: #FFF;
    background-color: #2D4783;
    border-color: none;
    box-shadow: none;
}
.invest >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner .none {
    background-color: white;
}
.invest >>> .el-radio-button{
    width: 33%;
}
.invest-atten{
  line-height: 22px;
  font-size: 12px;
}
.selecter {
  font-size: 12px;
  color: #4865a0;
  display: flex;
  line-height: 20px;
}
input {
  background: none;
  outline: none;
  border: none;
  color: white;
  text-align: left;
  font-size: 14px;
  background-color: #223660;
  border-radius: 3px;
  width: 95%;
  height: 40px;
  padding-left: 14px;
}
input::placeholder {
  color: #4865a0;
}
</style>
