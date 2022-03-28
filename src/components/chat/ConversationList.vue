<template>
  <div>
    <div
      v-if="conversations.length > 0"
      @click="openChat(conversation.id)"
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
        <img
          class="rounded-circle"
          :src="`${imgUrl}/${otherMember.photo}`"
          alt=""
        />
      </div>
      <div class="font-weight-bold mr-1 overflow-hidden">
        <div class="text-truncate">{{ otherMember.name }}</div>
        <div class="small text-truncate overflow-hidden text-black-50">
          <i class="mdi mdi-check"></i>
          <span v-if="conversation.senderId == $store.getters.getAuthUser.id"
            >me:</span
          >
          {{ conversation.lastMessage }}
        </div>
      </div>
      <span class="ml-auto mb-auto">
        <div class="text-right text-muted pt-1 small">
          {{ timeDiff(conversation.sentAt) }}
        </div>
      </span>
    </div>
    <div v-else>
      <div
        class="
          card
          shadow-none
          d-flex
          justify-content-center
          align-items-center
          flex-column
          mt-5
          mx-5
        "
      >
        <p>No Any Conversation</p>
        <h5>Start a New Chat</h5>
      </div>
    </div>
  </div>
</template>


<script>
import { useStore } from "vuex";
import { computed, onMounted, ref } from "vue";
export default {
  props: {
    conversation: {
      type: Object,
      required: true,
    },
  },
  emits: ["showChat"],
  setup(props, context) {
    const store = useStore();
    const timeNow = ref(Date.now());

    onMounted(() => {
      setInterval(() => {
        timeNow.value = Date.now();
      }, 5000);
    });

    const openChat = (conversationID) => {
      store.dispatch("openSelectedConversation", conversationID);
      context.emit("showChat", true);
    };

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

    const otherMember = computed(() =>
      props.conversation.membersInfo.find(
        (member) => store.getters.getAuthUser.id != member.id
      )
    );
    return {
      openChat,
      otherMember,
      imgUrl: process.env.VUE_APP_URL,
      timeDiff,
      conversations: computed(() => store.getters.getConversations),
    };
  },
};
</script>

<style>
</style>