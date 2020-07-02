<template>
    <div class="release whitefont">
        <headernav :value="title"></headernav>
        <div class="rel-order">
            <div class="rel-number">
                <div class="number-title">买入数量</div>
                <el-radio-group v-model="radio" v-for="(item,index) in label" :key="index">
                    <el-radio-button :label="item.total"></el-radio-button>
                </el-radio-group>
            </div>
            <div class="rel-style rel-border">
                <div>求购单价</div>
                <div class="bulefont">当前单价:{{curre}}</div>
                <!-- <input type="number" placeholder="当前单价:11.50" v-model="price"> -->
            </div>
            <div class="rel-style">
                <div>购买总价</div>
                <div class="redfont">总价:{{allPrice | prices}}</div>
            </div>
        </div>
        <div class="rel-attention">
            <div class="atten-title redfont">注意事项:</div>
            <div class="atten-cont" v-html="rule">
            </div>
        </div>
        <div class="rel-saleout">
            <button class="sambutton" @click="saleout">确认发布</button>
        </div>
        <nut-shortpassword 
            :visible="isShow2"
            @close="shortpwdClose2"
            link=""
            type="center"
        ></nut-shortpassword>
    </div>
</template>

<script>
import { tranSation, getTran,scrollNoti } from '../../api/user'
import headernav from '../../components/headernav'
import { MessageBox , Toast } from 'mint-ui';
export default {
    name:'release',
    components:{
        headernav
    },
    data(){
        return{
            title:'发布求购',
            radio: 10,
            isShow2:false,
            val2:'',
            label:[],
            server:'',
            curre:'',
            rule:''
        }
    },
    filters:{
        prices(value){
            return value.toFixed(2)
        }
    },
    created(){
        this.server = this.$route.query['server']
        this.curre = this.$route.query['curr']
        getTran().then(res => {
            this.label = res.data
        })
        scrollNoti().then(res => {
            this.rule = res.data.create_order_warnning
        })
    },
    computed:{
        allPrice(){
            return Math.round(this.curre * this.radio *  (100 +  parseInt(this.server))) * 0.01
        }
    },
    methods:{
        saleout(){
            if(this.price == ''){
                Toast({
                    message: '请输入求购单价',
                    position: 'middle',
                    duration: 2000
                });
            }else{
                MessageBox.confirm('确定求购GOB?').then(action => {
                    this.isShow2 = true;      
                });
            }
        },
        shortpwdClose2(val){
            if(val) this.val2 = val;
            tranSation({
                    total: this.radio,
                    transfer_password: this.val2
                }).then(res => {
                    MessageBox.alert('发布成功,请注意交易信息','提示').then(action => {
                        this.$router.push('/trading/center')
                    });
                })
            this.isShow2 = false;
        }
    }
}
</script>

<style scoped>
.rel-order{
    background: #172748;
    padding: 0px 14px;
    font-size: 14px;
    margin-bottom: 2%;
}
.rel-number{
    margin-top: 3%;
    display: flex;
    align-items: center;
}
.number-title{
    padding: 6% 4% 6% 0px;
}
.release >>>.el-radio-button__inner {
    border-radius: 6px;
    padding: 6px 0px;
    margin: 0px 4px;
    width: 44px;
    background: #4865A0;
    border: none;
    color: white;
}
.release >>> .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    color: white;
    background-color: #409EFF;
}
.rel-style{
    display: flex;
    padding: 6% 0px;
    justify-content: space-between;  
}
.bulefont{  
    color: #75A0F7;
    text-align: right;
}
/* input::placeholder{
    color: #75A0F7;
} */
.rel-border{
    border-bottom: 1px solid #13203B;
    border-top: 1px solid #13203B;
}
.redfont{
    font-size: 16px;
}
.rel-attention{
    padding: 0px 14px;
}
.atten-title {
    font-size: 16px;
    margin: 5% 0px;
}
.atten-cont {
    font-size: 14px;
    line-height: 1.8em;
    letter-spacing: 1px;
}
.rel-saleout{
    padding: 0px 14px;
}
</style>