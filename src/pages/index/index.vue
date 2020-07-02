<template>
    <div class="index whitefont">
        <div>
            <img src="../../assets/images/toutu@2x.png" width="100%">
        </div>
        <div class="bg-notic" ref="box">
            <div class="font-notic" ref="text">{{content}}</div>
        </div>
        <div class="seat"></div>
        <div class="imgnav" v-for="(item,index) in imgnavList" :key="index" @click="gotoAddress(item.url)">
            <img :src="item.src" width="100%">
        </div>
        <footernav></footernav>
    </div>
</template>

<script>
import { scrollNoti } from '../../api/user'
import { MessageBox } from 'mint-ui'
import footernav from '../../components/footerNva'
export default {
    name:'index',
    components:{
        footernav
    },
    data(){
        return{
            nowTime:null,
            content:'',
            imgnavList:[
                {
                    url:'',
                    src:require('../../assets/images/APPjieshao@2x.png')
                },
                {
                    url:'/trading',
                    src:require('../../assets/images/kuangchang@2x.png')
                },
                {
                    url:'/mall',
                    src:require('../../assets/images/kuangjishishang@2x.png')
                },
                {
                    url:'',
                    src:require('../../assets/images/pingtaishangcheng@2x.png')
                },
                {
                    url:'/milled',
                    src:require('../../assets/images/wakuangxingqiu@2x.png')
                },
            ]
        }
    },
    mounted(){
        scrollNoti().then(res => {
            let data = res.data
            this.content =  data.content
            this.$nextTick(() => {
                this.move()
            })
        })
        
    },
    beforeDestroy(){
        clearInterval(this.nowTime)
        this.nowTime = null
    },
    methods:{
        gotoAddress(item){
            if(item == ''){
                // MessageBox('提示','正在施工中');
            }else{
                this.$router.push(item)
            }
        },
        move(){
            //盒子宽度
            let width1 = this.$refs.box.getBoundingClientRect().width
            //文字总宽度
            let width2 = this.$refs.text.offsetWidth

            let i = 0
            this.nowTime = setInterval(() => { 
                i--
                if(i< -width2){
                    i = width1
                }
                this.$refs.text.style.transform = 'translateX('+ i +'px)'
            },20)
        },
    }
}
</script>

<style scoped>
.index{
    padding-bottom: 3rem;
}
.imgnav{
    margin: 20px 16px;
}
.seat{
    height: 16px;
}
.bg-notic{
    font-size: 14px;
    display: block;
    width: 90%;
    height: 30px;
    overflow: hidden;
    margin-left: 5%;
    position: absolute;
}
.font-notic{
    position: absolute;
	top: 0;
	line-height: 30px;
	display: block;
	word-break: keep-all;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
