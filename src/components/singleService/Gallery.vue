<template>
    <div class="slider mt-4" v-if="serviceMedia">
        <div class="gallery-container">
        <div id="aniimated-thumbnials" class="slider-for slick-slider-single">
        <a href="images/list/v1.png">
        <img  class="img-fluid img-thumbnail" 
            :src="`${imgURL}/${serviceMedia[imageIndex].media}` ?? '/assets/images/banner.png'"
            />
        </a>
        </div>
        </div>
        <div v-if="serviceMedia[1]" class="slider-nav slick-slider-single d-flex flex-row py-3">
        <div class="item-slick" v-for="(banner,index) in serviceMedia" :key="banner.id">
        <img @click="setImageIndex(index)"  class="img-thumbnail cursor-pointer" 
            :src="`${imgURL}/${banner.media}` ?? '/assets/images/banner.png'"
            />
        </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    props: {
        serviceMedia: {
            type: Array,
            required: true
        }
    },
    setup(){
        const imageIndex = ref(0)

        const setImageIndex = (index) => {
            imageIndex.value = index;
        }
        return{
            imageIndex,
            setImageIndex,
            imgURL: process.env.VUE_APP_URL
        }
    }
}
</script>
<style scoped>
</style>