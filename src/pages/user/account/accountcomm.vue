<template>
    <div class="accountcomm">
        <headernav :value="title"></headernav>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <!-- <el-tab-pane label="全部" name="first"> -->
                <!-- <allbill :billList="allList" :bill="billTitle"></allbill> -->
            <!-- </el-tab-pane> -->
            <!-- <el-tab-pane label="购机" name="second">
                <allbill :bill="minerList"></allbill>
            </el-tab-pane>
            <el-tab-pane label="收益" name="third">
                <allbill :bill="profitList"></allbill>
            </el-tab-pane>
            <el-tab-pane label="交易" name="fourth">
                <allbill :bill="dealList"></allbill>
            </el-tab-pane>
            <el-tab-pane label="转账" name="five">
                <allbill :bill="transferList"></allbill>
            </el-tab-pane>
            <el-tab-pane label="动态" name="six">
                <allbill :bill="trendsList"></allbill>
            </el-tab-pane>
            <el-tab-pane label="其他" name="seven">
                <allbill :bill="otherList"></allbill>
            </el-tab-pane> -->
        </el-tabs>
        <div class="loading" v-show="load">--加载中--</div>
        <div class="loading" v-show="!load">没有更多了</div>
    </div>
</template>

<script>
import { logs } from '../../../api/user'
import headernav from '../../../components/headernav'
import allbill from './allbill'
export default {
    name:'accountcomm',
    components:{
        headernav,
        allbill,
    },
    created(){
        //this.activeName = this.$route.query['activeName']
        //this.getLogs(this.page)
    },
    data(){
        return{
            title:'个人账单',
            activeName:'first',
            allList:[],
            billTitle:'',
            last_page:'',
            page: 1,
            height1: 0,
            heighr2: 0,
            height3: 0,
            load:false
            // minerList:'7.8',
            // profitList:'7.6',
            // dealList:'7.5',
            // transferList:'7.4',
            // trendsList:'7.3',
            // otherList:'7.2'
        }
    },
    // methods:{
    //     handleClick(tab, event) {
    //         console.log(tab, event);
    //     },
    //     getLogs(index){
    //         logs(index).then(res => {
    //             console.log(res)
    //             let data = res.data
    //             this.allList = data.list
    //             this.billTitle = data.coint
    //             this.last_page = data.last_page
    //         })
    //     },
    //     handleScroll(){
    //         //滚轮高度
    //         var scrollTop =
    //             window.pageYOffset ||
    //             document.documentElement.scrollTop ||
    //             document.body.scrollTop;
    //         this.height2 = scrollTop;
    //         //页面高度
    //         this.height3 = window.innerHeight;
    //         //屏幕总高度(加上滚轮)
    //         this.height1 = document.documentElement.scrollHeight;

    //         if(this.height2 + this.height3 >= this.height1 ){ 
    //             this.load = !this.load 
    //             let pages = ++this.page  
    //             if(pages <= this.last_page){            
    //                 console.log(pages)
    //                 logs(pages).then(res => {
    //                     console.log(res)
    //                     let datas = res.data
    //                     this.allList = this.allList.concat(datas.list)
    //                 })
    //             }       
    //         }
    //     },
    // }
}
</script>

<style scoped>
div >>> .el-tabs__nav-wrap{
    background-color: #172748;
}
div >>> .el-tabs__item{
    font-size: 12px;
    color: white;
    height: 34px;
}
div >>> .el-tabs__item:hover {
    color: #0F7AE8;
}
div >>> .el-tabs__nav-wrap::after{
    background-color:rgba(0, 0, 0, 0);
}
</style>
