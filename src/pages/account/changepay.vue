<template>
    <div class="changepay" :style="{height: hei + 'px'}">
        <div class="backimg">
            <img src="../../assets/images/regbeijing2@2x.png" alt="" height="100%" width="100%">
        </div>
        <div class="header">
            <i class="el-icon-arrow-left" style="text-align: left;flex:1;font-size:18px" @click="goback"></i>
            <div style="flex:2">修改交易密码</div>
            <i style="text-align: right;flex:1"></i>
        </div>
        <form :model="changePay" class="changepayform">
            <div class="getcode">
                <el-input placeholder="请输入验证码" v-model="changePay.mobileCode" @blur="mobileCodeError"></el-input>
                <button class="code" @click.prevent="getCode" v-show="showCode">获取验证码</button>
                <div class="code" v-show="!showCode">{{auth_time}}秒后重新发送</div>
            </div> 
            <el-input placeholder="请设置交易密码" maxlength="6" v-model="changePay.passWord" show-password ></el-input>
            <el-input placeholder="请再次确认交易密码" maxlength="6" v-model="changePay.repassPay" show-password @change="onpwCheck"></el-input>
            <el-button round @click="submit">提交</el-button>
        </form>
    </div>
</template>

<script>
import { verificationCode,passPay } from '../../api/user'
import { Toast } from 'mint-ui'
export default {
    name:'changepay',
    data(){
        return{
            changePay:{
                mobileCode:'',
                passWord:'',
                repassPay:''
            },
            showCode:true,
            auth_time:0,
            verificationCode:'',
            hei:''
        }
    },
    created(){
        this.hei = window.innerHeight
    },
    methods:{
        submit(){
            passPay({
                pwd: this.changePay.passWord,
                comfirm_pwd: this.changePay.repassPay,
                code: this.changePay.mobileCode,
                sms_key: this.verificationCode
            }).then(res => {
                Toast({
                    message: '密码修改成功',
                    position: 'middle',
                    duration: 2000
                });
                this.$router.go(-1)
            })
        },
        getCode(){
            this.auth_time = 60
            this.showCode = false
            let authTimer = setInterval(()=>{
                this.auth_time --;
                if(this.auth_time<=0){
                    this.showCode = true
                    clearInterval(authTimer)
                }
            },1000)
            verificationCode().then(res =>{
                this.verificationCode = res.data.key
            })
        },
        goback(){
            this.$router.go(-1)
        },
        onpwCheck(){
            if(this.changePay.passWord !== this.changePay.repassPay){
                Toast({
                    message: '两次的密码不一致',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        mobileCodeError(){
            if(this.changePay.mobileCode == ''){
                Toast({
                    message: '验证码不能为空',
                    position: 'middle',
                    duration: 2000
                });
            }
        }
    }
}
</script>

<style scoped>
.changepay{
    position: relative;
}
.header{
    display: flex;
    text-align: center;
    font-size: 16px;
    padding: 12px 10px;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    color: white;
    margin-bottom: 10%;
}
.backimg{
    width:100%;  
    height:100%;
    z-index:-1;
    position: absolute; 
}
.changepay >>> .el-input__inner{
    border-radius: 25px;
    background-color:rgba(255, 255, 255, 0.3);
    border: none;
    font-size: 12px;
    color: white;
}
.el-input{
    margin-bottom: 14px;
}
.el-button{
    background-image: linear-gradient(to right,#2AC8FC,#2777FF);
    border: none;
    color: white;
    margin: 16px 0px;
}
.el-button:focus, .el-button:hover {
    color: white;
    background-image: linear-gradient(to right,#2AC8FC,#2777FF);
}
.changepayform{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
}
.getcode{
    display: flex;
}
.code{
    position: absolute;
    right: 15%;
    height: 40px;
    color: #2AC1FD;
    font-size: 12px;
    line-height: 40px;
}
button{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;    
    background: rgba(0, 0, 0, 0);
}
</style>
