<template>
    <div class="slider mt-4" v-if="serviceMedia">
        <div class="gallery-container">
        <div id="aniimated-thumbnials" class="slider-for slick-slider-single">
        <a href="images/list/v1.png">
        <img style="height:25rem; width:35rem" class="img-fluid img-thumbnail" 
            :src="'https://api.dex.proelean.com/' + serviceMedia[imageIndex].media ?? '/assets/images/banner.png'"
            />
        </a>
        </div>
        </div>
        <div class="slider-nav slick-slider-single d-flex flex-row">
        <div class="item-slick" v-for="(banner,index) in serviceMedia" :key="banner.id">
        <img @click="setImageIndex(index)" style="height:100px; width:115px"  class="img-thumbnail" 
            :src="'https://api.dex.proelean.com/' + banner.media ?? '/assets/images/banner.png'"
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
            setImageIndex
        }
    }
}
</script>
<style scoped>
.gallery-container{
    height: 427px;
    width: 100%;
}
</style>