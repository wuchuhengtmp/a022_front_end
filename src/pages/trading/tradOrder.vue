<template>
    <div class="order whitefont">
        <headernav :value="title" style="position: fixed;top:0;left:0;right:0;"></headernav>
        <div class="order-main" v-for="(item,index) in mainList" :key="index">
            <div class="main-state">
                <div>状态:<span :name="item.status">{{item.status | states}}</span></div>
                <span class="order-buy">{{item.role | roles}}</span>
            </div>
            <div class="main-price">
                <div class="redfont">总价:<span>{{item.total_price}}元</span></div>
                <div>求购:<span>{{item.total}}GOB</span></div>
                <div>单价:<span>{{item.price}}元</span></div>
            </div>
            <div class="ordernumber">
                <div>订单号:<span>{{item.trade_no}}</span></div>
                <span>{{item.created_at}}</span>
            </div>
            <div class="orderstate">
                <span class="red" v-show="showcancle(item.role, item.status)" @click="cancle(item.id,index)">取消订单</span>
                <span class="blue" v-show="showaliay(item.role, item.status)" @click="check(item.alipay)">转账账号</span>
                <div class="yellow" v-show="item.status == 1 && item.role == 'buyer' ">
                    <input type="file" id="picture" value="提交截图" @change="addimg($event,item.id,index)" multiple accept=".jpg, .jpeg, .png"/>
                    <span>提交截图</span>
                </div>
                <span class="blue" v-show="isShowcheck(item.role, item.status)" @click="clickImg(item.thumb)">查看截图</span>
                <span class="yellow" v-show="isShowTransfer(item.role, item.status)" @click="finish(item.id,index)">已到账</span>
                <span class="red" v-show="item.status == 2 && item.role == 'buyer' " @click="complaint(item.id,index)">申诉</span> 
            </div>
        </div>
        <div class="loading" v-show="load">--加载中--</div>
        <div class="loading" v-show="!load">没有更多了</div>
        <bigimg v-show="showImg" :top="hei" @clickit="viewImg" :imgSrc="imgSrc"></bigimg>
    </div>
</template>

<script>
import bigimg from '../../components/bigimg'
import { MessageBox,Toast } from 'mint-ui';
import { move, stop} from '../../utils/index'
import { myList,canOrder,payOrder,finishOrder,appealOrder } from '../../api/user'
import headernav from '../../components/headernav'
const baseURL = 'http://a022laravel.mxnt.net'
export default {
    name:'order',
    components:{
        headernav,
        bigimg
    },
    data(){
        return{
            title:'我的订单',
            page:1,
            height1: 0,
            heighr2: 0,
            height3: 0,
            load:false,
            last_page:'',
            mainList:[],
            putFile:'',
            showImg:false,
            imgSrc: '',
            hei:'50'
        }
    },
    activated(){
        this.page = 1
        this.getOrder(this.page)
    },
    mounted(){
        window.addEventListener("scroll",this.handleScroll)
        window.addEventListener("scroll",this.text)
    },
    filters:{
        roles(index){
            if(index == 'buyer'){
                index = '求购'
            }else if(index == 'payer'){
                index = '卖出'
            }
            return index
        },
        states(value){
            if(value == 0){
                value = '挂单中'
            }else if(value == 1){
                value = '等待付款'
            }else if(value == 2){
                value = '等待确认'
            }else if(value == 3){
                value = '订单已完成'
            }else if(value == 4){
                value = '申诉中'
            }else if(value == -1){
                value = '已取消'
            }
            return value
        }
    },
    methods:{
        getOrder(index){
            myList(index).then(res => {
                let data = res.data
                this.mainList = data.list
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
                    myList(pages).then(res => {
                        let datas = res.data
                        this.mainList = this.mainList.concat(datas.list)
                    })
                }       
            }
        },
        cancle(value,index){
            MessageBox.confirm('确定取消订单?').then(action => {
                canOrder(value).then(res => {
                    MessageBox('提示','订单取消成功');
                    this.mainList.forEach(item => {
                        if(item.id == value){
                            this.mainList[index].status = -1
                        }
                    })
                })
            });
        },
        check(value){
            MessageBox.alert(value,'账号').then(action => {
                let input = document.createElement('input')
                input.value = value
                document.body.appendChild(input)
                input.select();
                document.execCommand("Copy")
                document.body.removeChild(input)
                Toast({
                    message: '复制成功',
                    position: 'middle',
                    duration: 2000
                });
            });
        },
        addimg(event,value,index){
            let imgFile = event.target.files[0]
            let form = new FormData()
            form.append('image',imgFile)
            this.$http({
                url: baseURL + '/api/images',
                method:'post',
                headers:{
                    'Content-type': 'multipart/form-data'
                },
                data:form
            }).then(res => {
                if(res.data.code !== 0){
                    Toast({
                        message: res.data.msg,
                        position: 'middle',
                        duration: 2000
                    });
                }else{
                    let data = res.data
                    this.putFile = data.data.path
                    payOrder(value,this.putFile).then(res => {
                        Toast({
                            message: '截图上传成功',
                            position: 'middle',
                            duration: 2000
                        });
                        this.mainList.forEach(item => {
                            if(item.id == value){
                                this.mainList[index].status = 2
                                this.getOrder(1)
                            }
                        })
                    })
                }
            })
        },
        clickImg(value){
            this.showImg = true;
            this.imgSrc = value 
            stop()
        },
        viewImg(){
            this.showImg = false;
            move()
        },
        complaint(id,index){
            MessageBox.prompt('请输入你的申诉内容','').then(({ value, action }) => {
                appealOrder(id,{
                    appeal_content: value
                }).then(res => {
                    MessageBox('提示','申诉成功');
                    this.mainList.forEach(item => {
                        if(item.id == id){
                            this.mainList[index].status = 4
                        }
                    })
                })
            });
            
        },
        finish(index,id){
            MessageBox.confirm('确认已到账?').then(action => {
                finishOrder(index).then(res => {
                    MessageBox('提示','订单完成');
                    this.mainList.forEach(item => {
                        if(item.id == index){
                            this.mainList[id].status = 3
                        }
                    })
                })
            });
        },
        isShowTransfer(role, status){
            return role === 'payer' && status === 2 ? true : false;
        },
        showcancle(role, status){
            if(role === 'payer' && status === 1){
                return true
            }else if(role === 'buyer' && status === 0){
                return true
            }
        },
        showaliay(role, status){
            if(role === 'buyer' && status === 2 || status === 1 && role === 'buyer'){
                return true
            }
        },
        isShowcheck(role, status){
            if(role === 'buyer' && status === 2){
                return true
            }else if(role === 'payer' && status === 2){
                return true
            }
        },
        text(){
            let height = window.pageYOffset ||
            document.body.scrollTop || document.documentElement.scrollTop
            
            if(height == 0){
                this.hei = height
            }else{
                let all_height = window.innerHeight /2
                this.hei = height + all_height
            }
        }
    }
}
</script>

<style scoped>
.order{
    padding-top: 2.8em;
    padding-bottom: 3rem;
    font-size: 14px;
}
.order-main{
    margin-top: 4%;
    background-color: #172748;
    padding: 0px 14px;
}
.main-state{
    display: flex;
    justify-content: space-between;
    padding: 3% 0px;
}
.main-price{
    display: flex;
    justify-content: space-between; 
    padding: 1% 0px;
}
.ordernumber{
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    padding: 3% 0px;
}
.orderstate{
    border-top: 1px solid #13203B;
    text-align: center;
    display: flex;
    justify-content: center;
    padding: 4% 0px;
}
div span{
    padding: 0px 6px;
}
#picture {
    width: 70px;
    position: absolute;
    padding-left: 2px;
    height: 15px;
    opacity: 0;
}
.order-buy{
    color: #3398FF;
    border: 1px solid #3398FF;
    font-size:12px;
    padding: 2px 8px;
    border-radius: 2px;
}
.redfont{
    font-size: 16px;
}
.orderstate span{
    font-size: 12px;
    padding: 3px 12px;
    border-radius: 25px;
    line-height: 14px;
}

.blue{
    margin: 0px 6px;
    border: 1px solid #3398FF;
    color: #3398FF;
}
.yellow{
    margin: 0px 6px;
    border: 1px solid #FFCC51;
    color: #FFCC51;
    padding-top: 2px;
    border-radius: 25px;
}
.red{
    margin: 0px 6px;
    border: 1px solid #F71F59;
    color: #F71F59;
}
</style>