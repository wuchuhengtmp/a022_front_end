<template>
    <div class="comm">
        <div v-show="leverShow">
            <headernav :value="value"></headernav>
            <div class="news-info">
                <ul v-for="(item,index) in newsinfo" :key="index" @click="goDetails(index,item.title)">
                    <li>{{item.title}}</li>
                    <li><span><i class="el-icon-arrow-right"></i></span></li>
                </ul>
            </div>
        </div>
        
        <notice v-show="!leverShow" :content="detail" v-on:goComp="isShow"></notice>
    </div>
</template>

<script>
import notice from './noticenews'
import headernav from '../../../components/headernav'
import { tranCenter } from '../../../api/user';
export default {
    name:'commnews',
    props:['newsinfo','value'],
    components:{
        headernav,
        notice
    },
    data(){
        return{
            leverShow: true,
            detail: ''
        }
    },
    methods:{
        goDetails(index,value){
            if(value == '修改交易密码'){
                this.$router.push('/changepay')
            }else if(value == '修改头像'){
                this.$router.push('/user/avator')
            }else{
                this.leverShow = false
                this.detail = this.newsinfo[index]
            }          
        },
        isShow(){
            this.leverShow = true
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    text-align: center;
    font-size: 16px;
    padding: 12px 10px;
    align-items: center;
    background: #172748;
}
.news-info{
    margin-top: 2%;
    font-size: 14px;
}
.news-info ul{
    background: #172748;
    padding: 16px 14px;
    display: flex;
    justify-content: space-between;
    border-bottom:1px solid #13203B;
}
</style>