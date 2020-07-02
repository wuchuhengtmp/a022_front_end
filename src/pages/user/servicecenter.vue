<template>
    <div class="servicecenter whitefont">
        <headernav :value="title"></headernav>
        <div style="margin-top: 2%;">
            <div class="center">
                <h2>官方微信</h2>
                <div>仅供创业大使以及以上等级添加,添加请备注自己的账号</div>
                <div class="wechat">
                    <img :src="vipWechat" alt="" width="100%">
                </div>
            </div>
            <div class="center">
                <h2>官方微信</h2>
                <div>普通用户客服</div>
                <div class="wechat">
                    <img :src="normalWechat" alt="" width="100%">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { customer } from '../../api/user'
import headernav from '../../components/headernav'
export default {
    name:'servicecenter',
    components:{
        headernav
    },
    created(){
        customer().then(res => {
            let data = res.data
            this.vipWechat = data.weixin_1
            this.normalWechat = data.weixin_2
        })
    },
    data(){
        return{
            title:'客服中心',
            normalWechat:'',
            vipWechat:''
        }
    }
}
</script>

<style scoped>
.center{
    background-color: #172748;
    padding: 4% 14px;
    font-size: 12px;
    line-height: 24px;
}
h2{
    font-size: 16px;
}
.wechat{
    margin-top: 2%;
    width: 124px;
    height: 124px;
    background: white;
    border-radius: 10px;
}
.wechat img{
    border-radius: 10px;
}
</style>
