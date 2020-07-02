<template>
    <div class="milled whitefont">
        <div class="background">
            <img src="../../assets/images/beijing@2x.png" width="100%">
        </div>
        <div class="property">
            <div>
                <div class="por-item">{{jinbi}}</div>
                <div class="por-title">总资产(GOB)</div>
            </div>
            <div>
                <div class="por-item">{{output_for_day}}</div>
                <div class="por-title">个人产量(GOB/天)</div>
            </div>
            <div>
                <div class="por-item">{{output}}</div>
                <div class="por-title">个人算力(GS/S)</div>
            </div>
        </div>
        <div class="gameCanvas">
            <div 
            v-for="(item,index) in last_list"
            :key="index"
            >
                <div
                :class="{'ballout':item.check}"
                class="ball_small" 
                :style="{top:item.top+'px',left:item.left+'%', width: width + 'px', height: width + 'px'}"
                >
                <!-- @click="hiddenBall(item,index)" -->
                <img src="../../assets/images/baoshi.png" alt="" width="30" height="30">
                {{item.price | prices}}
                </div>
            </div>
        </div>
        <div class="game-allget">
            <span @click="allGet">一键收取</span>
        </div>
        <div class="allmill">
            <!-- tba切换 -->
            <div class="millstate">      
                <span :class="{'color':index===nowIndex}" v-for="(state,index) in stateList" :key="index" @click="toggleState(index)">{{state}}</span>        
            </div>
            <div class="milldetail">
                <ul>
                    <li style="width:10%">状态</li>
                    <li style="width:20%">机号</li>
                    <li style="width:20%">类型</li>
                    <li style="width:13%">运行时间(时)</li>
                    <li style="width:15%">算力产量(GOB/天)</li>
                </ul>
                <millon :millingList="millingListOn" v-show="nowIndex===0"></millon>
                <milloff :millstopList="millingListStop" v-show="nowIndex===1"></milloff>
            </div>
        </div>
        <footernav></footernav>
    </div>
</template>

<script>
import footernav from '../../components/footerNva'
import { getOrder , orders , allEarn } from '../../api/user'
import millon from './millOn'
import milloff from './millOff'
import { Toast } from 'mint-ui'
export default {
    name:'milled',
    components:{
        footernav,
        millon,
        milloff
    },
    filters:{
        prices(value){
            return parseFloat(value).toFixed(2)
        }
    },
    data(){
        return{
            nowIndex:0,
            stateList:[
                '运行中',
                '已停止'
            ],
            jinbi:'',
            output:'',
            output_for_day:'',
            list:[],
            last_list:'',
            millingListOn:[],
            millingListStop:[],
            ballList:[
                {
                    top:76,
                    left:5,
                    check:false,
                    id:1
                },
                {
                    top: 140,
                    left: 12,
                    check:false,
                    id:2
                },
                {
                    top:96,
                    left:26,
                    check:false,
                    id:3
                },
                {
                    top: 160,
                    left: 40,
                    check:false,
                    id:4
                },
                {
                    top: 254,
                    left: 50,
                    check:false,
                    id:5
                },
                {
                    top: 190,
                    left: 64,
                    check:false,
                    id:6
                },
                {
                    top: 240,
                    left: 8,
                    check:false,
                    id:7
                },
                {
                    top: 100,
                    left: 58,
                    check:false,
                    id:8
                },
                {
                    top: 350,
                    left: 60,
                    check:false,
                    id:9
                },
                {
                    top: 320,
                    left: 20,
                    check:false,
                    id:10
                },
                {
                    top: 230,
                    left: 82,
                    check:false,
                    id:11
                },
                {
                    top: 330,
                    left: 38,
                    check:false,
                    id:12
                },
                {
                    top: 116,
                    left: 88,
                    check:false,
                    id:13
                },
                {
                    top: 316,
                    left: 80,
                    check:false,
                    id:14
                },
                {
                    top: 225,
                    left: 30,
                    check:false,
                    id:15
                },
            ],
            width: 30,
        }
    },
    created(){
        this.orderList()
        getOrder(0).then(res => {
            this.millingListOn = res.data
        })
        getOrder(1).then(res => {
            this.millingListStop = res.data
        })
    },
    activated(){
        this.orderList()
        getOrder(0).then(res => {
            this.millingListOn = res.data
        })
        getOrder(1).then(res => {
            this.millingListStop = res.data
        })
    },
    methods:{
        toggleState(index){
            this.nowIndex = index
        },
        orderList(){
            orders().then(res => {
                let data = res.data
                this.jinbi = data.jinbi
                this.output = data.output
                this.output_for_day = data.output_for_day
                this.list = data.list
                this.last_list = this.list.map((item,index) =>{
                    return {...item,...this.ballList[index]}
                })
            })
            
        },
        allGet(){
            for(let i = 0; i <this.last_list.length; i++){
                this.last_list[i]['check'] = true
                let timer = setTimeout(()=>{
                    this.last_list.splice(0,15)
                    this.list.splice(0,15)
                    clearTimeout(timer)
                },1000)
            }
            allEarn().then(res => {
                if(res.code == 0){
                    Toast({
                        message: '收取成功',
                        position: 'middle',
                        duration: 2000
                    })
                }else{
                    Toast({
                        message: res.msg,
                        position: 'middle',
                        duration: 2000
                    })
                }
            })
        },
        // hiddenBall(item,index){
        //     item.check = true;
        //     let timer = setTimeout(()=>{
        //         this.last_list.splice(index,1)
        //         this.list.splice(index,1)
        //         clearTimeout(timer)
        //     },1000)
        // },
    }
}
</script>

<style scoped>
.milled{
    padding-bottom: 3rem;
}
.background{
    width:100%;  
    height:100%;
    z-index:-1;
    position: absolute; 
}
.por-item{
    color: #1eecd2;
    font-size: 20px;
    font-weight: 550;
}
.por-title{
    font-size: 12px;
}
.property{
    display: flex;
    justify-content: space-around;
    text-align: center;
    line-height: 24px;
    padding: 14px 0px 8px;
    text-align: inherit;
}
.game-allget span{
    font-size: 12px;
    background: #E01683;
    border-radius: 30px;
    padding: 8px 0px;
    width: 26%;
    text-align: center;
    letter-spacing: 1px;
}
.game-allget {
    display: flex;
    justify-content: flex-end;
    margin: 0px 4% 2%;
}
.gameCanvas{
    width: 100%;
    height: 310px;
}
@media only screen and (max-height: 600px){
    .allmill{ min-height: 160px; }
}
@media only screen and (min-height: 600px){
    .allmill{ min-height: 220px; }
}
@media only screen and (min-height:700px){
    .allmill{ min-height: 280px; }
}
@media only screen and (min-height:780px){
    .allmill{ min-height: 320px; }
}
.allmill{
    background-color: #12203b;
    width: 100%;
    border-radius: 25px 25px 0px 0px;
    padding-bottom: 10px;
}
.millstate {
    font-size: 14px;
    text-align: center;
    padding: 26px 0px 30px;
}
.millstate span{
    padding: 4px 22px;
    border-radius: 25px;
    background-color: #36324B;
}
.millstate span:nth-child(1){
    margin-right: 16%;
}
.color{
    background-color: #16D8B9 !important;
}
.milldetail {
    padding: 0px 10px;
}
ul {
    display: table-row;
    width: 100%;
    font-size: 14px;
}
ul li {
    font-size: 12px;
    text-align: center;
    display: table-cell;
    padding-bottom: 8px;
    line-height: 16px;
}
ul li img{
    vertical-align: text-top;
}

.ball_small {
    position: absolute;
    cursor:pointer;
    float:left;
    z-index: 10;
    text-align: center;
    font-size: 12px;
    animation: heart 1s ease-in-out infinite alternate;
}
.ballout{
    animation:ballClick 1s ease; 
}
@keyframes heart{
    from{transform:translate(0,0)}
    to{transform:translate(0,8px)}
}
@keyframes ballClick{
    0% {
        position: absolute;
        opacity: 1;
    }
    50% {
        position: absolute;
        opacity: 0.5;
    }
    100% {
        position: absolute;
        transform: translateY(-50%);
        opacity: 0;
    }
}
</style>