<template>
    <div class="extension whitefont">
        <div class="header">
            <i class="el-icon-arrow-left" style="text-align: left;flex:1;font-size:18px;margin-left:12px" @click="goback"></i>
            <div style="flex:2;text-align: center;">推广招募</div>
            <i @click="download" style="text-align: right;flex:1;font-size:12px;margin-right:12px">保存海报</i>
        </div>
        <div class="backimg">
            <!-- <img src="../../assets/images/xuanchuantu@2x.png" alt="" width="100%" height="100%"> -->
            <img :src="imgSrc" alt="" width="100%" height="100%">
        </div>
        <div class="ext-copy">
            <div class="adress">{{copydata}}</div>
            <div class="ext-but" @click="copy">复制链接</div>
        </div>
        <!-- <div class="qrcode">
            <img src="" alt="" width="100%">
        </div> -->       
    </div>
</template>

<script>
import { posters } from '../../api/user'
import { Toast } from 'mint-ui';
import { setStore,getStore } from '../../utils/index'
import { jsBridge } from '../../assets/js/jsbridge-mini'
export default {
    name:'extension',
    data(){
        return{
            copydata:'',
            imgSrc:'',
        }
    },
    created(){
        posters().then(res => {
            this.copydata = res.data.popularize_url
            //this.imgSrc = res.data.image
            setStore('poster',res.data.image)
            this.$nextTick(() => {
                this.imgSrc = getStore('poster')
            })
        })
    },
    activated(){
        posters().then(res => {
            this.copydata = res.data.popularize_url
            //this.imgSrc = res.data.image
            setStore('poster',res.data.image)
            this.$nextTick(() => {
                this.imgSrc = getStore('poster')
            })
        })
    },
    methods:{
        goback(){
            this.$router.go(-1);
        },
        copy(){
            let input = document.createElement('input')
            input.value = this.copydata
            document.body.appendChild(input)
            input.select();
            document.execCommand("Copy")
            document.body.removeChild(input)
            Toast({
                message: '复制成功',
                position: 'middle',
                duration: 2000
            });
        },
        download(){
            if(this.imgSrc == ''){
                Toast({
                    message: '海报生成中,请稍后',
                    position: 'middle',
                    duration: 2000
                });
            }else{
                if (jsBridge && jsBridge.inApp) {
                    jsBridge.saveImageToAlbum(this.imgSrc, function (succ) {
                        Toast(succ ? "保存成功" : "保存失败：下载失败或没有相册使用权限");
                    });
                }else{
                    let a = document.createElement('a')
                    a.href = this.imgSrc
                    a.setAttribute("download", "qrcode.png");
                    a.click()
                }
            }
            
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    text-align: center;
    font-size: 16px;
    align-items: center;
    width: 100%;
    position: absolute;
    height: 2.4em;
}
.ext-copy{
    position: absolute;
    width: 100%;
    display: flex;
    top: 64%;
    left: 17%;
    line-height: 40px;
    width: 64%;
    line-height: 30px;
    background: #0A9A76;
    border-radius: 5px;
    font-size: 12px;
    justify-content: center;
}
.adress{
    flex: 2;
    padding-left: 6px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
}
.ext-but{
    text-align: center;
    flex: 1;
    background: #17EFBA;
    color: #333;
    border-radius: 0px 5px 5px 0px;
}
.backimg{
    width: 100%;
    height: 100%;
    z-index: -1;
    position: absolute;
}
a {
    color: white;
}
.qrcode{
    position: absolute;
    width: 120px;
    height: 120px;
    top: 74%;
    left: 34%; 
    border-radius: 10%;
    border: 1px solid #333; 
    background: white;
}
</style>
