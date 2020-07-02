<template>
    <div class="reg whitefont" :style="{height: hei + 'px'}">
        <div class="backimg">
            <img src="../../assets/images/regbeijing2@2x.png" alt="" height="100%" width="100%">
        </div>
        <div class="header">
            <i class="el-icon-arrow-left" style="text-align: left;flex:2;font-size:18px" @click="goback"></i>
            <div style="flex:1">注册</div>
            <i style="text-align: right;flex:2"></i>
        </div>
        <form :model="regForm" class="regform">
            <el-input placeholder="请输入本人银行卡绑定的手机号" v-model="regForm.userPhone"></el-input>
            <div class="getcode">
                <el-input placeholder="请输入验证码" v-model="regForm.mobileCode" @blur="mobileCodeError"></el-input>
                <button class="code" @click.prevent="getFication" v-show="showCode">获取验证码</button>
                <div class="code" v-show="!showCode">{{auth_time}}秒后重新发送</div>
            </div> 
            <el-input placeholder="请设置登录密码" v-model="regForm.passWord" show-password @blur="passWordError"></el-input>
            <el-input placeholder="请再次确认登录密码" v-model="regForm.repassWord" show-password @change="onpwCheck"></el-input>
            <el-input placeholder="请设置交易密码" maxlength="6" v-model="regForm.payPw" show-password></el-input>
            <el-input placeholder="请再次确认交易密码" maxlength="6" v-model="regForm.repayPw" show-password @change="onpayCheck"></el-input>
            <el-input placeholder="推荐人手机号" v-model="regForm.referPhone" ></el-input>
            <el-button round @click.prevent="submit">注册</el-button>
        </form>
        <div class="reg-rule">
            <div>点击注册即默认同意平台规则</div>
            <div>平台规则:</div>
            <div v-html="rule"></div>
        </div>
    </div>
</template>

<script>
import { ficationCodes , register, scrollNoti } from '../../api/user'
import { setToken,removeToken } from '../../utils/auth'
import { Toast } from 'mint-ui'
export default {
    name:'reg',
    data(){
        return{
            regForm:{
                userPhone:'',
                mobileCode:'',
                passWord:'',
                repassWord:'',
                payPw:'',
                repayPw:'',
                referPhone:'',
                agree: 1
            },
            ficationkey:'',
            showCode:true,
            auth_time:0,
            isAble:false,
            rule:'',
            hei:''
        }
    },
    created(){
        removeToken()
        this.regForm.referPhone = this.$route.query['phone']
        scrollNoti().then(res => {
            this.rule = res.data.register_warnning
        })
        this.hei = window.innerHeight;
    },
    methods:{
        submit(){
            register({
                code: this.regForm.mobileCode,
                pwd: this.regForm.passWord,
                comfirm_pwd: this.regForm.repassWord,
                transfer_pwd: this.regForm.payPw,
                comfirm_transfer_pwd: this.regForm.repayPw,
                referer_phone: this.regForm.referPhone,
                sms_key: this.ficationkey,
                is_agree: this.regForm.agree,
            }).then(res =>{
                setToken(res.data.access_token)
                Toast({
                    message: '注册成功',
                    position: 'middle',
                    duration: 2000
                })
                this.$router.push('/')
            })
        },
        // 验证码倒计时
        getFication(){
            if(!(/^1(3|4|5|7|8|9)\d{9}$/i.test(this.regForm.userPhone))){
                Toast({
                    message: '请输入正确的手机号码',
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
                ficationCodes({
                    phone: this.regForm.userPhone
                }).then(res =>{
                    this.ficationkey = res.data.key
                })
            }    
        },
        goback(){
            this.$router.go(-1)
        },
        onpwCheck(){
            if(this.regForm.passWord !== this.regForm.repassWord){
                Toast({
                    message: '两次的登录密码不一致',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        onpayCheck(){
            if(this.regForm.payPw !== this.regForm.repayPw){
                Toast({
                    message: '两次的交易密码不一致',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        userPhoneError(){
            if(!(/^1(3|4|5|7|8|9)\d{9}$/i.test(this.regForm.userPhone))){
                Toast({
                    message: '请输入正确的手机号码',
                    position: 'middle',
                    duration: 2000
                });
            }else if(this.regForm.userPhone == ''){
                Toast({
                    message: '手机号码不能为空',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        mobileCodeError(){
            if(this.regForm.mobileCode == ''){
                Toast({
                    message: '验证码不能为空',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
        passWordError(){
            if(this.regForm.passWord.length < 6){
                Toast({
                    message: '密码不能小于6位数',
                    position: 'middle',
                    duration: 2000
                });
            }
        },
    }
}
</script>

<style scoped>
.reg{
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
.reg-rule{
    width: 80%;
    margin: auto;
    font-size: 12px;
    line-height: 20px;
}
.reg-rule div:nth-child(2){
    margin-top: 4%;
}
.reg >>> .el-input__inner{
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
.backimg{
    width:100%;  
    height:100%;
    z-index:-1;
    position: absolute; 
}
.regform{
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