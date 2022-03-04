<template>
  <div
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
      <div class="text-right text-muted pt-1 small">{{conversation.sentAt}}</div>
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {computed} from 'vue'
export default {
    props:{
        conversation: {
            type: Object,
            required: true,
        }
    },
    setup(props) {
      const store= useStore();

    const otherMember = computed(() => props.conversation.membersInfo.find(member => store.getters.getAuthUser.id != member.id));
    return  {
      otherMember,
      imgUrl: process.env.VUE_APP_URL
    }
    }
};
</script>

<style>
</style>