<template>
    <div class="service whitefont">
        <headernav :value="title"></headernav>
        <div class="ser-cont">
            <div>给我们留言后,我们会尽快与您联系</div>
            <div class="ser-text">
                <textarea placeholder="再此输入留言内容!" v-model="content"></textarea>
            </div>
        </div>
        <div class="ser-cont">
            <div>您的姓名</div>
            <input placeholder="请输入您的姓名!" type="text" v-model="name">
        </div>
        <div class="ser-cont">
            <div>电话号码</div>
            <input placeholder="请输入您的电话号码!" type="text" v-model="phone">
        </div>
        <div class="btn">
            <button class="sambutton" @click="submint">提交</button>
        </div>   
    </div>
</template>

<script>
import { server } from '../../api/user'
import headernav from '../../components/headernav'
import { Toast } from 'mint-ui';
export default {
    name:'service',
    components:{
        headernav
    },
    data(){
        return{
            title:'在线客服',
            name:'',
            phone:'',
            content:''
        }
    },
    methods:{
        submint(){
            server({
                phone: this.phone,
                name: this.name,
                content: this.content
            }).then(res => {
                Toast({
                    message: '反馈成功',
                    position: 'middle',
                    duration: 2000
                });
                this.$router.go(-1)
            })
        }
    }
}
</script>

<style scoped>
.ser-cont{
    margin-top: 2%;
    background-color: #172748;
    padding: 4% 14px;
    font-size: 14px;
}
.detail:nth-child(even){
    border-top: 1px solid #13203B;
    border-bottom: 1px solid #13203B;
}
textarea{
    margin-top: 3%;
    width: 92%;
    height: 160px;
    outline: none;
    display: block;
    border-radius: 3px;
    border:none;
    resize: none;
    color: white;
    padding: 14px;
    background-color: #223660;
}
textarea::placeholder{
    color:#4865A0;
}
input{  
    margin-top: 3%;
	background:none;  
	outline:none;  
    border:none;
    color: white;
    text-align: left;
    font-size: 14px;
    background-color: #223660;
    border-radius: 3px;
    width: 95%;
    height: 40px;
    padding-left: 14px;
}
input::placeholder{
    color:#4865A0;
}
.btn{
    padding: 0px 14px;
}
</style>
