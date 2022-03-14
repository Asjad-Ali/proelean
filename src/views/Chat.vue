<template>
    <div :class="$store.getters.isBuyerMode && 'py-3'">
         <div>
       <div :class="$store.getters.isBuyerMode && `container-fluid`">
               <div class="row">
               <!-- Main Content -->
               <main class="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                  <div class="box shadow-sm rounded bg-white mb-3 osahan-chat">
                     <!-- <h5 class="pl-3 pt-3 pr-3 border-bottom mb-0 pb-3">Messaging</h5> -->
                     <div class="row m-0">
                        <div class="border-right col-lg-5 col-xl-4 px-0">
                           <div class="osahan-chat-left">
                              <div class="position-relative icon-form-control p-3 border-bottom">
                                 <i class="fa fa-search position-absolute"></i>
                                 <input placeholder="Search messages" type="text" class="form-control">
                              </div>
                              <div v-if="$store.getters.getConversationListStatus==='LOADING'">
                                 <p>Loading...</p>
                              </div>
                              <div class="osahan-chat-list" v-else>
                                 <ConversationList 
                                    v-for="conversation in $store.getters.getConversations" :conversation="conversation" :key="conversation.id" 
                                    style="cursor: pointer;"
                                 />
                              </div>
                           </div>
                        </div>
                        <!-- CHAT SECTION -->
                        <MessagesSection />
                     </div>
                  </div>
               </main>
               
            </div>
       </div>
            
         </div>
      </div>
</template>

<script>
import ConversationList from "../components/chat/ConversationList.vue"
import MessagesSection from "../components/chat/MessagesSection.vue"
import { useStore } from 'vuex'
import { onBeforeMount } from '@vue/runtime-core'
export default {
   components: { ConversationList, MessagesSection },
   setup() {
      const store = useStore();

      onBeforeMount(() =>{
         store.dispatch('lookForConversationChanges');
      });

      const handleSelectedChat = (conversationID) => {
         store.dispatch('openSelectedChat',conversationID)
      }
      return {
         handleSelectedChat
      }
   }
}
</script>
