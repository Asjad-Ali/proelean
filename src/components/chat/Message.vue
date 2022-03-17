<template>
  <div class="text-center my-3">
    <span v-if="showDateBar" class="px-3 py-2 small bg-white shadow-sm rounded">{{
      new Date(message.sentAt).toLocaleString().split(",")[0]
    }}</span>
  </div>
  <div class="d-flex align-items-center osahan-post-header" :class="message.senderId==$store.getters.getAuthUser.id && `right-message` ">
    <div class="dropdown-list-image mr-3 mb-auto">
      <img
        class="rounded-circle position-fit"
        :src="`${imgUrl}/${messageOwner(message.senderId).photo}`"
        alt=""
      />
    </div>
    <div class="mr-1">
      <div class="text-truncate h6 mb-3">{{message.senderId==$store.getters.getAuthUser.id ? 'Me' : messageOwner(message.senderId).name}}</div>
      <p class="p-3 rounded-lg text-white" :class="message.senderId==$store.getters.getAuthUser.id ? `my-message` : `other-message` ">
        {{ message.message }}
        <!-- <a href="#">iamosahan@gmail.com</a> -->
      </p>
    </div>
    <span class="ml-auto mb-auto">
      <div class="text-right text-muted pt-1 small">
        {{ timeDiff(message.sentAt) }}
      </div>
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import {  onMounted, ref } from "vue";

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    showDateBar:{
      required:true,
      default:true
    }
  },

  setup() {
    const store = useStore();
    const timeNow = ref(Date.now());

    const messageOwner = (senderId) => {
      return store.getters.getSelectedConversation.membersInfo
      ? store.getters.getSelectedConversation.membersInfo.find(
        (member) => senderId == member.id
      )
      : {name:'',photo:null}
    }

    onMounted(() => {
      setInterval(() => {
        timeNow.value = Date.now();
      }, 15000);
    });

    const timeDiff = (time) => {
      const differenceinSeconds = (timeNow.value - time) / 1000;

      if (differenceinSeconds < 60) {
        return parseInt(differenceinSeconds) + "s ago";
      } else if (differenceinSeconds > 60 && differenceinSeconds < 3600) {
        return parseInt(differenceinSeconds / 60) + "m ago";
      } else if (differenceinSeconds > 3600 && differenceinSeconds < 86400) {
        return parseInt(differenceinSeconds / 3600) + "h ago";
      } else if (differenceinSeconds > 86400) {
        return parseInt(differenceinSeconds / 86400) + "d ago";
      }
    };

    return {
      messageOwner,
      imgUrl: process.env.VUE_APP_URL,
      timeDiff,
    };
  },
};
</script>

<style scoped>
.position-fit{
  object-fit: cover;
}
.my-message{
  background:#8396ab ;
}
.other-message{
  background: #15a362;
}
</style>  