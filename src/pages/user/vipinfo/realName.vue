<template>
    <div class="realname whitefont">
        <headernav :value="title"></headernav>
        <div class="real-details">
            <div class="detail">
                <input type="text" placeholder="请输入您的真实姓名" @blur="nameError" v-model="name">
            </div>
            <div class="detail">
                <input type="number" placeholder="请输入您的身份证号码" v-model="idcard">
            </div>
            <div class="detail">
                <input type="text" placeholder="银行名称" v-model="bankname">
            </div>
            <div class="detail">
                <input type="number" placeholder="银行卡号" v-model="banknumber">
            </div>
            <div class="detail">
                <input type="text" placeholder="支付宝账号" v-model="alipay">
            </div>
            <div class="detail">
                <input type="file" id="picture" @change="addimg" multiple accept=".jpg, .jpeg, .png"/>
                <div class="tip">
                    <i class="el-icon-plus" style="font-size:50px;margin: 10% 0px 4%;"></i>
                    <p style="font-size:14px">手持身份证正面照</p>
                </div>
            </div>
            <div class="padd">
                <div class="showimg" @click="chechimg">
                    <img :src="imgSrc" alt="" width="100%">
                    <img src="" alt="" style="display:none">
                </div>
            </div>
        </div>
        <div class="real-but">
            <button class="sambutton" @click="submit">提交</button>
            <div class="cont">
                <div class="redfont">注意事项:</div>
                <div class="content">
                    <p>1.拍照设备：用像素500万以上的手机或相机，对焦在身份证上进行拍照，如用触屏的手机或相机，可在拍照时先点击屏幕中的身份证再按拍照键（避免相机自动人脸识别对焦在脸部而造成身份证模糊）</p>
                    <p>2.拍照环境：在光线充足的地方进行拍照，但避免光线直射，防止拍照时身份证反光</p>
                    <p>3.拍照技巧：拍照时尽量固定相机，用一只手扶稳相机，身体依靠在固定的支撑物上，避免相机抖动造成照片模糊</p>
                    <p>4.拍照姿势：必须面对镜头，手持身份证并尽可能保持静止，脸部不能被遮挡，身份证与脸部保持同一水平面，确保证件信息清晰可见</p>
                </div>
            </div>
        </div>
        <bigimg v-show="isShow" :top="hei" :imgSrc="imgSrc" @clickit="viewImg" ></bigimg>
    </div>
</template>

<script>
import bigimg from '../../../components/bigimg'
import headernav from '../../../components/headernav'
import {  Toast } from 'mint-ui';
import { getToken } from '../../../utils/auth'
import { move, stop} from '../../../utils/index'
import qs from 'qs'
const baseURL = 'http://a022laravel.mxnt.net'
export default {
    name:'nerealnamews',
    components:{
        headernav,
        bigimg
    },
    data(){
        return{
            title:'实名认证',
            name:'',
            idcard:'',
            bankname:'',
            banknumber:'',
            alipay:'',
            isShow:false,
            imgSrc: require('../../../assets/images/shili@2x.png'),
            putFile:'',
            hei: 0
        }
    },
    mounted(){
        window.addEventListener("scroll",this.text)
    },
    methods:{
        addimg(event){
            let imgFiles = event.target.files[0];
            let reader = new FileReader();
            
            reader.addEventListener('load',() => {
                this.imgSrc = reader.result
            },false)

            if(imgFiles){
                reader.readAsDataURL(imgFiles)
            }

            let form = new FormData()
            form.append('image',imgFiles)
            this.$http({
                url: baseURL + '/api/images',
                method:'post',
                headers:{
                    'Content-type': 'multipart/form-data'
                },
                data:form
            }).then(res => {
                if(res.data.code !== 0){
                    Toast({
                        message: res.data.msg,
                        position: 'middle',
                        duration: 2000
                    });
                }else{
                    let data = res.data
                    this.putFile = data.data.path
                    Toast({
                        message: '图片上传成功',
                        position: 'middle',
                        duration: 2000
                    });
                }
            })
        },
        submit(){
            if(this.putFile == ''){
                 Toast({
                        message: '图片未上传完成',
                        position: 'middle',
                        duration: 2000
                    });
            }else{
                this.$http({
                    url: baseURL + '/api/users/me/realnames',
                    method:'post',
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded' ,
                        'Authorization': 'Bearer ' + getToken()
                    },
                    data:qs.stringify({
                        id_car: this.idcard,
                        fullname: this.name,
                        bank_name: this.bankname,
                        bank: this.banknumber,
                        image: this.putFile,
                        alipay: this.alipay
                    })
                }).then(res => {
                    if(res.data.code !== 0){
                        Toast({
                            message: res.data.msg,
                            position: 'middle',
                            duration: 2000
                        });
                    }else{
                        Toast({
                            message: '认证已提交',
                            position: 'middle',
                            duration: 2000
                        });
                        this.$router.go(-1)
                    }
                })
            }
        },
        nameError(){
            let name = this.name
            let reg = /[\u4e00-\u9fa5]/ig
            if(!reg.test(name)){
                Toast({
                    message: '请输入正确的名字',
                    position: 'middle',
                    duration: 2000
                })
            }
        },
        viewImg(){    
            this.isShow = false
            move()
        },
        chechimg(){
            this.isShow = true
            stop()
        },
        text() {
            let height = window.pageYOffset ||
            document.body.scrollTop || document.documentElement.scrollTop
            if(height == 0){
                this.hei = height
            }else{
                let all_hei = window.innerHeight/2
                this.hei = height +all_hei
            }
        }
    }
}
</script>

<style scoped>
.real-details{
    margin-top: 2%;
}
.detail{
    background-color: #172748;
    padding: 4% 14px;
}
.detail:nth-child(even){
    border-top: 1px solid #13203B;
    border-bottom: 1px solid #13203B;
} 
input{  
	background:none;  
	outline:none;  
    border:none;
    color: white;
    text-align: left;
    font-size: 14px;
}
input::placeholder{
    color:#4865A0;
}
#picture{
    width: 92%;
    height: 160px;  
    position: absolute;
    z-index: 2;
    opacity: 0;
}
.padd{
    padding: 10px 14px;
}
.showimg{
    width: 100%;
    height: 180px;
    overflow: hidden;
    position: relative;
    border-radius: 12px;
}
.tip{
    width: 100%;
    height: 160px;
    border-radius: 10px;
    background: #223660;
    text-align: center;
    color: #4865A0;
}
.real-but{
    padding: 0px 14px;
}
.redfont{
    font-size: 16px;
    padding-bottom: 2%;
}
.content{
    font-size: 12px;
    line-height: 1.8em;
    margin-bottom: 5%;
}
</style>