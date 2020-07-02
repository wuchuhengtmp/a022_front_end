<template>
    <div class="noticenews whitefont">
        <div class="header">
            <i class="el-icon-arrow-left" style="text-align: left;flex:2;font-size:18px" @click="goback"></i>
            <div style="flex:1">{{title}}</div>
            <i style="text-align: right;flex:2"></i>
        </div>
        <div class="notice">
            <div class="notice-title" v-html="content.title">
                <!-- {{content.title}} -->
            </div>
            <div class="notice-cont" v-html="content.content">
                <!-- {{content.content}} -->
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'noticenews',
    props:['content'],
    data(){
        return{
            title:'详情',
            imgSrc:''
        }
    },
    methods:{
        goback(){
            this.$emit('goComp')
        },
    }
}
</script>

<style scoped>
.notice{
    margin-top: 2%;
    background-color: #172748;
    font-size: 14px;
    line-height: 18px;
    padding: 16px 14px;
}
.notice-title{
    font-size: 16px;
    text-align: center;
    padding: 0px 0px 3%;
}
.notice-cont{
    text-align: left;
}
.header{
    display: flex;
    text-align: center;
    font-size: 16px;
    padding: 12px 10px;
    align-items: center;
    background: #172748;
}
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