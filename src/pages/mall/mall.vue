<template>
    <div class="mall">
        <div> 
            <img src="../../assets/images/toutu@2x.png" width="100%">
        </div>
        <!-- ref="mallGoods"
        :style="`background-size: ${background}px`" -->
        <div class="mall-goods"  
        v-for="(item,index) in mallgoodsList" 
        :key="index">
            <div class="goods-item" @click="buymall(item.id)">
                <div class="goods-img">
                    <img :src="item.thumb" width="94%">
                </div>
                <div class="goods-title">
                    <p>{{item.title}}</p>
                    <span class="left">算力:{{item.shouyi}}</span>
                    <span class="right">运行周期:{{item.yszq}}时</span>
                    <div class="title-bott">
                        <div>收益总量:{{item.total_earnings}}</div>
                        <span>{{item.price}}GOB</span>
                    </div>
                </div>
            </div>
        </div>
        <footernav></footernav>
    </div>
</template>

<script>
import { MessageBox , Toast } from 'mint-ui';
import footernav from '../../components/footerNva'
import { getGoods , orderer } from '../../api/user'
export default {
    name:'mall',
    components:{
        footernav
    },
    data(){
        return{
            mallgoodsList:[]
        }
    },
    created(){
        this.goods()
    },
    methods:{
        goods(){
            getGoods().then(res => {
                this.mallgoodsList = res.data
            })
        },
        buymall(index){
            MessageBox.confirm('确定购买当前矿机?').then(action => {
                orderer({
                    goods_id: index
                }).then(res => {
                    if(res.code == 0){
                        Toast({
                            message: '购买成功',
                            //iconClass: 'el-icon-circle-check',
                            duration:2000
                        });
                    }
                })              
            });
        }
    }
    // mounted() {
    //     this.background = this.$refs.mallGoods.offsetWidth
    // }
}
</script>

<style scoped>
.mall{
    padding-bottom: 3rem;
}
.mall-goods{
    width: 90%;
    margin: auto;
    background: url('../../assets/images/kuang@2x.png') no-repeat; 
    background-size: 100%;
}
.goods-item{
    /* background: url('../../assets/images/kuang@2x.png') no-repeat;  */
    display: flex;
    color: white;
    padding-bottom: 5%;
}
.goods-title {
    min-width: 60%;
}
.goods-img{
    padding: 6px 10px;
    width: 100px;
    height: 100px;
}
.goods-title p{
    line-height: 28px;
    font-size: 14px;
    margin-top: 8%;
}
.goods-title span{
    padding: 0px 4px;
    border-radius: 4px;
    font-size: 11px;
}
.left{
    background-color: #3398FF;
    /* margin-right: 8px; */
}
.right{
    background-color: #E0184E;
}
.title-bott{
    margin-top: 8%;
    display: flex;
    justify-content: space-between;
}
.title-bott div{
    color: #32EEC0;
    font-size: 14px;
    margin-top: 2%;
}
.title-bott span{
    text-align: center;
    background-image: linear-gradient(to bottom, #12D6B8, #32EEC0);
    padding: 0px 6px;
    border-radius: 25px;
    line-height: 20px;
}
</style>