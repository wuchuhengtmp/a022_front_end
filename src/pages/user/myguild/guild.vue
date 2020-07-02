<template>
    <div class="guild whitefont">
        <headernav :value="title"></headernav>
        <!-- <div class="guild-tab">
            <div :class="{'color':index === activeName}" v-for="(item,index) in titleList" :key="index" @click="toggleState(index)">{{item}}</div>
        </div> -->
        <netcard  v-show="isActive"></netcard>
        <!-- <myguild  v-show="activeName==1"></myguild>
        <admincard  v-show="activeName==2"></admincard> -->
        <div class="noneguild" v-show="!isActive">暂无工会</div>
    </div>
</template>

<script>
import netcard from './netcard'
import myguild from './myguildcard'
import admincard from './admincard'
import headernav from '../../../components/headernav'
export default {
    name:'guild',
    components:{
        headernav,
        netcard,
        myguild,
        admincard
    },
    // created(){
    //     this.isGuild = this.$route.query['guild']
    //     if(isGuild == null){
    //         isActive = false
    //     }
    // },
    data(){
        return{
            title:'我的公会',
            isActive:true,
            // isGuild:'',
            //activeName: 0,
            titleList:[
                '基站网络',
                '所属公会',
                '公会管理'
            ],
        }
    },
    methods:{
        // toggleState(index){
        //     this.activeName = index
        // }
    }
}
</script>

<style scoped>
.guild-tab{
    background: #172748;
    font-size: 12px;
    display: flex;
    padding: 0px 20px 0px;
    line-height: 30px;
    margin-bottom: 4%;
}
.guild-tab div{
    width: 33%;
    text-align: center;
    margin: 0px 20px;
}
.color{
    color: #0F7AE8;
    border-bottom: 1px solid #0F7AE8;
}
.noneguild{
    margin: 10%;
    text-align: center;
}
</style>
