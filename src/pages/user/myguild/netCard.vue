<template>
    <div class="net whitefont">
        <headernav :value="title"></headernav>
        <div style="margin-top:8%;">
            <div class="net-title">
                <div>
                    <h2>{{group_count}}</h2>
                    <p>团队人数</p>
                    <span>(统计更新略有延迟)</span>
                </div>
                <div>
                    <h2>{{group_computes}}</h2>
                    <p>团队算力(GH/S)</p>
                    <span>(统计更新略有延迟)</span>
                </div>
            </div>
            <div class="net-cont">
                <div class="cont-one" @click="gotoAdress(1)">
                    <h3>人数:{{level1group_count}}</h3>
                    <span>一级团队</span>
                </div>
                <div class="cont-second" @click="gotoAdress(2)">
                    <h3>人数:{{level2group_count}}</h3>
                    <span>二级团队</span>
                </div>
                <div class="cont-third" @click="gotoAdress(3)">
                    <h3>人数:{{level3group_count}}</h3>
                    <span>三级团队</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { guildInfo } from '../../../api/user'
import headernav from '../../../components/headernav'
export default {
    name:'net',
    components:{
        headernav
    },
    data(){
        return{
            title:'我的公会',
            group_computes:'',
            group_count:'',
            level1group_count:'',
            level2group_count:'',
            level3group_count:'',
        }
    },
    activated(){
        guildInfo().then(res => {
            let data = res.data
            this.group_computes = data.group_computes,
            this.group_count = data.group_count,
            this.level1group_count = data.level1group_count
            this.level2group_count = data.level2group_count
            this.level3group_count = data.level3group_count
        })
        
    },
    methods:{
        gotoAdress(index){
            this.$router.push({
                path:'/user/commguild',
                query:{
                    type : index
                }
            })
        },
    }
    
}
</script>

<style scoped>
.net{
    font-size: 12px;
}
.net-title{
    width: 90%;
    margin: auto;
    background: url('../../../assets/images/kapian@2x.png') no-repeat; 
    background-size: 100%;
    display: flex;
}
.net-title div{
    flex: 1;
    text-align: center;
    padding: 7% 0px;
}
.net-title h2{
    font-size: 34px;
    padding-bottom: 4%;
}
p{
    padding-bottom: 6%;
}
span{
    font-size: 12px;
}
.net-cont{
    display: flex;
    padding: 10px 20px;
}
.net-cont div:nth-child(2){
    margin: 0px 10px;
}
.net-cont div{
    width: 32%;
    min-height: 120px;
}
h3{
    padding: 10px;
    font-size: 14px;
}
.net-cont span{
    padding: 10px;
}
.cont-one{
    background: url('../../../assets/images/yijituandui@2x.png') no-repeat; 
    background-size: 100%;
}
.cont-second{
    background: url('../../../assets/images/erjituandui@2x.png') no-repeat; 
    background-size: 100%;
}
.cont-third{
    background: url('../../../assets/images/sanjituandui@2x.png') no-repeat; 
    background-size: 100%;
}
</style>