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
        {{ message.message }}
      </p>
      <div v-if="message.attachment" class="img-holder-attchments">
        <img :src="message.attachment" class="img-fluid" />
      </div>

      <div class="row" v-if="message.messageOffer">
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
                  message.messageOffer.offerSenderId === $store.getters.getAuthUser.id 
                  && (message.messageOffer.status === 2 || message.messageOffer.status === 0)
                "
                @click="withdrawOffer($event, message.id)"
                :disabled="message.messageOffer.status === 2"
              >
                {{
                  message.messageOffer.status === 2
                    ? "offer withdrawn"
                    : "Withdraw the offer"
                }}
              </button>
              <button
                aria-hidden="true"
                data-toggle="modal"
                class="btn app-btn-primary btn-sm "
                data-target="#staticBackdrop"
                id="accept_offer"
                v-else
                @click="acceptCustomOffer(message)"
                :disabled="message.messageOffer.status === 1 || (loading.status === 'LOADING' && loading.offerId === message.id)"
                >
                <!-- <i class="fa fa-spin" v-if="loading.status === 'LOADING' && loading.offerId === message.id"></i> -->
                {{message.messageOffer.status === 1 ? 'Offer accepted' : 'Accept offer'}}</button
              >
            </div>
          </div>
        </div>
      </div>

      <!-- card gig refrence new -->
      <div class="row">
        <div class="col-md-7">
          <div
            class="gig-refrence-main py-5"
            v-if="
              message.messageGig && message.senderId === $store.getters.getAuthUser.id
            "
          >
            <p class="m-0 text-muted p-1">This message is related to:</p>
            <div class="card">
              <img
                class="card-img-top"
                :src="`${imgUrl}/` + message.messageGig.gigImage"
                alt="Card image cap"
              />
              <div class="card-body">
                <h6 class="card-title">
                  {{ message.messageGig.gigTitle }}
                </h6>
                <p class="card-text">
                  <i class="mdi mdi-account"> </i>
                  {{ message.messageGig.gigUsername }}
                </p>
              </div>
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
import { computed, onMounted, ref } from "vue";
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

      const offerPayload = {
        'docId': messageID,
        'status': 2
      };

      store.dispatch("withdrawOffer", offerPayload).then(() => {
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
      loading: computed(() => store.getters.getOfferPurchaseStatus)
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
.card-img-top {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

/* .img-holder-attchments {
  height: 300px;
  width: 300px;
} */
.img-holder-attchments img {
  max-width: 50%;
  height: auto;
}

/* .img-holder {
  width: 100%;
  height: auto;
} */

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

.chat-hieght {
  height: 65vh;
}

.offer-img-holder {
  height: auto;
  max-width: 200px;
}
.offer-img-holder img {
  height: auto;
  width: 30%;
}
.disable-offer-btn{
  cursor: not-allowed;
  color: gray
}
.scroll-disabled {
  position: fixed;
  margin-top: 0; /* override by JS to use acc to curr $(window).scrollTop() */
  width: 100%;
}
@media (max-width: 767.98px) {
  .offer-img-holder {
    height: auto;
    max-width: 100%;
  }
}
</style>