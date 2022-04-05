<template>
  <!--selected media preview  -->
  <div class="container">
    <div
      class="
        row
        shadow-sm
        d-flex
        justify-content-between
        align-items-center
        px-3
        py-2
        img-attachment-bg
      "
      v-if="chatMedia.media.type"
    >
      <div>
        <i class="mdi mdi-image" v-if="chatMedia.media.type.includes('image')">
          <span class="ml-2">{{ chatMedia.media.name }}</span></i
        >
      </div>
      <div>
        <p class="m-0">{{ chatMedia.media.size }}</p>
      </div>
      <div>
        <a href="#" @click="removeMedia($event, chatMedia.media.name)"
          ><i class="mdi mdi-close-box"></i
        ></a>
      </div>
    </div>

    <!-- <div class="row p-3" id="media-container">
      <table class="table m-0" v-if="chatMedia.media.type">
        <tr>
          <td class="d-flex flex-row justify-content-between">
            <i class="mdi mdi-image" v-if="chatMedia.media.type.includes('image')">
              <span class="ml-2">{{ chatMedia.media.name }}</span></i >
          </td>
          <td>
            <p>{{ chatMedia.media.size }}</p>
          </td>
          <td>
            <p id="upload-progress"></p>
          </td>
          <td>
            <a href="#" @click="removeMedia($event, chatMedia.media.name)"
              ><i class="mdi mdi-close-box"></i
            ></a>
          </td>
        </tr>
      </table>
 
    </div> -->
  </div>
  <!-- WRITE A MESSAGE -->
  <div class="w-100 border-top border-bottom position-relative">
    <textarea
      placeholder="Write a message…"
      class="form-control border-0 p-3 shadow-none message-input"
      rows="3"
      v-model="newMessage.text"
      :readonly="
        !$store.getters.getSelectedConversation &&
        !$store.getters.getNewConversationUser
      "
      @keyup.enter="sendMsg($event)"
    ></textarea>
    <button
     @click.prevent="sendMsg($event)"
     :disabled="sendBtn"
     >
    <i
      class="mdi mdi-send position-absolute send-icon cursor-pointer"
     
    ></i>
    </button>
    <div
      class="overflow-hidden position-absolute d-flex flex-column"
      style="top: 0; left: 0px"
    >
      <button
        type="button"
        class="btn btn-light btn-sm rounded"
        :disabled="
          !$store.getters.getSelectedConversation &&
          !$store.getters.getNewConversationUser
        "
        @click="$refs.mediaInput.click()"
      >
        <input
          type="file"
          ref="mediaInput"
          id="mediaInput"
          style="display: none"
          @change="selectMedia"
          required
        />
        <i class="mdi mdi-image"></i>
      </button>

      <button
        :disabled="
          !$store.getters.getSelectedConversation &&
          !$store.getters.getNewConversationUser
        "
        type="button"
        class="btn btn-light btn-sm rounded"
      >
        <i class="mdi mdi-paperclip"></i>
      </button>
      <a
        aria-hidden="true"
        data-toggle="modal"
        class="btn-light btn-sm rounded text-center cursor-pointer"
        data-target="#exampleModalCenter"
        @click="showOfferModal = true"
        v-if="!$store.getters.isBuyerMode"
      >
        <i class="mdi mdi-plus"></i>
      </a>
    </div>
  </div>

  <SendOffer />
</template>

<script>
import SendOffer from "../modals/CreateOfferOnChat.vue";
import { useStore } from "vuex";
import useFirebaseMedia from "@/composables/useFirebaseMedia";
import compressImage from "@/composables/useImageCompression";
import { ref } from "@vue/reactivity";

export default {
  components: { SendOffer },
  setup() {
    const { uploadAttachment } = useFirebaseMedia();

    const store = useStore();
    const sendBtn = ref(false);

    const chatMedia = ref({
      message: "",
      media: "",
    });

    const showOfferModal = ref(false);
    const newMessage = ref({
      text: "",
      attachment: "",
      attachmentType: 0,
      offer: null,
      refererGig: false,
    });

    // select media file's
    async function selectMedia(e) {
      const file = e.target.files[0];
      const image = await compressImage(file);
      chatMedia.value.media = image;
    }

    const removeMedia = (e) => {
      e.preventDefault();
      chatMedia.value.media = {};
    };

    const sendMsg = (event) => {
      event.preventDefault();
      sendBtn.value = true;

      if (chatMedia.value.media) {
        uploadAttachment(chatMedia, newMessage.value, sendBtn);
      } else {
        if (!newMessage.value.text) {
          return;
        }
        store.dispatch("sendMessage", newMessage.value).then(()=>{
        newMessage.value.text = "";
        });

      }
    };

    return {
      newMessage,
      sendMsg,
      sendBtn,
      showOfferModal,
      selectMedia,
      chatMedia,
      removeMedia,
    };
  },
};
</script>

<style lang="scss" scoped>
.send-icon {
  right: 27px;
  top: 16px;
  font-size: 20px;
  color: #15a362;
}
.attachment-icon {
  left: 3px;
  top: 16px;
  font-size: 20px;
}
.message-input {
  padding-left: 55px !important;
  padding-right: 35px !important;
  min-height: 100px;
}

.img-attachment-bg {
  background: azure;
}
.mdi-close-box {
  color: red;
  font-size: 20px;
}
// Small devices (landscape phones, less than 768px)
@media (max-width: 991.98px) {
  .send-icon {
    right: 6px;
  }
}
</style>