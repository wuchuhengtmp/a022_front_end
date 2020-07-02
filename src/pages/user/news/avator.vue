<template>
    <div class="avator whitefont">
        <headernav :value="title"></headernav>
        <div>
            <ul>
                <li>头像</li>
                <li class="expice">
                    <div class="ava-img">
                        <img :src="imgSrc" width="100%" height="100%" alt="">
                    </div>
                    <span><i class="el-icon-arrow-right"></i></span>
                </li>
            </ul>
            <input type="file" id="picture" @change="addimg" multiple accept=".jpg, .jpeg, .png"/>
        </div>
    </div>
</template>

<script>
const baseURL = 'http://a022laravel.mxnt.net'
import { Toast } from 'mint-ui'
import { getToken } from '../../../utils/auth'
import { userInfo } from "../../../api/user"
import { getStore,setStore } from '../../../utils/index'
import headernav from '../../../components/headernav'
import qs from 'qs'
export default {
    name:'avator',
    components:{
        headernav
    },
    data(){
        return{
            title:'修改头像',
            imgSrc:'',
            putFile:''
        }
    },
    created(){
        this.imgSrc = getStore('user_ava').avator
    },
    methods:{
        addimg(event){
            let imgFiles = event.target.files[0]
            let reader = new FileReader()

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
                    'Content-type' : 'multipart/form-data'
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
                    this.subimg()
                }
            })
        },
        subimg(){
            userInfo({
                avator: this.putFile
            }).then(res => {
                setStore('user_ava',{
                    avator: 'http://a022laravel.mxnt.net/storage/'+ this.putFile
                })
                Toast({
                    message: '头像修改成功',
                    position: 'middle',
                    duration: 2000
                });
            })
        }
    }
}
</script>

<style scoped>
.avator ul{
    margin-top: 2%;
    background-color: #172748;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    line-height: 60px;
}
.ava-img{
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 4px;
    z-index: 10;
}
.expice {
    display: flex;
}
input{  
	background:none;  
	outline:none;  
    border:none;
    color: white;
    text-align: left;
    font-size: 14px;
}
#picture{
    width: 100%;
    height: 70px;
    position: relative;
    z-index: 2;
    position: absolute;
    top: 8%;
    opacity: 0;
}
</style>