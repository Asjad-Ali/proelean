<template>
  <header class="app-header fixed-top">
    <div class="app-header-inner">
      <div class="container-fluid py-2">
        <div class="app-header-content">
          <div class="row justify-content-between align-items-center">
            <div class="col-auto">
              <a
                id="sidepanel-toggler"
                class="sidepanel-toggler d-inline-block d-xl-none"
                @click="sidePanelOpened = !sidePanelOpened"
                href="#"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  role="img"
                >
                  <title>Menu</title>
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                    stroke-width="2"
                    d="M4 7h22M4 15h22M4 23h22"
                  ></path>
                </svg>
              </a>
            </div>
            <!--//col-->
            <div class="app-utilities col-auto">
              <span class="mr-2">
                <a class="cursor-pointer" @click="handleUserMode">
                  Switch to {{ isBuyerMode ? "Seller" : "Buyer" }}
                </a>
              </span>
              <div class="app-utility-item app-notifications-dropdown dropdown sm-fold-none">
                <a
                  class="dropdown-toggle no-toggle-arrow"
                  id="notifications-dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                  title="Notifications"
                >
                  <!--//Bootstrap Icons: https://icons.getbootstrap.com/ -->
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-bell icon"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2z" />
                    <path
                      fill-rule="evenodd"
                      d="M8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"
                    />
                  </svg>
                  <span class="icon-badge">3</span> </a
                ><!--//dropdown-toggle-->

                <div
                  class="dropdown-menu p-0"
                  aria-labelledby="notifications-dropdown-toggle"
                >
                  <div class="dropdown-menu-header p-3">
                    <h5 class="dropdown-menu-title mb-0">Notifications</h5>
                  </div>
                  <!--//dropdown-menu-title-->
                  <div class="dropdown-menu-content" data-v-777096b7="">
                    <div
                      class="item p-3"
                      data-v-777096b7=""
                      v-for="notification in userNotification"
                      :key="notification.index"
                    >
                      <div
                        class="
                          row
                          gx-2
                          justify-content-between
                          align-items-center
                        "
                        data-v-777096b7=""
                      >
                        <div class="col-auto" data-v-777096b7="">
                        <img
                          :src="`${imgURL}/${
                            notification.image ? notification.image : '/assets/images/avator.png'
                          }`"
                          class="profile-image img-full rounded-circle"
                          alt="profile_img"
                        />
                        </div>
                        <!--//col-->
                        <div class="col" data-v-777096b7="">
                          <div class="info" data-v-777096b7="">
                            <div class="desc" data-v-777096b7="">
                              <b> {{ notification.name }} </b>
                            </div>
                            <div class="desc" data-v-777096b7="">
                              {{ notification.body }}
                            </div>
                            <div class="meta align-baseline" data-v-777096b7="">
                              {{ $filters.timeAgo(notification.created_at) }}
                            </div>
                          </div>
                        </div>
                        <!--//col-->
                      </div>
                      <!--//row-->
                      <a
                        href="/dashboard/notifications"
                        class="link-mask"
                        data-v-777096b7=""
                      ></a>
                    </div>
                  </div>
                  <!--//dropdown-menu-content-->

                  <div class="dropdown-menu-footer p-2 text-center">
                    <router-link to="/dashboard/notifications"
                      >View all</router-link
                    >
                  </div>
                </div>
                <!--//dropdown-menu-->
              </div>
              <!--//app-utility-item-->
              <!-- <div class="app-utility-item sm-fold-none">
                <router-link to="/dashboard/settings" title="Settings"> -->
                  <!--//Bootstrap Icons: https://icons.getbootstrap.com/ -->
                  <!-- <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-gear icon"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8.837 1.626c-.246-.835-1.428-.835-1.674 0l-.094.319A1.873 1.873 0 0 1 4.377 3.06l-.292-.16c-.764-.415-1.6.42-1.184 1.185l.159.292a1.873 1.873 0 0 1-1.115 2.692l-.319.094c-.835.246-.835 1.428 0 1.674l.319.094a1.873 1.873 0 0 1 1.115 2.693l-.16.291c-.415.764.42 1.6 1.185 1.184l.292-.159a1.873 1.873 0 0 1 2.692 1.116l.094.318c.246.835 1.428.835 1.674 0l.094-.319a1.873 1.873 0 0 1 2.693-1.115l.291.16c.764.415 1.6-.42 1.184-1.185l-.159-.291a1.873 1.873 0 0 1 1.116-2.693l.318-.094c.835-.246.835-1.428 0-1.674l-.319-.094a1.873 1.873 0 0 1-1.115-2.692l.16-.292c.415-.764-.42-1.6-1.185-1.184l-.291.159A1.873 1.873 0 0 1 8.93 1.945l-.094-.319zm-2.633-.283c.527-1.79 3.065-1.79 3.592 0l.094.319a.873.873 0 0 0 1.255.52l.292-.16c1.64-.892 3.434.901 2.54 2.541l-.159.292a.873.873 0 0 0 .52 1.255l.319.094c1.79.527 1.79 3.065 0 3.592l-.319.094a.873.873 0 0 0-.52 1.255l.16.292c.893 1.64-.902 3.434-2.541 2.54l-.292-.159a.873.873 0 0 0-1.255.52l-.094.319c-.527 1.79-3.065 1.79-3.592 0l-.094-.319a.873.873 0 0 0-1.255-.52l-.292.16c-1.64.893-3.433-.902-2.54-2.541l.159-.292a.873.873 0 0 0-.52-1.255l-.319-.094c-1.79-.527-1.79-3.065 0-3.592l.319-.094a.873.873 0 0 0 .52-1.255l-.16-.292c-.892-1.64.902-3.433 2.541-2.54l.292.159a.873.873 0 0 0 1.255-.52l.094-.319z"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M8 5.754a2.246 2.246 0 1 0 0 4.492 2.246 2.246 0 0 0 0-4.492zM4.754 8a3.246 3.246 0 1 1 6.492 0 3.246 3.246 0 0 1-6.492 0z"
                    />
                  </svg>
                </router-link>
              </div> -->
              <!--//app-utility-item-->

              <div class="app-utility-item app-user-dropdown dropdown">
                <a
                  class="dropdown-toggle"
                  id="user-dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-expanded="false"
                  ><img
                    :src="`${imgURL}/${user.image}`"
                    class="dropdown-user-img img-full rounded-circle"
                    alt="profile_img"
                /></a>
                <ul
                  class="dropdown-menu"
                  aria-labelledby="user-dropdown-toggle"
                >
                  <li>
                    <router-link class="dropdown-item" to="/dashboard/account"
                      >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-settings mb-1"
                      >
                        <circle cx="12" cy="12" r="3"></circle>
                        <path
                          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                        ></path>
                      </svg>
                      Account</router-link
                    >
                  </li>
                  <li>
                    <router-link class="dropdown-item" to="/dashboard/change_password"
                      >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-lock-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"
                    />
                  </svg>Change Password</router-link
                    >
                  </li>
                  <li><hr class="dropdown-divider" /></li>
                  <li>
                    <button class="dropdown-item" @click="handleLogout()"
                      >Log Out</button
                    >
                  </li>
                </ul>
              </div>
              <!--//app-user-dropdown-->
            </div>
            <!--//app-utilities-->
          </div>
          <!--//row-->
        </div>
        <!--//app-header-content-->
      </div>
      <!--//container-fluid-->
    </div>

    <SidePanel
      :sidePanelOpen="sidePanelOpened"
      @sidPanelClose="sidePanelOpened = false"
    />
  </header>
</template>

<script>
import Api from "@/services/API";
import SidePanel from "./SidePanel.vue";
import { onMounted, computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  components: { SidePanel },
  setup() {
    const store = useStore();
    const router = useRouter();
    const sidePanelOpened = ref(false);

    const isBuyerMode = computed(() => store.getters.isBuyerMode);

    const handleLogout = async () => {
      const response = await Api.post("logout");
      if (response.status === 200) {
        localStorage.removeItem("PROELEAN_TOKEN");
        localStorage.removeItem("userInfo");
        router.go();
      }
    };

    onMounted(() => {
      if (isBuyerMode.value) {
        store.commit("toggleUserMode");
      }
    });
    const handleUserMode = () => {
      store.commit("toggleUserMode");
      if (isBuyerMode.value) {
        router.push({ name: "Home" });
      } else {
        router.push({ name: "sellerDashboard" });
      }
    };

    return {
      sidePanelOpened,
      userNotification: computed(() => store.getters.getRecentNotifications),
      user: computed(() => store.getters.getAuthUser),
      imgURL: process.env.VUE_APP_URL,
      isBuyerMode,
      handleUserMode,
      handleLogout
    };
  },
};
</script>

<style scoped>
.app-utilities {
  display: flex;
  align-items: center;
}
@media (max-width: 280px) {
    .sm-fold-none {
        display: none;
    }
}
</style>