<template>
    <div class="login whitefont" :style="{height:hei + 'px'}">
        <div class="backimg">
            <img src="../../assets/images/loginbeijing@2x.png" width="100%" height="100%" alt="">
        </div>
        <form :model="loginForm" class="loginform">
            <el-input placeholder="请输入账号" v-model="loginForm.userPhone"></el-input>
            <el-input placeholder="请输入密码" v-model="loginForm.userpw" show-password></el-input>
            <div class="getcode">
                <el-input placeholder="请输入验证码" v-model="loginForm.code" @blur="codeError"></el-input>
                <button class="code" @click.prevent="Code">
                    <img :src="imgFile" alt="" width="100%" height="40px">
                </button>
            </div> 
            <el-button round @click.prevent="submit">登录</el-button>
        </form>
        <div class="loginconfig">
            <router-link to="/reg">立即注册</router-link>
            <router-link to="/changepw" >找回密码</router-link>
        </div>
        <el-button id="down" round @click="download" v-show="isShow">下载APP</el-button>
    </div>
</template>

<script>
import { getCode , login} from '../../api/user'
import { setToken,removeToken } from '../../utils/auth'
import { Toast } from 'mint-ui'
export default {
    name:'login',
    data(){
        return{
            loginForm:{
                userPhone:'',
                userpw:'',
                code:'',
            },
            imgFile:'',
            capkey:'',
            isShow:true,
            hei:''
        }
    },
    created(){
        removeToken()
        this.Code()
        this.hei = window.innerHeight;
    },
    mounted(){
        if (/LT-APP/.test(navigator.userAgent)) {
            this.isShow = false
        }
    },
    methods:{
        submit(){
            login({
                username:this.loginForm.userPhone,
                password:this.loginForm.userpw,
                code:this.loginForm.code,
                captcha_key:this.capkey
            }).then(res => {
                let data = res.data
                setToken(data.access_token)
                Toast({
                    message: '登录成功',
                    position: 'middle',
                    duration: 2000
                })
                this.$router.push('/')
            })
        },
        download(){
            let a = document.createElement("a")
            a.href = 'http://wap.a022.mxnt.net/static/adr-v105.apk'
            a.click()
        },
        Code(){
            getCode().then((res)=>{
                let data = res.data
                this.imgFile = data.captcha_image_content
                this.capkey = data.captcha_key
            })
        },
        codeError(){
            if(this.loginForm.code == ''){
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
.login{
    position: relative;
}
.router-link-active {
    text-decoration: none;
    color: #2AC0FC;
}
a {
    text-decoration: none;
    color: #2AC0FC;
}
.loginconfig{
    width: 80%;
    margin: auto;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #2AC0FC;
    margin-bottom: 10%;
    margin-top: 16px;
}
#down{
    width: 80%;
    margin: 0px 10%;
    background-image: linear-gradient(to right,#FBCB5A,#FB9B5B);
}
.login >>> .el-input__inner{
    border-radius: 25px;
    background-color:rgba(255, 255, 255, 0.3);
    border: none;
    font-size: 12px;
    color: white;
}
.el-input{
    margin-bottom: 8%;
}
.el-button{
    background-image: linear-gradient(to right,#2AC8FC,#2777FF);
    border: none;
    color: white;
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
.loginform{
    display: flex;
    flex-direction: column;
    width: 80%;
    margin: auto;
    padding-top: 58%;
}
.getcode{
    display: flex;
}
.code{
    height: 40px;
    color: #2AC1FD;
    width: 50%;
    margin-left: 4%;
}
button{
    margin: 0;
    padding: 0;
    border: none;
    outline: none;    
    background: rgba(0, 0, 0, 0);
}
</style>