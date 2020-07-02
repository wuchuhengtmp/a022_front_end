<template>
    <div class="rule whitefont">
        <commnews :newsinfo="newsTitle" :value="title"></commnews>
    </div>
</template>

<script>
import { getRules } from '../../../api/user'
import commnews from './commnews'
export default {
    name:'rule',
    components:{
        commnews
    },
    activated(){
        getRules().then(res => {
            this.newsTitle = res.data
        })
    },
    data(){
        return{ 
            title:'注册规则',
            newsTitle:[],
        }
    },
}
</script>

<style scoped>

</style>
