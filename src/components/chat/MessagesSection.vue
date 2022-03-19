<template>
  <div class="col-lg-7 col-xl-8 px-0">
    <div class="p-3 d-flex align-items-center border-bottom osahan-post-header">
      <div class="font-weight-bold mr-1 overflow-hidden">
        <div class="text-truncate">
          {{ otherMember ? otherMember.name : "" }}
        </div>
        <!-- <div class="small text-truncate overflow-hidden text-black-50">
          Askbootstap.com - Become a Product Manager with super power
        </div> -->
      </div>
    </div>
    <div
    id="messages-section"
      class="osahan-chat-box p-3 border-top border-bottom bg-light chat-hieght"
      @scroll="handleScroll"
    >
      <Message
        v-for="(message, index) in $store.getters.getChatMessages"
        :key="message.id"
        :message="message"
        :showDateBar="
          index == 0 ||
          new Date(message.sentAt).getDate() !==
            new Date($store.getters.getChatMessages[index - 1].sentAt).getDate()
        "
      />
    </div>

    <WriteAMessage />
  </div>
</template>

<script>
import WriteAMessage from "./WriteAMessage.vue";
import Message from "./Message.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: { Message, WriteAMessage },
  setup() {
    const store = useStore();

    const otherMember = computed(() => {
      if (store.getters.getNewConversationUser) {
        return store.getters.getNewConversationUser;
      } else {
        return store.getters.getSelectedConversation &&
          store.getters.getSelectedConversation.membersInfo
          ? store.getters.getSelectedConversation.membersInfo.find(
              (member) => store.getters.getAuthUser.id != member.id
            )
          : null;
      }
    });

    const handleScroll = (e) => {
      if (e.target.scrollTop == 0) {
        store.dispatch('reversePaginate');
      }
    };
    return {
      otherMember,
      handleScroll,
    };
  },
};
</script>

<style lang="scss" scoped>
.chat-hieght {
  height: 65vh;
}

.scroll-disabled{
   position: fixed;
    margin-top: 0;// override by JS to use acc to curr $(window).scrollTop()
    width: 100%;
}
</style>