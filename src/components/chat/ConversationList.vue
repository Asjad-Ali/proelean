<template>
  <div
  @click="$store.dispatch('openSelectedConversation',conversation.id)"
    class="
      p-3
      d-flex
      align-items-center
      bg-light
      border-left border-primary border-bottom
      osahan-post-header
      overflow-hidden
    "
  >
    <div class="dropdown-list-image mr-3">
      <img class="rounded-circle" :src="`${imgUrl}/${otherMember.photo}`" alt="" />
    </div>
    <div class="font-weight-bold mr-1 overflow-hidden">
      <div class="text-truncate">{{otherMember.name}}</div>
      <div class="small text-truncate overflow-hidden text-black-50">
        <i class="mdi mdi-check"></i> {{conversation.lastMessage}}
      </div>
    </div>
    <span class="ml-auto mb-auto">
      <div class="text-right text-muted pt-1 small">{{timeDiff(conversation.sentAt)}}</div>
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {computed, onMounted, ref } from 'vue'
export default {
    props:{
        conversation: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
      const store= useStore();
      const timeNow=ref(Date.now());

      onMounted( () => {
        setInterval( () =>  {
          timeNow.value=Date.now();
        }, 1000);
      })


      const timeDiff=(time)=>{
        const differenceinSeconds=(timeNow.value-time)/1000;

        if(differenceinSeconds<60){
            return parseInt(differenceinSeconds) +'s ago';
        }
        else if(differenceinSeconds>60 && differenceinSeconds<3600){
          return parseInt(differenceinSeconds/60) +'m ago';
        }
        else if(differenceinSeconds>3600 && differenceinSeconds<86400){
          return parseInt(differenceinSeconds/3600) +'h ago';
        }
        else if(differenceinSeconds>86400){
          return parseInt(differenceinSeconds/86400) +'d ago';
        }
        
      }

    const otherMember = computed(() => props.conversation.membersInfo.find(member => store.getters.getAuthUser.id != member.id));
    return  {
      otherMember,
      imgUrl: process.env.VUE_APP_URL,
      timeDiff
    }
    }
};
</script>

<style>
</style>