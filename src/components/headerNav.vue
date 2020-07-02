<template>
    <div class="headernav">
      <mt-header :title="value">
        <div slot="left" @click="gotoback">
          <mt-button icon="back"></mt-button>
        </div>
      </mt-header>
    </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
    name:'headernav',
    props:['value'],
    data () {
      return {
        
      }
    },
    methods:{
      gotoback(){
        this.$router.go(-1)
      }
    }
}
</script>

<style scoped>

</style>

