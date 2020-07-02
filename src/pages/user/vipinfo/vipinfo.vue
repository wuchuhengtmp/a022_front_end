<template>
    <div class="vipinfo whitefont">
        <div class="info-back">
            <div class="header">
                <i class="el-icon-arrow-left" style="text-align: left;flex:2;font-size:18px" @click="goback"></i>
                <div style="flex:1">会员信息</div>
                <i style="text-align: right;flex:2"></i>
            </div>
            <div class="info-title"> 
                <div class="info-img">
                    <img :src="avator" alt="" width="100%" height="100%">
                </div>
                <div class="info-msg">
                    <span class="msg-badges">{{level}}</span>
                    <div class="msg-bot">
                        <div>我的ID:<span>{{myid}}</span></div>
                        <div>上级ID:<span>{{mypid}}</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-details">
            <ul>
                <li>手机号验证</li>
                <li>{{phone}}<span class="bluefont">已认证</span></li>
            </ul>
            <ul  @click="gotoAddress('realname')">
                <li>实名认证</li>
                <li>{{status | check}}<span><i class="el-icon-arrow-right"></i></span></li>
            </ul>
            <ul @click="gotoAddress('collecard')">
                <li>收款设置</li>
                <li><span><i class="el-icon-arrow-right"></i></span></li>
            </ul>
            <ul @click="gotoAddress('addresscard')">
                <li>收货地址</li>
                <li><span><i class="el-icon-arrow-right"></i></span></li>
            </ul>
            <ul @click="gotoAddress('walletcard')">
                <li>虚拟钱包</li>
                <li><span><i class="el-icon-arrow-right"></i></span></li>
            </ul>
        </div>
    </div>
</template>

<script>
import { getStore } from '../../../utils/index'
import { myUser, userInfo } from "../../../api/user"
export default {
    name:'vipinfo',
    activated() {
        this.getInfo()
        this.avator = getStore('user_ava').avator
        this.level = getStore('user_info').level
        this.myid = getStore('user_info').user_id
        this.mypid = getStore('user_info').pid
        this.phone = getStore('user_info').phone
    },
    filters:{
        check(value){
            if(value == 0){
                return "未认证"
            }else if(value == 1){
                return "认证中"
            }else if(value == 2){
                return "已认证"
            }
        },
        purse(item){
            if(item == null){
                return "未认证"
            }else{
                return "已认证"
            }
        }
    },
    data(){
        return{
            title:'会员信息',
            level:'',
            myid:'',
            mypid:'',
            avator:'',
            phone:'',
            status:'',
            virtual_purse:'',
            address:''
        }
    },
    methods:{
        goback(){
            this.$router.go(-1) 
        },
        gotoAddress(index){
            this.$router.push('/user/' + index)
        },
        getInfo(){
            myUser().then(res => {
                let data = res.data
                this.status = data.certification_status;
                this.virtual_purse = data.virtual_purse
                this.address = data.address

                //this.avator = data.avator
                //this.level = data.level_name
                //this.myid = data.id
                //this.mypid = data.pid
                //this.phone = data.phone
            })
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    text-align: center;
    font-size: 16px;
    padding: 12px 10px;
    align-items: center;
}
.bluefont{
    color: #0F7AE8;
}
.vipinfo{
    font-size: 14px;
}
.info-back{
    background: url('../../../assets/images/beijinglan@2x.png') no-repeat; 
    background-size: cover;
}
.info-title{
    display: flex;
    padding: 10px 14px;
    align-items: center;
}
.info-img{
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 4px;
    margin-right: 4%;
}
.msg-badges{
    font-size: 12px;
    color: #0F7AE8;
    border-radius: 10px;
    background-color: white;
    padding: 1px 10px;
}
.msg-bot {
    display: flex;
    margin-top: 5%;
}
.info-msg{
    flex: 2;
}
.msg-bot div{
    flex: 2;
}
.msg-bot span{
    margin: 0px 3%;
}
.info-details{
    margin-top: 2%;
}
.info-details ul{
    background-color: #172748;
    padding: 18px 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #13213b;  
}
ul li:nth-child(2){
    flex: 2;
    text-align: right;
}
ul li span{
    margin-left: 2%;
}
</style>
