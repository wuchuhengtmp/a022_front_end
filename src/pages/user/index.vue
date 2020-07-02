<template>
    <div class="user whitefont">
        <div class="header">
            <i style="text-align: left;flex:1;font-size:18px" ></i>
            <div style="flex:2">个人中心</div>
            <i class="el-icon-s-tools" style="color:#4865A0;text-align: right;flex:1" @click="setting"></i>
        </div>
            <div class="user-main">
                <div class="user-msg">
                    <div class="msg-img" @click="jumpImg">
                        <img :src="avator" alt="" width="100%" height="100%">
                    </div>
                    <div class="msg-cent">
                        <div class="msg-badges">
                            <span class="identity">{{level}}</span>
                            <span class="realname" @click="jump(certi_state)">{{certi_state | state}}</span>
                        </div>
                        <div class="msg-detail">
                            <div>用户手机:<span>{{phone}}</span></div>
                            <div>交易信誉:<span>{{credit}}</span></div>
                        </div>
                    </div>
                    <div class="msg-sign" @click="signIn" v-show="certi_state == 2" > {{ is_sign ? '已签到' : '签到' }}</div>
                </div>
                <div class="user-assets">
                    <ul class="assets-total">
                        <li @click="goAccount">
                            <p>{{coint}}</p>
                            <span>资产总额</span>
                        </li>
                        <li>
                            <p>{{total_price}}</p>
                            <span>正在交易</span>
                        </li>
                    </ul>
                    <ul class="assets-team">
                        <li @click="goGuild">
                            <p>{{groupcounts}}</p>
                            <span>团队人数</span>
                        </li>
                        <li @click="goGuildType">
                            <p>{{extends_count}}</p>
                            <span>直推人数</span>
                        </li>
                        <li>
                            <p>{{acitves}}</p>
                            <span>活跃度数</span>
                        </li>
                    </ul>
                </div>
                <div class="user-apply">
                    <h2 class="get_pauid">热门应用</h2>
                    <div class="apply-main">
                        <div 
                            class="prelative"  
                            v-for="(item,index) in iconList" 
                            :key="index"
                            @click="gotoAddress(item.url)"
                        >
                            <img :src="item.src" alt="" width="40%">
                            <div>{{item.title}}</div>
                        </div>
                    </div>
                </div>
            </div>
        <footernav></footernav>
    </div>
</template>

<script>
import { myUser,sing } from '../../api/user'
import { removeToken } from '../../utils/auth'
import { MessageBox , Toast } from 'mint-ui';
import { setStore,getStore,removeStore } from '../../utils/index'
import footernav from '../../components/footerNva'
export default {
    name:'user',
    components:{
        footernav
    },
    filters:{
        state(value){
            if(value == 0){
                return "未认证"
            }else if(value == 1){
                return "认证中"
            }else if(value == 2){
                return "已认证"
            }
        }
    },
    data(){
        return{
            certi_state:'',
            phone:'',
            credit:'',
            coint:'',
            acitves:'',
            union_level_id:'',
            level:'',
            avator:'',
            is_sign: false,
            total_price:'',
            groupcounts:'',
            extends_count:'',
            iconList:[
                {
                    src: require('../../assets/images/gerenzhangdan@2x.png'),
                    url:'account',
                    title:'个人账单'
                },
                {
                    src: require('../../assets/images/wanjiaxinxi@2x.png'),
                    url:'info',
                    title:'玩家信息'
                },
                {
                    src: require('../../assets/images/zaixiankefu@2x.png'),
                    url:'service',
                    title:'在线客服'
                },
                {
                    src: require('../../assets/images/wodegonghui@2x.png'),
                    url:'guild',
                    title:'我的公会'
                },
                {
                    src: require('../../assets/images/tuiguangzhuangqian@2x.png'),
                    url:'extension',
                    title:'推广赚钱'
                },
                {
                    src: require('../../assets/images/kefuzhongxin@2x.png'),
                    url:'center',
                    title:'客服中心'
                },
                {
                    src: require('../../assets/images/GOBbaipishu@2x.png'),
                    url:'book',
                    title:'GOB白书皮'
                },
                {
                    src: require('../../assets/images/zuixingonggao@2x.png'),
                    url:'news',
                    title:'最新公告'
                },
                {
                    src: require('../../assets/images/GOBshangcheng@2x.png'),
                    url:'shop',
                    title:'GOB商城'
                },
                {
                    src: require('../../assets/images/chongzhika@2x.png'),
                    url:'invest',
                    title:'充值卡'
                },
                {
                    src: require('../../assets/images/pingtaiguize@2x.png'),
                    url:'rule',
                    title:'平台规则'
                },
                {
                    src: require('../../assets/images/tuichudenglu@2x.png'),
                    url:'loginout',
                    title:'退出登录'
                }
            ]
        }
    },
    activated(){
        this.userInfo()
        this.phone = getStore('user_info').phone
        this.level = getStore('user_info').level
        this.avator = getStore('user_ava').avator
        this.certi_state = getStore('user_info').certification
    },
    methods:{
        goAccount(){
            this.$router.push('/user/account')
        },
        jumpImg(){
            this.$router.push('/user/avator')
        },
        jump(index){
            if(index == 0){
                this.$router.push('/user/realname')
            }
        },
        goGuild(){
            this.$router.push('/user/guild')
        },
        goGuildType(){
            this.$router.push({
                path:'/user/commguild',
                query:{
                    type : 1
                }
            })
        },
        setting(){
            this.$router.push('/user/change')
        },
        userInfo(){
            myUser().then(res => {
                let data = res.data           
                this.coint = data.coint
                this.credit = data.credit
                this.acitves = data.acitves
                this.is_sign = data.is_sign
                this.total_price = data.total_transation_price
                this.groupcounts = data.groupcounts
                this.extends_count = data.direct_extends_count
                this.union_level_id = data.union_level_id
                
                // this.certi_state = data.certification_status
                // this.level = data.level_name
                // this.phone = data.phone
                // this.avator = data.avator
                setStore('user_info',{
                    phone: data.phone,
                    level: data.level_name,
                    certification: data.certification_status,
                    pid: data.pid,
                    user_id: data.id,
                })
                setStore('address',data.address)
                setStore('virtual',data.virtual_purse)
                setStore('user_ava',{
                    avator: data.avator
                })
                this.$nextTick(() => {
                    this.phone = getStore('user_info').phone
                    this.level = getStore('user_info').level
                    this.avator = getStore('user_ava').avator
                    this.certi_state = getStore('user_info').certification
                })
            })
        },
        signIn(){
            if(this.is_sign){
                Toast({
                    message: '已经签到',
                    position: 'middle',
                    duration: 2000
                });
                this.is_sign = true
                // this.$refs.sing.innerHTML = '已签到'
            }else{
                sing().then(res => {
                    Toast({
                        message: '签到完成',
                        position: 'middle',
                        duration: 2000
                    });
                    this.is_sign = true
                    // this.$refs.sing.innerText = '已签到'
                })  
            }
                 
        },
        gotoAddress(url){
            // if(url == 'account'){
            //     this.$router.push({
            //         path:'/user/' + url,
            //         query:{
            //             activeName : 'first'
            //         }
            //     })
            // }else 
            if(url == 'loginout'){
                MessageBox.confirm('确认退出登录?').then(action => {
                    removeToken()
                    removeStore('user_info')
                    removeStore('user_ava')
                    removeStore('poster')
                    this.$router.push('/login')
                });
            }else if(url == 'shop'){
                MessageBox('提示','正在施工中');
            }else{
                this.$router.push('/user/' + url)
            }
        }
    }
}
</script>

<style scoped>
.header{
    display: flex;
    text-align: center;
    font-size: 16px;
    padding: 12px 10px;
    align-items: center;
    background: rgba(0, 0, 0, 0);
    color: white;
    margin-bottom: 10%;
}
.user{
    padding-bottom: 3em;
    font-size: 12px;
}
.user-main{
    padding: 0px 14px;
   
}
.user .mint-header{
    background-color:#13203B;
}
.user-msg {
    margin: 4% 0px;
    display: flex;
}
.msg-img{
    width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 4px;
    float: left;
    margin-right: 4%;
}
.msg-cent {
    flex: 2;
}
.msg-badges {
    margin: 3% 0px;
}
.msg-detail{
    line-height: 18px;
    font-size: 13px;
}
.msg-detail span{
    margin: 0px 8px;
}
.msg-badges span{
    border-radius: 12px;
    padding: 1px 10px;
}
.identity{
    background-image: linear-gradient(#966BFF, #622EE5);
}
.realname{
    background-image: linear-gradient(#FFD851, #D68011);
}
.msg-sign{
    height: 20px;
    width: 58px;
    line-height: 20px;
    border-radius: 25px;
    text-align: center;
    margin-top: 10%;
    background-image: linear-gradient(to right, #3ECEF7 , #0F64F0);
}
.user-assets{
    background-color: #172748;
    border-radius: 10px;
    padding: 4%;
    color: #0AD7CB;
    font-size: 22px;
}
.user-assets span{
    color: #4865A0;
    font-size: 12px;
}
ul {
    display: flex;
    justify-content: space-between;
    width: 100%;
}
.assets-total li{
    width: 50%;
    text-align: left;
    margin-bottom: 4%;
}
.assets-team li{
    text-align: center;
}
ul p{
    font-weight: 600;
}
.user-apply{
    margin-top: 5%;
    background-color: #172748;
    border-radius: 10px;
    /* padding: 4%; */
}
.get_pauid {
    font-size: 16px;
    height: 30px;
    padding-top: 4%;
    width: 90%;
    margin: auto;
}
.apply-main{
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    text-align: center; 
}
.prelative {
    position: relative;
    width: 25%;
}
.prelative div{
    padding:4px 0px 20px;
    text-align: center;
}
</style>