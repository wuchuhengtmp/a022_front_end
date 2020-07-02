<template>
    <div>
        <div class="detail">
            <input type="file" id="picture" @change="addimg" multiple accept=".jpg, .jpeg, .png"/>
        <div class="tip">
            <i class="el-icon-plus" style="font-size:50px;margin: 10% 0px 4%;"></i>
            <slot name="tip"></slot>
        </div>
        </div>
        <div class="padd">
            <div class="showimg" @click="chechimg">
                <img :src="imgSrc" alt="" width="100%" v-show="type == 'alipay'">
                <img :src="imgSrcs" alt="" width="100%" v-show="type == 'wechat'">
                <img src="" alt="" style="display:none">
            </div>
        </div>
        <div class="but">
            <button class="sambutton" @click="submit">提交</button>
        </div>

        <bigimg v-show="isShow" :top="hei" :imgSrc="type=='alipay' ? imgSrc : imgSrcs" @clickit="viewImg" ></bigimg>
    </div>
</template>

<script>
const baseURL = 'http://a022laravel.mxnt.net'
import {  Toast } from 'mint-ui'
import { getToken } from '../utils/auth'
import { setStore,getStore } from '../utils/index'
import bigimg from './bigimg'
import qs from 'qs'
export default {
    props:['type'],
    components:{
        bigimg
    },
    data(){
        return {
            putFile:'',
            imgSrc:'',
            imgSrcs:'',
            isShow:false,
            hei:'50',
        }
    },
    created(){
        this.imgSrc = getStore('alipay')
        this.imgSrcs = getStore('wechat')
    },
    methods:{
        addimg(event){
            let imgFiles = event.target.files[0];
            let reader = new FileReader();
            
            reader.addEventListener('load',() => {
                if(this.type == 'alipay'){
                    this.imgSrc = reader.result
                }else{
                    this.imgSrcs = reader.result
                }
                
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
        chechimg(){
            this.isShow = true
        },
        viewImg(){
            this.isShow = false
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
                    url: baseURL + '/api/users/me/payCodes',
                    method:'post',
                    headers:{
                        'Content-Type': 'application/x-www-form-urlencoded' ,
                        'Authorization': 'Bearer ' + getToken()
                    },
                    data:qs.stringify({
                        thumb: this.putFile,
                        type: this.type
                    })
                }).then(res => {
                    if(res.data.code !== 0){
                        Toast({
                            message: res.data.msg,
                            position: 'middle',
                            duration: 2000
                        });
                    }else{
                        let type = this.type
                        if(type == 'alipay'){
                            setStore(type,this.imgSrc)
                        }else{
                            setStore(type,this.imgSrcs)
                        }
                        Toast({
                            message: '收款码提交成功',
                            position: 'middle',
                            duration: 2000
                        });
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.detail{
    /* background-color: #172748; */
    padding: 4% 14px;
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
    width: 100%;
    height: 160px;  
    position: relative;
    z-index: 2;
    opacity: 0;
}
.padd{
    padding: 0px 14px;
}
.showimg{
    width: 100%;
    height: 180px;
    overflow: hidden;
    position: relative;
    border-radius: 12px;
    margin-top: 10px;
}
.tip{
    width: 92%;
    height: 160px;
    border-radius: 10px;
    background: #223660;
    position: absolute;
    top: 3%;
    text-align: center;
    left: 4%;
    color: #4865A0;
}
.but{
    padding: 0px 14px;
}
</style>
