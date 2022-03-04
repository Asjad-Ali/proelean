<template>
  <div class="py-5">
         <div class="container ">
            <div class="row d-flex justify-content-center col-12 m-0 p-0">
               <div class="col-md-9">
                  <h4 class="mb-3">Notifications</h4>
                  <div class="box shadow-sm rounded bg-white mb-3">
                     <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Recent</h6>
                     </div>
                     <div class="box-body p-0" v-for="notification in recentNotification" :key="notification.index">
                       <div class="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
                           <div class="dropdown-list-image mr-3">
                              <img class="rounded-circle" src="/assets/images/user/s4.png" alt="">
                           </div>
                           <div class="font-weight-bold mr-3">
                              <div class="text-truncate">{{ notification.name }}</div>
                              <div class="small">{{ notification.body }}</div>
                           </div>
                           <span class="ml-auto my-auto">
                              <div class="d-flex">
                              <div class="text-right text-muted ml-2">{{ $filters.timeAgo( notification.created_at ) }}</div>
                                 <div>
                                    <i class="mdi text-danger cursor-pointer mdi-delete fa-lg p-1 m-2"></i>
                              </div>
                              </div>
                           </span>
                        </div>
                     </div>
                  </div>
                  <div class="box shadow-sm rounded bg-white mb-3">
                     <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Earlier</h6>
                     </div>
                     <div class="box-body p-0" v-for="notification in earlierNotification" :key="notification.index">
                       <div class="p-3 d-flex align-items-center bg-light border-bottom osahan-post-header">
                           <div class="dropdown-list-image mr-3">
                              <img class="rounded-circle" src="/assets/images/user/s4.png" alt="">
                           </div>
                           <div class="font-weight-bold mr-3">
                              <div class="text-truncate">{{ notification.name }}</div>
                              <div class="small">{{ notification.body }}</div>
                           </div>
                           <span class="ml-auto my-auto">
                              <div class="d-flex">
                              <div class="text-right text-muted ml-2">{{ notification.created_at }}</div>
                                 <div>
                                    <i class="mdi text-danger cursor-pointer mdi-delete fa-lg p-1 m-2"></i>
                              </div>
                              </div>
                           </span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from 'vuex'
export default {
   setup(){
      const store = useStore()
      const timeNow= Date.now();
      // const oneDay = 24 * 60 * 60 * 1000;
      return{
         recentNotification: computed( () => store.getters.getUserNotifications.filter(notif => (timeNow - (notif.created_at).getTime()) < (3600*1000))),
         earlierNotification: computed( () => store.getters.getUserNotifications)
         // earlierNotification: computed( () => store.getters.getUserNotifications.filter(notif => notif.created_at == true ? {...notif, created_at:"Asjad"} :(notif) ))
      }
   }

}
</script>

<style>

</style>