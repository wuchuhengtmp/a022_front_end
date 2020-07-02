<template>
    <div class="commguild whitefont">
        <headernav :value="level | state"></headernav>
        <div class="comm-title">
            <li style="flex: 2;">时间</li>
            <li style="flex: 1;">级别</li>
            <li style="flex: 2;">会员</li>
            <li style="flex: 1;">算力</li>
            <li style="flex:1">认证</li>
        </div>
         <ul v-for="(item,index) in personnelList" :key="index">
            <li>{{item.created_at}}</li>
            <li>{{item.level}}</li>
            <li>{{item.phone}}</li>
            <li>{{item.computes}}</li>
            <li>{{item.certification_status | value}}</li>
        </ul>
    </div>
</template>

<script>
import { guildLevel } from '../../../api/user'
import headernav from '../../../components/headernav'
export default {
    name:'commguild',
    components:{
        headernav
    },
    activated(){
        this.level = this.$route.query['type']
        guildLevel(this.level).then(res => {
            this.personnelList = res.data.list
        })
    },
    // created(){
    //     this.level = this.$route.query['type']
    //     guildLevel(this.level).then(res => {
    //         this.personnelList = res.data.list
    //     })
    // },
    filters:{
        state(value){
            if(value == 1){
                return "一级团队"
            }else if(value == 2){
                return "二级团队"
            }else if(value == 3){
                return "三级团队"
            }
        },
        value(index){
            if(index == 0){
                return "未认证"
            }else if(index == 1){
                return "认证中"
            }else if(index == 2){
                return "已认证"
            }
        }
    },
    data(){
        return{
            level:'',
            personnelList:[]
        }
    }
}
</script>

<style scoped>
.commguild{
    font-size: 14px;
}
.comm-title{
    list-style: none;
    display: flex;
    text-align: center;
    background-color: #172748;
    padding: 8px 0;
}
.commguild ul:nth-child(even){
    background: #223660;
}
ul{
    display: flex;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
}
ul li{
    flex: 1;
}
ul li:first-child{
    flex: 2;
}
ul li:nth-child(3){
    flex: 2;
}
</style>
