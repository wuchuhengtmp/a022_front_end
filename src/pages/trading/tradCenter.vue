<template>
    <div class="center whitefont">
        <!-- <headernav :value="title" style=""></headernav> -->
        <div class="header">
            <i class="el-icon-arrow-left" style="text-align: left;flex:1;font-size:18px;margin-left:12px" @click="goback"></i>
            <div style="flex:2;text-align: center;">求购中心</div>
            <i style="text-align: right;flex:1;font-size:12px;margin-right:12px"></i>
        </div>
        <div class="cen-item" v-for="(item,index) in itemList" :key="index">
            <div class="cen-img">
                <img :src="item.avator" alt="" width="100%">
            </div>
            <div class="cen-all">
                <ul>
                    <li>
                        <p>数量:<span>{{item.total}}GOB</span></p>                        
                    </li>
                    <li>
                        <p>信誉分:<span>{{item.buyer_credit}}</span></p>                   
                    </li>
                </ul>
                <ul>
                    <li>
                        <p>单价:<span>{{item.price}}</span></p>    
                    </li>
                    <li class="redfont bigfont">
                        <p>总价:<span>{{item.total_price}}</span></p>   
                    </li>
                </ul>
            </div>
            <div class="cen-saleout" @click="saleOut(item.id,index)">
                <div>卖出</div>
            </div>
        </div>
        <div class="loading" v-show="load">--加载中--</div>
        <div class="loading" v-show="!load">没有更多了</div>
        <nut-shortpassword 
            :visible="isShow2"
            @close="shortpwdClose2"
            type="center"
        ></nut-shortpassword>
    </div>
</template>

<script>
import { myOrders , payOrders } from '../../api/user'
import { MessageBox , Toast } from 'mint-ui';
// import headernav from '../../components/headernav'
export default {
    name:'center',
    // components:{
    //     headernav
    // },
    data(){
        return{
            // title:'求购中心',
            isShow2:false,
            val2:'',
            itemList:[],
            item_id:'',
            page: 1,
            height1: 0,
            heighr2: 0,
            height3: 0,
            last_page: '',
            load:false,
            item_index:''
        }
    },
    activated(){
        this.page = 1
        this.getOrders(this.page)
    },
    mounted(){
        window.addEventListener("scroll",this.handleScroll)
    },
    methods:{
        goback(){
            this.$router.push('/trading')
        },
        getOrders(index){
            myOrders(index).then(res => {
                let data = res.data
                this.itemList = data.list
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
                    myOrders(pages).then(res => {
                        let datas = res.data
                        this.itemList = this.itemList.concat(datas.list)
                    })
                }       
            }
        },
        saleOut(index,id){
            MessageBox.confirm('确定卖出GOB?').then(action => {
                this.item_id = index
                this.isShow2 = true;
                this.item_index = id
            });
        },
        shortpwdClose2(val){
            if(val) this.val2 = val;
            payOrders({
                order_id: this.item_id,
                transfer_password: this.val2
            }).then(res => {
                if(res.code == 0){
                    MessageBox('提示', '卖出成功,请注意收款信息');
                    this.itemList.forEach(item => {
                        if(item.id == this.item_id){
                            this.itemList.splice(this.item_index,1)
                        } 
                    })
                }
            }) 
            this.isShow2 = false;
        },
    }
}
</script>

<style scoped>
.center{
    padding-top: 2.6rem;
    padding-bottom: 3em;
}
.header{
    background: #172748;
    position: fixed;
    top:0;
    left:0;
    right:0;
    display: flex;
    text-align: center;
    font-size: 16px;
    align-items: center;
    width: 100%;
    height: 2.4em;
}
.cen-item{
    margin-top: 3%;
    background: #172748;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.cen-img{
    width: 50px;
    height: 50px;
    margin: 10px 3%;
    overflow: hidden;
    border-radius: 5px;
}
.cen-all {
    display: flex;
    flex: 2;
    text-align: left;
    font-size: 14px;
    line-height: 26px;
}
.cen-all span{
    margin: 0px 6px;
}
.cen-all ul:first-child{
    margin-right: 4%;
}
.cen-saleout{
    height: 100%;
    background: #1BB6F7;
    height: 4em;
    width: 4em;
    text-align: center;
    line-height: 4em;
}
.bigfonts{
    font-size: 16px;
}
</style>
