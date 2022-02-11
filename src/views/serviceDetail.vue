<template>
  <div class="main-page py-3" v-if="service && service.service_user">
         <div class="container">
            <div class="row">
               <div class="col-lg-8 left">
                   <Nav />
                  <!-- <div id="overview" class="seller-overview d-flex align-items-center">
                     <div class="user-profile-image d-flex align-items-center">
                        <label class="profile-pict" for="profile_image">
                        <img
                           class="img-fluid"
                           :src="`https://api.dex.proelean.com/${service.service_user.image}`" />
                        </label>
                        <div class="profile-name">
                           <span class="user-status">
                           <a href="#" class="seller-link"> {{ service.service_user.name }} </a>
                           </span>
                           <div class="seller-level">Level 1 Seller</div>
                        </div>
                     </div>
                     <div class="user-info d-flex">
                        <span class="user-info-rating d-flex">
                           <div class="star-rating-s15-wrapper">
                              <span class="star-rating-s15 rate-10">
                              </span>
                           </div>
                           <span class="total-rating-out-five">5.0</span>
                           <span class="total-rating">(36)</span>
                        </span>
                        <span class="orders-in-queue">2 Orders in Queue</span>
                     </div>
                     <div>
                     </div>
                  </div> -->
                    <h2> {{ service.s_description }}  </h2>
                    <Gallery :serviceMedia="service.service_media" />
                    <AboutService :service="service" />
                  <div class="profile-card">
                    <AboutSeller :service="service" />
                     <!-- <div id="packagesTable" class="table-package">
                        <h3>Compare Packages</h3>
                        <table>
                           <colgroup>
                              <col>
                              <col>
                              <col>
                              <col>
                           </colgroup>
                           <tbody>
                              <tr class="package-type">
                                 <th>Package</th>
                                 <td>
                                    <p class="price">$8,029 </p>
                                    <b class="type">Basic</b><b class="title">10 Screens</b>
                                 </td>
                                 <td>
                                    <p class="price">$11,240 </p>
                                    <b class="type">Standard</b><b class="title">15
                                    Screens</b>
                                 </td>
                                 <td>
                                    <p class="price">$16,057 </p>
                                    <b class="type">Premium</b><b class="title">25 Screens
                                    </b>
                                 </td>
                              </tr>
                              <tr class="description">
                                 <th></th>
                                 <td>I will design rough sketches for upto 5 Screens of your website/Mobile app. </td>
                                 <td>I will design rough sketches for upto 10 Screens of your website/Mobile app. </td>
                                 <td>I will design rough sketches for upto 20 Screens of your website/Mobile app. </td>
                              </tr>
                              <tr>
                                 <th>
                                    <div class="fit-popover fit-popover-top fit-tooltip" data-position="top"><span
                                       class="fit-popover-content">Source File</span></div>
                                 </th>
                                 <td class="boolean-pricing-factor included"></td>
                                 <td class="boolean-pricing-factor included"></td>
                                 <td class="boolean-pricing-factor included"></td>
                              </tr>
                              <tr>
                                 <th>
                                    <div class="fit-popover fit-popover-top fit-tooltip" data-position="top"><span
                                       class="fit-popover-content">Commercial Use</span></div>
                                 </th>
                                 <td class="boolean-pricing-factor included"></td>
                                 <td class="boolean-pricing-factor included"></td>
                                 <td class="boolean-pricing-factor included"></td>
                              </tr>
                              <tr>
                                 <th>
                                    <div class="fit-popover fit-popover-top fit-tooltip" data-position="top"><span
                                       class="fit-popover-content">Interactive Mockup</span></div>
                                 </th>
                                 <td class="boolean-pricing-factor"></td>
                                 <td class="boolean-pricing-factor included"></td>
                                 <td class="boolean-pricing-factor included"></td>
                              </tr>
                              <tr>
                                 <th>
                                    <div class="fit-popover fit-popover-top fit-tooltip" data-position="top"><span
                                       class="fit-popover-content"># of Pages / Screens</span></div>
                                 </th>
                                 <td>10</td>
                                 <td>15</td>
                                 <td>25</td>
                              </tr>
                              <tr>
                                 <th>
                                    <div class="fit-popover fit-popover-top fit-tooltip" data-position="top"><span
                                       class="fit-popover-content">Revisions</span></div>
                                 </th>
                                 <td>0</td>
                                 <td>1</td>
                                 <td>2</td>
                              </tr>
                              <tr class="delivery-time">
                                 <th>Delivery Time</th>
                                 <td>
                                    <div class="fake-radio-wrapper">
                                       <div><input type="hidden" name="gig_items[1][4694800919471][gig_item_id]"
                                          value="117210558"><input type="hidden"
                                          name="gig_items[1][4694800919471][quantity]" value="0"></div>
                                       <label
                                          class="fake-radio"><input type="radio" name="1" value="0" checked=""><span
                                          class="radio-img"></span><span>3 days</span></label>
                                       <label
                                          class="fake-radio">
                                          <input type="radio" name="1" value="1"><span
                                             class="radio-img"></span><span>2 days</span>
                                          <p class="faster-price">(+$2,008)</p>
                                       </label>
                                    </div>
                                 </td>
                                 <td>
                                    <div class="fake-radio-wrapper">
                                       <div><input type="hidden" name="gig_items[2][0007284419489][gig_item_id]"
                                          value="117210558"><input type="hidden"
                                          name="gig_items[2][0007284419489][quantity]" value="0"></div>
                                       <label
                                          class="fake-radio"><input type="radio" name="2" value="0" checked=""><span
                                          class="radio-img"></span><span>4 days</span></label>
                                       <label
                                          class="fake-radio">
                                          <input type="radio" name="2" value="1"><span
                                             class="radio-img"></span><span>3 days</span>
                                          <p class="faster-price">(+$4,818)</p>
                                       </label>
                                    </div>
                                 </td>
                                 <td>
                                    <div class="fake-radio-wrapper">
                                       <div><input type="hidden" name="gig_items[3][1724678919506][gig_item_id]"
                                          value="117210558"><input type="hidden"
                                          name="gig_items[3][1724678919506][quantity]" value="0"></div>
                                       <label
                                          class="fake-radio"><input type="radio" name="3" value="0" checked=""><span
                                          class="radio-img"></span><span>7 days</span></label>
                                       <label
                                          class="fake-radio">
                                          <input type="radio" name="3" value="1"><span
                                             class="radio-img"></span><span>5 days</span>
                                          <p class="faster-price">(+$8,029)</p>
                                       </label>
                                    </div>
                                 </td>
                              </tr>
                              <tr class="select-package">
                                 <th>Total</th>
                                 <td>
                                    <p class="price-label">$8,029</p>
                                    <button type="submit">Select</button>
                                 </td>
                                 <td>
                                    <p class="price-label">$11,240</p>
                                    <button type="submit">Select</button>
                                 </td>
                                 <td>
                                    <p class="price-label">$16,057</p>
                                    <button type="submit">Select</button>
                                 </td>
                              </tr>
                           </tbody>
                        </table>
                     </div> -->
                  <Recommendation />                  
                  </div>
                  <Faq />
                  <Reviews />
               </div>
               <ServiceCard />
            </div>
         </div>
         <PeopleViewdProfile />
      </div>
</template>

<script>

import { computed } from '@vue/runtime-core';
import { onMounted } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import store from '../store';
import Gallery from '../components/singleService/Gallery.vue';
import AboutService from '../components/singleService/AboutService.vue';
import AboutSeller from '../components/singleService/AboutSeller.vue';
import Recommendation from '../components/singleService/Recommendation.vue';
import Faq from '../components/singleService/Faq.vue';
import Reviews from '../components/singleService/Reviews.vue';
import ServiceCard from '../components/singleService/ServiceCard.vue';
import PeopleViewdProfile from '../components/singleService/PeopleViewdProfile.vue';
import Nav from '../components/singleService/Nav.vue';

export default{
    name:"gigDetail",
    components: {
    Gallery,
    AboutService,
    AboutSeller,
    Recommendation,
    Faq,
    Reviews,
    ServiceCard,
    PeopleViewdProfile,
    Nav
},
    setup() {
    const route = useRoute();
    store.dispatch("userSingleService",route.params.id)
    onMounted(store.dispatch("userSingleService",route.params.id))

    return {
        service: computed(()=>store.getters.getSingleService),
    }
}
}
</script>

<style>

</style>