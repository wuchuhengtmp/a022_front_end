<template>
    <div class="change whitefont">
        <commnews :newsinfo="newsTitle" :value="title"></commnews>
    </div>
</template>

<script>
import commnews from './commnews'
export default {
    name:'change',
    components:{
        commnews
    },
    data(){
        return{ 
            title:'设置',
            newsTitle:[
                {   
                    title:'修改交易密码',
                    content:'',
                },
                {
                    title:'修改头像',
                    content:''
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>
