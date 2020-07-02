<template>
    <div class="changepw" :style="{height : hei + 'px'}">
        <div class="backimg">
            <img src="../../assets/images/regbeijing2@2x.png" alt="" height="100%" width="100%">
        </div>
        <div class="header">
            <i class="el-icon-arrow-left" style="text-align: left;flex:2;font-size:18px" @click="goback"></i>
            <div style="flex:1">找回密码</div>
            <i style="text-align: right;flex:2"></i>
        </div>
        <form :model="changePw" class="changepwform">
            <el-input placeholder="请输入本人银行卡绑定的手机号" v-model="changePw.userPhone"></el-input>
            <div class="getcode">
                <el-input placeholder="请输入验证码" v-model="changePw.mobileCode" @blur="mobileCodeError"></el-input>
                <button class="code" @click.prevent="getCode" v-show="showCode">获取验证码</button>
                <div class="code" v-show="!showCode">{{auth_time}}秒后重新发送</div>
            </div> 
            <el-input placeholder="请设置登录密码" v-model="changePw.passWord" show-password></el-input>
            <el-input placeholder="请再次确认登录密码" v-model="changePw.repassWord" show-password @change="onpwCheck"></el-input>
            <el-button round @click="submit">提交</el-button>
        </form>
    </div>
</template>

<script>
import { verificationCodes,passWord } from '../../api/user'
import { Toast } from 'mint-ui'
export default {
    name:'changepw',
    components:{
        
    },
    data(){
        return{
            showCode:true,
            auth_time:0,
            changePw:{
                userPhone:'',
                mobileCode:'',
                passWord:'',
                repassWord:''
            },
            verificationkey:'',
            hei:''
        }
    },
    created(){
        this.hei = window.innerHeight;
    },
    methods:{
        submit(){
            passWord({
                code: this.changePw.mobileCode,
                sms_key: this.verificationkey,
                pwd: this.changePw.passWord,
                comfirm_pwd: this.changePw.repassWord
            }).then(res => {
                Toast({
                    message: '密码修改成功',
                    position: 'middle',
                    duration: 2000
                });
                this.$router.push('/login')
            })
        },
        goback(){
            this.$router.go(-1)
        },
        getCode(){
            if(this.changePw.userPhone == ''){
                Toast({
                    message: '手机号码不能为空',
                    position: 'middle',
                    duration: 2000
                });
            }else{
                this.showCode = false
                this.auth_time = 60
                let authTimer = setInterval(()=>{
                    this.auth_time --;
                    if(this.auth_time <= 0){
                        this.showCode = true
                        clearInterval(authTimer)
                    }
                },1000);
                verificationCodes(
                    this.changePw.userPhone
                ).then(res =>{
                    this.verificationkey = res.data.key
                })
            } 
        },
        onpwCheck(){
            if(this.changePw.passWord !== this.changePw.repassWord){
                Toast({
                    message: '两次的密码不一致',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        mobileCodeError(){
            if(this.changePw.mobileCode == ''){
                Toast({
                    message: '验证码不能为空',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
    }
}
</script>

<style scoped>
.changepw{
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
.changepw >>> .el-input__inner{
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
.changepwform{
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
