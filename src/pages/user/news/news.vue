<template>
    <div class="news whitefont">
        <commnews :newsinfo="newsTitle" :value="title" ></commnews>
    </div>
</template>

<script>
import { getNews } from '../../../api/user'
import commnews from './commnews'
export default {
    name:'news',
    components:{
        commnews
    },
    activated(){
        getNews().then(res => {
            this.newsTitle = res.data
        })
    },
    data(){
        return{ 
            title:'最新公告',
            newsTitle:[],
        }
    },
    methods:{

    }
}
</script>

<style scoped>

</style>
