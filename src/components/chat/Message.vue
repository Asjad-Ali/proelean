<template>
  <div class="text-center my-3">
    <span
      v-if="showDateBar"
      class="px-3 py-2 small bg-white shadow-sm rounded"
      >{{ new Date(message.sentAt).toLocaleString().split(",")[0] }}</span
    >
  </div>
  <div
    class="d-flex align-items-center osahan-post-header"
    :class="
      message.senderId == $store.getters.getAuthUser.id && `right-message`
    "
  >
    <div class="dropdown-list-image mr-3 mb-auto">
      <img
        class="rounded-circle position-fit"
        :src="`${imgUrl}/${messageOwner(message.senderId).photo}`"
        alt=""
      />
    </div>
    <div class="mr-1">
      <div class="text-truncate h6 mb-3">
        {{
          message.senderId == $store.getters.getAuthUser.id
            ? "Me"
            : messageOwner(message.senderId).name
        }}
      </div>
      <p
        :style="message.attachment && 'background-color : transparent;'"
        class="p-3 rounded-lg text-white text-breaks"
        :class="
          message.senderId == $store.getters.getAuthUser.id
            ? `my-message`
            : `other-message`
        "
        v-if="!message.messageOffer"
      >
        <img
          :src="message.attachment"
          alt=""
          v-if="message.attachment"
          style="
            width: 20%;
            height: 20%;
            object-fit: cover;
            border: 1px solid #dde;
            border-radius: 10px;
            padding: 10px;
          "
          class="img-fluid"
        />
        {{ message.message }}
        <!-- <a href="#">iamosahan@gmail.com</a> -->
      </p>
      <div class="row" v-else>
        <div class="col-md-10">
          <div class="card shadow-none">
            <div class="card-body">
              <p class="offer-title">
                {{ message.messageOffer.serviceTitle }}
              </p>
              <p class="offer-description">
                {{ message.messageOffer.description }}
              </p>
              <div class="d-md-flex justify-content-around py-2 flex-wrap">
                <article>
                  <div>
                    <div class="delivery">
                      <i class="mdi mdi-currency-eur" aria-hidden="true"></i>
                      <p class="mr-2">Price :</p>
                      {{ message.messageOffer.totalOffer }}
                    </div>
                  </div>
                </article>
                <article>
                  <div class="delivery">
                    <i class="mdi mdi-clock" aria-hidden="true"></i>
                    <p class="mr-2">Delivery Time:</p>
                    {{ message.messageOffer.deliveryDays }}
                  </div>
                </article>
                <article>
                  <div class="delivery">
                    <i class="mdi mdi-sync" aria-hidden="true"></i>
                    <p class="mr-2">Revision:</p>
                    {{ message.messageOffer.revisions }}
                  </div>
                </article>
              </div>
              <button
                class="btn app-btn-primary"
                v-if="
                  message.messageOffer.offerSenderId ===
                  $store.getters.getAuthUser.id
                "
                @click="withdrawOffer($event, message.id)"
                :disabled="message.messageOffer.status === 2"
              >
                <i
                  class="fa fa-circle-o-notch fa-spin"
                  style="font-size: 16px"
                  v-if="
                    $store.getters.getMessageOfferLoadingStatus === 'LOADING'
                  "
                ></i>
                {{
                  message.messageOffer.status === 2
                    ? "offer withdrawn"
                    : "Withdraw the offer"
                }}
              </button>
              <a
                aria-hidden="true"
                data-toggle="modal"
                class="btn-light btn-sm rounded text-center cursor-pointer"
                data-target="#staticBackdrop"
                v-else
                @click="acceptCustomOffer(message.messageOffer)"
                >Accept offer</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <AcceptServiceOffer v-if="acceptOffer" />

    <span class="ml-auto mb-auto">
      <div class="text-right text-muted pt-1 small">
        {{ timeDiff(message.sentAt) }}
      </div>
    </span>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, ref } from "vue";
import AcceptServiceOffer from "@/components/modals/PurchaseService.vue";

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    showDateBar: {
      required: true,
      default: true,
    },
  },

  components: { AcceptServiceOffer },

  setup() {
    const store = useStore();
    const timeNow = ref(Date.now());
    const acceptOffer = ref(false);

    const messageOwner = (senderId) => {
      return store.getters.getSelectedConversation.membersInfo
        ? store.getters.getSelectedConversation.membersInfo.find(
            (member) => senderId == member.id
          )
        : { name: "", photo: null };
    };

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

    const withdrawOffer = (event, messageID) => {
      store.dispatch("withdrawOffer", messageID).then(() => {
        event.target.innerText = "offer withdrawn";
      });
    };

    const acceptCustomOffer = (offer) => {
      acceptOffer.value = true;
      store.commit("setCustomOffer", offer);
    };

    return {
      messageOwner,
      imgUrl: process.env.VUE_APP_URL,
      timeDiff,
      withdrawOffer,
      acceptCustomOffer,
      acceptOffer,
    };
  },
};
</script>

<style scoped>
.offer-title {
  font-weight: 500;
  font-size: 17px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e7e9ed;
}

.seller-app .btn {
  font-weight: 400;
  padding: 0.4rem 1rem;
  font-size: 0.875rem;
  border: none;
  color: #fff;
}
.mdi {
  color: #15a362;
}
.offer-description {
  font-weight: 400;
  color: #8396ab;
  word-wrap: break-word;
  word-break: break-all;
}
.delivery {
  display: flex;
}
.delivery p {
  font-weight: 500;
}
.position-fit {
  object-fit: cover;
}
.my-message {
  background: #8396ab;
}
.other-message {
  background: #15a362;
}

.text-breaks {
  word-break: break-all;
}
</style>  