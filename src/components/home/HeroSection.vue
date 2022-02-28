<template>
  <section class="py-5 homepage-search-block text-center homepage-search-block-2 bg-dark position-relative main-banner">
         <div class="container">
            <div class="row pb-5">
               <div class="col-lg-8 mx-auto">
                  <div class="homepage-search-title text-align-left">
                     <h1 class="mb-3 text-shadow text-white text-left ">Find The<br> Perfect<br> Freelance.</h1>
                     <h5 class="mb-5 text-shadow text-white-50 font-weight-normal text-left">
                     Get work done faster and with confidence on Pro eLean. <br>
                     Inspired with projects made by our eFreelancers.
                     </h5>
                  </div>
                  <div class="homepage-search-form">
                     <form class="form-noborder" @submit.prevent="handleSearch">
                        <div class="form-row">
                           <div class="col-lg-3 col-md-3 col-sm-12 form-group">
                              <div class="location-dropdown text-left">
                                 <i class="icofont-location-arrow"></i>
                                 <select class="custom-select form-control border-0 shadow-sm form-control-lg" id="categories">
                                    <option value="0"> All </option>
                                       <option value="category.id" v-for="category in $store.getters.getCategories" :key="category.id"> {{ category.title }} </option>
                                 </select>
                              </div>
                           </div>
                           <div class="col-lg-7 col-md-7 col-sm-12 form-group">
                              <input type="text" name="q" placeholder="Find Services..."
                                 class="form-control border-0 form-control-lg shadow-sm" v-model="keywords">
                           </div>
                           <div class="col-lg-2 col-md-2 col-sm-12 form-group">
                              <button type="submit"
                                 class="btn btn-success btn-block btn-lg btn-gradient shadow-sm" ><i
                                 class="fa fa-search"></i></button>
                           </div>
                        </div>
                     </form>
                  </div>
                  <h6 class="mb-0 mt-1 text-shadow text-center text-white-50 font-weight-normal pb-5 mb-5">E.g. Voice over,
                     translation, logo design, Articles, Blog Posts &amp; more...
                  </h6>
               </div>
            </div>
         </div>
      </section>      
</template>

<script>
import router from '@/router'
import { ref } from '@vue/reactivity'

export default {
   setup(){
      const keywords=ref('');
      const handleSearch=()=>{
         keywords.value = slugify(keywords.value)
         let url = keywords.value ? `/gigs/${keywords.value}` : '/gigs';
         router.push(url)
      }
      // /* Encode string to slug */
      /* eslint-disable */
      function slugify(text) {
         return text
            .toString()                           // Cast to string (optional)
            .normalize('NFKD')            // The normalize() using NFKD method returns the Unicode Normalization Form of a given string.
            .toLowerCase()                  // Convert the string to lowercase letters
            .trim()                                  // Remove whitespace from both sides of a string (optional)
            .replace(/\s+/g, '-')            // Replace spaces with -
            .replace(/[^\w\-]+/g, '')     // Remove all non-word chars
            .replace(/\-\-+/g, '-');        // Replace multiple - with single -
      }

      return {
         keywords,
         handleSearch,
      }
   }
}
</script>

<style>

</style>