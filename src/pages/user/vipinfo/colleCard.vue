<template>
    <div class="collecard">
        <headernav :value="title"></headernav>
        <div class="colle-cont">
            <el-tabs v-model="activeName" @tab-click="handle">
                <el-tab-pane label="支付宝收款码" name="alipay" >
                    <loadimg :type="activeName">
                        <template v-slot:tip>
                            <p style="font-size:14px">上传支付宝收款码</p>
                        </template>
                    </loadimg>
                </el-tab-pane>
                <el-tab-pane label="微信收款码" name="wechat">
                    <loadimg :type="activeName">
                        <template v-slot:tip>
                            <p style="font-size:14px">上传微信收款码</p>
                        </template>
                    </loadimg>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import loadimg from '../../../components/loadimg'
import headernav from '../../../components/headernav'
export default {
    name:'collecard',
    components:{
        headernav,
        loadimg
    },
    data(){
        return{
            title:'收款设置',
            activeName:'alipay'
        }
    },
    methods:{
        handle(tab, event) {
            
        }
    }
}
</script>

<style scoped>
.white-cont{
    padding: 0px 14px;
    font-size: 14px;
    margin-top: 2%;
}
.collecard >>> .el-tabs__item{
    color: white;
}
.collecard >>> .el-tabs__item:hover{
    color: #409EFF;
}
.collecard >>> .el-tabs__nav-wrap::after{
    background-color: #13203B;
}
.collecard >>> .el-tabs__header {
    margin: 0 10px 8px;
}
</style>
