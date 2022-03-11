<template>
  <!-- WRITE A MESSAGE -->
    <div class="w-100 border-top border-bottom">
      <textarea
        placeholder="Write a message…"
        class="form-control border-0 p-3 shadow-none"
        rows="2"
        v-model="newMessage.text"
      ></textarea>
    </div>

    <!-- CHOOSE A FILE -->
    <div class="p-3 d-flex align-items-center">
      <div class="overflow-hidden">
        <button type="button" class="btn btn-light btn-sm rounded">
          <i class="mdi mdi-image"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm rounded">
          <i class="mdi mdi-paperclip"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm rounded">
          <i class="mdi mdi-camera"></i>
        </button>
      </div>
      <span class="ml-auto">
        <button
          type="button"
          class="btn btn-success btn-sm rounded"
          @click.prevent="sendMsg"
        >
          <i class="mdi mdi-send"></i> Send
        </button>
      </span>
    </div>

    <!-- <ChooseFile /> -->
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";

export default {
setup() {
    const store = useStore();

    const newMessage = ref({
        text: '',
        attachement:'',
        attachementType: 0,
        offer: null,
        refersGig: false,
    });

    const sendMsg = () => {
      if (newMessage.value.text) {
        store.dispatch("sendMessage", newMessage.value);
        newMessage.value.text = ''
      }
    };

    return {
      newMessage,
      sendMsg,
    };
  },
}
</script>

<style>

</style>