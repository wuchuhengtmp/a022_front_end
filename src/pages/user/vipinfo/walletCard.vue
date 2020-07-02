<template>
    <div class="walletcard">
        <headernav :value="title"></headernav>
        <div class="add-cont">
            <div class="detail">
                <input type="text" placeholder="请输入以太钱包地址" v-model="alipay">
            </div>
        </div>
        <div class="btn">
            <button class="sambutton"  @click="submint">提交</button>
        </div> 

    </div>
</template>

<script>
import headernav from '../../../components/headernav'
import { userInfo } from "../../../api/user"
import { Toast } from "mint-ui"
import { setStore,getStore } from '../../../utils/index'
export default {
    name:'walletcard',
    components:{
        headernav
    },
    data(){
        return{
            title:'虚拟钱包',
            alipay:''
        }
    },
    created(){
        this.alipay = getStore('virtual')
    },
    methods:{
        submint(){
            if(this.alipay == ""){
                Toast({
                    message: '请填写虚拟钱包',
                    position: 'middle',
                    duration: 2000
                  });
            }else{
                userInfo({
                    virtual_purse: this.alipay
                }).then(res => {
                    Toast({
                        message: '填写成功',
                        position: 'middle',
                        duration: 2000
                    });
                    setStore('virtual',this.alipay)
                    this.$router.go(-1)
                })
            }
        }
    }
}
</script>

<style scoped>
.add-cont{
    margin-top: 2%;
}
.detail{
    background-color: #172748;
    padding: 4% 14px;
}
.detail:nth-child(even){
    border-top: 1px solid #13203B;
    border-bottom: 1px solid #13203B;
}
input{  
    width: 100%;
	background:none;  
	outline:none;  
    border:none;
    color: white;
    text-align: left;
    font-size: 14px;
}
input::placeholder{
    color:#4865A0;
}
.btn{
    padding: 0px 14px;
}
</style>