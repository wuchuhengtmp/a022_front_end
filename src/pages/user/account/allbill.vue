<template>
    <div class="allbill">
        <headernav :value="title" style="position: fixed;top:0;left:0;right:0;"></headernav>
        <div class="bill-title">
            <div>+{{billTitle}}</div>
        </div>
        <ul class="bill-details" v-for="(item,index) in allList" :key="index">
            <li class="detail-number">
                <p :class="item.type == 1 ? 'redfont' : 'bluefont'">{{item.type | info}}{{item.coint}}</p>
                <span>{{item.crated_at}}</span>
            </li>
            <li class="detail-task">
                <p>{{item.title}}</p>
            </li>
        </ul>
        <!-- <ul class="bill-details">
            <li class="detail-number">
                <p class="bluefont">+10.00000</p>
                <span>2020/05/26 04:32:03</span>
            </li>
            <li class="detail-task">
                <p>签到成功,活跃度+1</p>
            </li>
        </ul> -->
        <div class="loading" v-show="load">--加载中--</div>
        <div class="loading" v-show="!load">没有更多了</div>
    </div>
</template>

<script>
import { logs } from '../../../api/user'
import headernav from '../../../components/headernav'
export default {
    name: "allbill",
    components:{
        headernav
    },
    // props:['billList','bill'],
    data(){
        return{
            title:'个人账单',
            allList:[],
            billTitle:'',
            last_page:'',
            page: 1,
            height1: 0,
            heighr2: 0,
            height3: 0,
            load:false
        }
    },
    mounted(){
        window.addEventListener("scroll",this.handleScroll)
    },
    activated() {
        this.page = 1
        this.getLogs(this.page)
    },
    // created(){
    //     this.getLogs(this.page)
    // },
    filters:{
        info(value){
            if(value == 1){
                return '-'
            }else if(value == 2){
                return '+'
            }
        }
    },
    methods:{
        getLogs(index){
            logs(index).then(res => {
                let data = res.data
                this.allList = data.list
                this.billTitle = data.coint
                this.last_page = data.last_page
            })
        },
        handleScroll(){
            //滚轮高度
            var scrollTop =
                window.pageYOffset ||
                document.documentElement.scrollTop ||
                document.body.scrollTop;
            this.height2 = scrollTop;
            //页面高度
            this.height3 = window.innerHeight;
            //屏幕总高度(加上滚轮)
            this.height1 = document.documentElement.scrollHeight;
            
            if(this.height2 + this.height3 >= this.height1 ){ 
                this.load = !this.load 
                let pages = ++this.page  
                if(pages <= this.last_page){            
                    logs(pages).then(res => {
                        let datas = res.data
                        this.allList = this.allList.concat(datas.list)
                    })
                }    
            }
        },
    }
}
</script>

<style scoped>
.allbill{
    padding-top: 2.8em;
    padding-bottom: 3em;
}
.bill-title div{
    color: #0AD7CB;
    font-size: 3em;
    font-weight: 600;
    width: 100%;
    height: 110px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.bill-details{
    background-color: #172748;
    padding: 12px 14px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #13203B;
}
.detail-number p{
    font-size: 18px;
    font-weight: 550;
}
.bluefont{
    color: #0F7AE8;
}
.detail-number span{
    color: #4865A0;
    font-size: 12px;
}
.detail-task{
    color: white;
    font-size: 12px;
    line-height: 34px;
}
</style>
