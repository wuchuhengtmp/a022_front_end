<template>
    <div class="trading whitefont">
        <mt-header title="交易大厅"></mt-header>
        <div class="rate">
            <div class="rate-left">
                <p class="redfont">{{curr}}<span>￥</span></p>
                <span>=1GOB</span>
            </div>
            <div class="rate-right">
                <ul>
                    <li>
                        <p>最高价<span class="redfont">{{best}}</span></p>                        
                    </li>
                    <li class="bluefont">
                        <p>最低价<span>{{last}}</span></p>                   
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>交易量<span>{{order}}</span></p>    
                    </li>
                    <li>
                        <p>手续费<span>{{service}}%</span></p>   
                    </li>
                </ul>
            </div>
        </div>
        <div class="sparklines">
            <div class="lines-title">
                <p>实时价格表</p>
                <p>当前价格<span class="redfont" style="margin-left:4px">{{curr}}</span></p>
            </div>
            <!-- echarts图表 -->
            <div id="myChart" :style="{width: '100%', height: '280px',left: 'center'}"></div>
        </div>
        <div class="btnnav"> 
            <div class="prelative" v-for="(item,index) in btnnavList" :key="index" @click="gotoAddress(item.url)">
                <img :src="item.src" alt="" width="50%">
                <div>{{item.name}}</div>
            </div>
        </div>
        <footernav></footernav>
    </div>
</template>

<script>

require('echarts/lib/chart/line')
require('echarts/lib/component/tooltip')
import 'zrender/lib/svg/svg'
import footernav from '../../components/footerNva'
import tradCenterVue from './tradCenter.vue';
import { tranCenter } from '../../api/user'
export default {
    name:'trading',
    components:{
        footernav
    },
    data(){
        return{
            btnnavList:[
                {
                    name:'求购中心',
                    url:'center',
                    src: require('../../assets/images/qiugouzhongxin@2x.png')
                },
                {
                    name:'发布求购',
                    url:'release',
                    src:require('../../assets/images/fabuqiugou@2x.png')
                },
                {
                    name:'我的订单',
                    url:'order',
                    src: require('../../assets/images/wodedingdan@2x.png')
                },
                {
                    name:'交易记录',
                    url:'details',
                    src: require('../../assets/images/jiaoyijilu@2x.png')
                },
            ],
            best:'',
            last:'',
            order:'',
            service:'',
            curr:'',
            rate_money:1.64,
            dateTimeList:[],
            dataLineList:[]
        }
    },
    created(){
        let date = Date.parse(new Date())/1000;
        for(let i=6;i>=0;i--){
            this.dateTimeList.push(this.timestampToTime(date));
            this.dateTimeList.sort()
            date = date-86400;
        }  
    },
    mounted(){ 
        tranCenter().then(res => {
            let data = res.data
            this.best = data.best_price
            this.last = data.least_price
            this.order = data.orders_count
            this.service = data.service_charge
            this.curr = data.current_price
            this.dataLineList = data.prices
            this.drawLine();
        })    
    },
    // beforeRouteEnter(to,from,next){
    //     if(from.name == 'index' || from.name == 'mall' 
    //     || from.name == 'milled' || from.name == 'user'){
    //         to.meta.keepAlive = false
    //     }else{
    //         to.meta.keepAlive = true
    //     }
    //     next()
    // },
    methods:{
        gotoAddress(index){
            if(index == 'release'){
                this.$router.push(
                    {
                        path:'/trading/release',
                        query:{
                            server: this.service,
                            curr: this.curr
                        }
                    }
                )
            }else if(index == 'details'){
                this.$router.push("/user/account" );
            }else{
                this.$router.push("/trading/" + index);
            }
        },
        // 日期
        timestampToTime(timestamp) {
            var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
            var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            return M+D;
        },
        // 图表设定
        drawLine(){
            let myChart = this.$echarts.init(document.getElementById('myChart'),null, {renderer: 'svg'})
            myChart.setOption({
                color:'#0982F3',
                textStyle: {
                    color: '#fff',
                    fontSize:'12',
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        animation: false,
                        label: {
                            backgroundColor: '#fff',
                            borderColor: '#ccc',
                            borderRadius:2,
                            borderWidth: 1,
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,

                            color: '#222'
                        }
                    },
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine:{
                        show:false,
                    },
                    axisTick:{
                        show : false
                    },
                    data: this.dateTimeList
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    axisTick:{
                        show : false
                    },
                    splitLine:{
                        show:false,
                    },
                    axisLine:{
                        lineStyle:{
                            color : 'rgba(0, 0, 0, 0)'
                        }
                    },
                },
                series: [{
                    data: this.dataLineList,
                    type: 'line',
                    areaStyle: {
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(15, 122, 232, 0.3)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(15, 122, 232, 0)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        }
                    },
                }]
            });
        }
    },
    
}
</script>

<style scoped>
.trading{
    padding-bottom: 3rem;
}
.trading .mint-header {
    background-color: #172748;
} 
.rate{
    background-color: #172748;
    display: flex;
    justify-content: space-between;
    padding: 14px 20px;
    margin-bottom: 3%;
}
.rate-left{
    letter-spacing: 1px;
    margin: auto 0px;
}
.rate-left p{
    font-size: 22px;
    font-weight: 500;
}
.rate-left span{
    font-size: 12px;
    line-height: 20px;
}
.rate-right{
    display: flex;
    line-height: 30px;
    font-size: 12px;
}
.rate-right ul:first-child{
    margin-right: 14px;
}
ul li span{
    margin: 0px 4px;
}
.bluefont span{
    color: #1BB6F7;
}
.sparklines{
    background-color: #172748;
    padding: 10px 20px 0px;
    font-size: 12px;
    margin-bottom: 3%;
}
.lines-title{
    display: flex;
    justify-content: space-between;
}
.btnnav{
    display: flex;
    justify-content: space-between;
    text-align: center;
    padding: 10px 20px;
    font-size: 12px;
    background-color: #172748;
}
.prelative div{
    margin-top: 8%;
}
</style>