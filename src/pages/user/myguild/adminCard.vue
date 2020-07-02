<template>
    <div class="admin whitefont">
        <div class="admin-title">
            <div class="ser-cont">
                <input placeholder="公会名称" type="text" v-model="guildname">
            </div>
            <div class="ser-cont">
                <textarea placeholder="公会宣言" v-model="guildcontent"></textarea>
            </div>
            <div class="ser-cont">
                <input placeholder="公会QQ群" type="text" v-model="guildqq">
            </div>
            <div class="ser-cont">
                <input placeholder="会长QQ" type="text" v-model="qq">
            </div>
            <div class="ser-cont">
                <input placeholder="会长微信" type="text" v-model="wechat">
            </div>
            <div class="ser-cont">
                <input placeholder="会长手机" type="text" v-model="phone">
            </div>
            <div class="btn">
                <button class="sambutton">保存</button>
            </div>   
        </div>
    </div>
</template>

<script>
export default {
    name:'admin',
    data(){
        return{
            guildname:'',
            guildcontent:'',
            guildqq:'',
            qq:'',
            wechat:'',
            phone:''
        }
    },
}
</script>

<style scoped>
.btn{
    padding: 0px 14px;
}
.ser-cont{
    background-color: #172748;
    padding: 2% 14px;
    font-size: 14px;
}
input{  
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
textarea{
    width: 91%;
    height: 120px;
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
.ser-cont:first-child{
    padding-top: 4%;
}
.ser-cont:last-child{
    padding-bottom: 4%;
}
</style>