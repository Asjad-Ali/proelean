<template>
  <!-- WRITE A MESSAGE -->
    <div class="w-100 border-top border-bottom position-relative">
      <textarea
        placeholder="Write a message…"
        class="form-control border-0 p-3 shadow-none message-input"
        rows="3"
        v-model="newMessage.text"
      ></textarea>
       <i class="mdi mdi-send position-absolute send-icon cursor-pointer" @click.prevent="sendMsg"></i>
       <!-- <i class="mdi mdi-paperclip attachment-icon position-absolute "></i> -->
             <div class="overflow-hidden position-absolute d-flex flex-column " style="top:0; left:0px">
        <button type="button" class="btn btn-light btn-sm rounded">
          <i class="mdi mdi-image"></i>
        </button>
        <button type="button" class="btn btn-light btn-sm rounded">
          <i class="mdi mdi-paperclip"></i>
        </button>
      </div>
    </div>

    <!-- CHOOSE A FILE -->
    <!-- <div class="p-3 d-flex align-items-center">
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
    </div> -->

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

<style lang="scss" scoped>
.send-icon{
      right: 27px;
    top: 16px;
    font-size: 20px;
    color:#15a362;
}
.attachment-icon{
    left: 3px;
    top: 16px;
    font-size: 20px;
}
.message-input{
  padding-left: 55px !important;
padding-right: 35px !important;
}

// Small devices (landscape phones, less than 768px)
@media (max-width: 991.98px) { 
  .send-icon{
    right: 6px;
   
}

 }
</style>