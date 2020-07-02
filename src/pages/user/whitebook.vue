<template>
    <div class="whitebook">
        <headernav :value="title"></headernav>
        <div class="white-cont" v-html="content"></div>
    </div>
</template>

<script>
import { paper } from '../../api/user'
import headernav from '../../components/headernav'
export default {
    name:'whitebook',
    components:{
        headernav,
    },
    activated(){
        paper().then(res => {
            this.content = res.data.content
        })
    },
    data(){
        return{
            title:'GOB白书皮',
            content:''
        }
    }
}
</script>

<style scoped>
.white-cont{
    padding: 0px 14px;
    color: white;
    font-size: 14px;
    margin-top: 2%;
}
</style>
