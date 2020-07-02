<template>
    <div class="millon">
        <ul v-for="(item,index) in millingList" :key="index">
            <li style="width:10%" >
                <!-- <div class="samll"></div> -->
                <img src="../../assets/images/lvdian@2x.png" width="50%">
            </li>
            <li style="width:20%">{{item.number}}</li>
            <li style="width:20%">{{item.project}}</li>
            <li style="width:15%">{{item.status_info}}</li>
            <li style="width:15%">{{item.computes}}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name:'millon',
    props:['millingList']
}
</script>

<style scoped>
ul {
    display: table-row;
    width: 100%;
    color: white;
    font-size: 14px;
}
ul li {
    font-size: 12px;
    text-align: center;
    display: table-cell;
    padding-bottom: 10px;
}
ul li img{
    vertical-align: text-top;
}
</style>
