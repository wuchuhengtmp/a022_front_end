<template>
    <transition name="fade">
        <div class="img-view" @click="bigImg">
            <div class="img-layer"></div>
            <div class="img">
                <img :src="imgSrc" alt="" width="100%" :style="{top:top + 'px'}">
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name:'bigimg',
    props:['imgSrc','top'],
    // computed:{
    //     top(){
    //         let height = window.pageYOffset ||
    //         document.documentElement.scrollTop || document.body.scrollTop
    //         return height / 2
    //     }
    // },
    // mounted(){
    //     this.text()
    // },
    methods:{
        bigImg(){
            this.$emit('clickit')
        },
        // text(){
        //     let height = window.innerHeight;
        //     console.log(height)
        // }
    }
}
</script>

<style scoped>
.fade-enter-active,.fade-leave-active{
    transition: all .2s ease;
}
.fade-enter,.fade-leave-active {
    opacity: 0;
}
.img-view .img-layer {
    position: fixed;
    overflow: hidden;
    z-index: 99;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.7);
    width: 100%;
    height: 100%;
} 
.img img{
    position: absolute;
    /* left: 0;
    bottom: 0;
    right: 0;
    margin: 0 auto;
    z-index: 999;
    width: 80%; */
    z-index: 999;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    margin: auto;
    width: 80%;
}
</style>

