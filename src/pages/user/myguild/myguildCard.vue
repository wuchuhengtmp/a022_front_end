<template>
    <div class="myguild whitefont">
        <div>
            <div class="myguild-title">
                <div class="myguild-cont">
                    <div>123</div>
                    <div>公会名称</div>
                </div>
                <div class="text-cont">
                    <div>123内容内容
                        内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容内容内容
                        内容内容内容内容内容内容
                    </div>
                    <div class="text">公会宣言</div>
                </div>
                <div class="myguild-cont">
                    <div>123</div>
                    <div>公会QQ群</div>
                </div>
                <div class="myguild-cont">
                    <div>123</div>
                    <div>会长QQ</div>
                </div>
                <div class="myguild-cont">
                    <div>123</div>
                    <div>会长微信</div>
                </div>
                <div class="myguild-cont">
                    <div>123</div>
                    <div>会长手机</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'myguild',
    data(){
        return{
            
        }
    },
}
</script>

<style scoped>
.myguild-title{
    background-color: #172748;
    padding: 2px 14px;
    font-size: 14px;
}
.myguild-cont{  
    margin: 4% 0px;
    color: white;
    text-align: left;
    font-size: 14px;
    background-color: #223660;
    border-radius: 3px;
    width: 92%;
    padding: 10px 14px;
    line-height: 20px;
    display: flex;
    justify-content: space-between;
}
.myguild-cont div:nth-child(2){
    color: #4865A0;
}
.text-cont{
    margin: 4% 0px;
    color: white;
    text-align: left;
    font-size: 14px;
    background-color: #223660;
    border-radius: 3px;
    width: 92%;
    padding: 10px 14px;
    line-height: 20px;
}
.text{
    padding-top: 6px;
    text-align: right;
    color: #4865A0;
}
</style>