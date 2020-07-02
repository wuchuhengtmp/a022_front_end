<template>
    <div id="app">
        <keep-alive max="16">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  updated(){
    let path = this.$route.path;
    let patt = /\/trading/ig;
    let pat = /\/user/ig;
    if(path.match(patt) || path.match(pat)){
      document.querySelector('body').setAttribute('style','background-color:#13203B')
    }else{
      document.querySelector('body').setAttribute('style','background-color:#03070F')
    }
  }
}
</script>

<style scoped>

</style>
