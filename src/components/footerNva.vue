<template>
  <div class="footernav">
    <div class="warp">
      <div class="warp-item" v-for="(item,index) in footerList" :key="index" @click="gotoAddress(item.url)">
        <img :src="item.imgSrc">
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'footernav',
  data () {
    return {
      footerList:[
        {
          name:'主页',
          url:'/',
          imgSrc: require('../assets/images/zhuye@2x.png')
        },
        {
          name:'矿机商城',
          url:'/mall',
          imgSrc: require('../assets/images/shangcheng@2x.png')
        },
        {
          name:'我的矿机',
          url:'/milled',
          imgSrc: require('../assets/images/wodekuangji@2x.png')
        },
        {
          name:'交易中心',
          url:'/trading',
          imgSrc: require('../assets/images/jiaoyizhongxin@2x.png')
        },
        {
          name:'我的',
          url:'/user',
          imgSrc: require('../assets/images/wode@2x.png')
        }
      ]
    }
  },
  methods:{
    gotoAddress(item){
      this.$router.push(item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.warp{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 0;
}
.warp-item{
  flex: 1;
  display: flex;
  text-align: center;
  flex-direction: column;
  align-items: center;
}
.warp-item img{
  width: 20px;
  height: 20px;
}
.warp-item span{
  font-size: 12px;
  color: #11ddbf;
  padding-top: 4px;
}
.footernav{
  position: fixed;
  z-index: 100;
  display: flex;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3rem;
  background: #0f192f;
}
</style>
