<template>
    <div class="addresscard">
        <headernav :value="title"></headernav>
        <div class="add-cont">
            <!-- <div class="detail">
                <input type="text" placeholder="请输入您的真实姓名" v-model="name">
            </div>
            <div class="detail">
                <input type="number" placeholder="联系电话号码" v-model="phone">
            </div> -->
            <div class="detail">
                <input type="text" placeholder="收货地址" v-model="address">
            </div>
        </div>
        <div class="btn">
            <button class="sambutton" @click="submint">提交</button>
        </div>   
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import { userInfo } from "../../../api/user"
import { setStore,getStore } from '../../../utils/index'
import headernav from '../../../components/headernav'
export default {
    name:'addresscard',
    components:{
        headernav
    },
    data(){
        return{
            title:'收货地址',
            address:''
        }
    },
    created(){
        this.address = getStore('address')
    },
    methods:{
        submint(){
            if(this.address == ""){
                Toast({
                    message: '请填写收货地址',
                    position: 'middle',
                    duration: 2000
                  });
            }else{
                userInfo({
                    address: this.address
                }).then(res => {
                    Toast({
                        message: '填写成功',
                        position: 'middle',
                        duration: 2000
                    });
                    setStore('address',this.address)
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
	background:none;  
	outline:none;  
    border:none;
    color: white;
    text-align: left;
    font-size: 14px;
    width: 100%;
}
input::placeholder{
    color:#4865A0;
}
.btn{
    padding: 0px 14px;
}
</style>