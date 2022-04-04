<template>
  <div class="row m-0 p-0">
    <div class="col-lg-12">
      <h3 class="app-page-title">Notifications</h3>
      <div class="border-bottom my-3"></div>
      <div v-if="loader" class="d-flex justify-content-center s-margin">
        <div class="spinner-border text-primary m-2" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else class="box shadow-sm rounded bg-white mb-3">
        <div class="box-title border-bottom p-3">
          <h6 class="m-0">All Notifications</h6>
        </div>
        <div v-if="earlierNotification.length > 0">
          <div
            class="box-body p-0"
            v-for="notification in earlierNotification"
            :key="notification.index"
          >
            <div class="p-3 bg-light border-bottom osahan-post-header">
              <div class="row d-flex align-items-center">
                <div class="col-auto">
                  <div class="dropdown-list-image">
                    <img
                      class="rounded-circle"
                      src="https://api.dex.proelean.com//assets/images/avator.png"
                      alt=""
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="font-weight-bold text-truncate text-left">
                    {{ notification.name }}
                  </div>
                </div>
                <div class="col-auto ml-auto">
                  <div class="text-muted ml-2">
                    {{ $filters.timeAgo(notification.created_at) }}
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-auto p-3">
                  <div class="text-muted" style="word-break: break-word">
                    {{ notification.body }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="app-card-body" v-else>
          <div class="table-responsive flex-width-center">
            <div class="m-5 text-center">
              <h5>No notifications found</h5>
              <figure class="">
                <img
                  class="rounded-circle"
                  :src="'/assets/images/notify.svg'"
                  alt=""
                  width="200"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>

      <!-- Confirmation Modal -->
      <!-- <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header d-flex justify-content-center">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Delete Notification
              </h5>
            </div>
            <div class="modal-body text-center">
              Are you sure you want to delete the service?
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-danger"
                data-dismiss="modal"
                @click="deleteNotification"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    function deleteNotification() {
      console.log("Deleted Successfully");
    }
    onMounted(() => store.dispatch("getNotification"));
    return {
      deleteNotification,
      loader: computed(() => store.getters.getLoaderVal),
      imgURL: process.env.VUE_APP_URL,
      earlierNotification: computed(() => store.getters.getAllNotifications),
    };
  },
};
</script>

<style >
</style>