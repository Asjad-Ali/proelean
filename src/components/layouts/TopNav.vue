<template>
  <nav
    class="
      navbar navbar-expand-lg navbar-light
      topbar
      static-top
      shadow-sm
      bg-white
      osahan-nav-top
      px-0
    "
  >
    <div class="container-fluid mobile-p-0">
      <!-- Sidebar Toggle (Topbar) -->
      <a class="navbar-brand"
        ><router-link to="/"
          ><img src="/assets/images/Pro-eLean-.png" alt="Proelean logo" /> </router-link
      ></a>
      <!-- Topbar Search -->
      <form
        @submit.prevent="handleSearch"
        class="
          d-none d-sm-inline-block
          form-inline
          mr-auto
          my-2 my-md-0
          mw-100
          navbar-search
      "
      style="width: 34%;"
      >
        <div class="input-group">
          <input
            type="text"
            v-model="keywords"
            class="form-control bg-white small"
            placeholder="Find Services..."
            aria-label="Search"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            <button
              class="btn btn-success"
              @click.prevent="handleSearch"
              type="button"
            >
              <i class="fa fa-search fa-sm"></i>
            </button>
          </div>
        </div>
      </form>
      <!-- Topbar Navbar -->
      <ul class="navbar-nav align-items-center ml-auto">
        <li
          class="
            nav-item
            dropdown
            no-arrow no-caret
            mr-3
            dropdown-notifications
            d-sm-none
          "
        >
          <a
            class="
              btn btn-icon btn-transparent-dark
              dropdown-toggle
              d-none d-sm-block
            "
            href="#"
            id="searchDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i class="fa fa-search fa-fw"></i>
          </a>
          <!-- Dropdown - Messages -->
          <div
            class="
              dropdown-menu dropdown-menu-right
              p-3
              shadow-sm
              animated--grow-in
            "
            aria-labelledby="searchDropdown"
          >
            <form class="form-inline mr-auto w-100 navbar-search">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control bg-light border-0 small"
                  placeholder="Find Services..."
                  aria-label="Search"
                  aria-describedby="basic-addon2"
                />
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">
                    <i class="fa fa-search fa-sm"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <ul
          class="navbar-nav align-items-center ml-auto"
          v-if="$store.state.isLoggedIn"
        >
          <span class="mr-2" v-if="user.isFreelancer">
            <a class="cursor-pointer" @click="handleUserMode">
              Switch to {{ isBuyerMode ? "Seller" : "Buyer" }}
            </a>
          </span>

          <!-- Manage Services -->
          <li
            v-if="!isBuyerMode"
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              show
              d-none d-lg-block
            "
            :disabled="userInfo.isFreelancer"
          >
            <router-link
              to="/seller/manage_service"
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Manage Services"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-list-task"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
                />
                <path
                  d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"
                />
                <path
                  fill-rule="evenodd"
                  d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
                />
              </svg>
            </router-link>
          </li>
          <!-- Buyer Requests-->
          <li
            v-if="!isBuyerMode"
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              show
              d-none d-lg-block
            "
            :disabled="userInfo.isFreelancer"
          >
            <router-link
              to="/seller/buyer_requests"
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Buyer Requests"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-person-lines-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"
                />
              </svg>
            </router-link>
          </li>

          <!--===================== Buyer Module============== -->
          <!-- Manage Jobs -->
          <li
            v-if="isBuyerMode"
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              show
              d-none d-lg-block
            "
          >
            <router-link
              to="/buyer/jobs"
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Manage Jobs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-gear-wide-connected"
                viewBox="0 0 16 16"
              >
                <path
                  d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"
                />
              </svg>
            </router-link>
          </li>
          <!-- Manage Order -->
          <li
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              show
              d-none d-lg-block
            "
          >
            <router-link
              to="/buyer/manage_order"
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Manage order"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bag-check"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
                />
                <path
                  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                />
              </svg>
            </router-link>
          </li>
          <!-- Wishlist Service -->
          <li
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              show
              d-none d-lg-block
            "
          >
            <router-link
              to="/seller/favourite_service"
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Favourite Services"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-heart"
                viewBox="0 0 16 16"
              >
                <path
                  d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                />
              </svg>
            </router-link>
          </li>
          <!-- Post a Job -->
          <li
            v-if="isBuyerMode"
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              show
              d-none d-lg-block
            "
          >
            <router-link
              to="/buyer/create_job"
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Post a job"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bag-plus"
                viewBox="0 0 16 16"
                title="Post a Job"

              >
                <path
                  fill-rule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path
                  d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"
                />
              </svg>
            </router-link>
          </li>

          <!-- @if(isset($user) && !is_null($user)) -->
          <li
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
            "
          >
            <a
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownAlerts"
              href="javascript:void(0);"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </a>
            <div
              class="
                dropdown-menu dropdown-menu-right
                border-0
                shadow
                animated--fade-in-up
              "
              aria-labelledby="navbarDropdownAlerts"
            >
              <h6 class="dropdown-header dropdown-notifications-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-bell mr-2"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
                Alerts Center
              </h6>
              <a
                class="
                  dropdown-item dropdown-notifications-item
                  d-flex
                  justify-content-between
                "
                href="#!"
                v-for="notification in userNotification"
                :key="notification.index"
              >
                <div class="d-flex justify-content-start">
                  <div class="dropdown-notifications-item-icon bg-warning">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-activity"
                    >
                      <polyline
                        points="22 12 18 12 15 21 9 3 6 12 2 12"
                      ></polyline>
                    </svg>
                  </div>
                  <div class="dropdown-notifications-item-content">
                    <div>{{ notification.name }}</div>
                    <div class="text-muted small">{{ notification.body }}</div>
                  </div>
                </div>
                <div class="text-muted small ml-2">
                  {{ $filters.timeAgo(notification.created_at) }}
                </div>
              </a>
              <router-link
                class="dropdown-item dropdown-notifications-footer"
                to="/dashboard/notifications"
                >View All Notification</router-link
              >
            </div>
          </li>
          <li
            class="
              nav-item
              dropdown
              no-arrow no-caret
              mr-3
              dropdown-notifications
              d-none d-lg-block
            "
          >
            <a
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownMessages"
              href="/chat"
              aria-haspopup="true"
              aria-expanded="false"
              data-bs-placement="top"
              title="Chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-mail"
              >
                <path
                  d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                ></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
            <!-- <div
              class="
                dropdown-menu dropdown-menu-right
                border-0
                shadow
                animated--fade-in-up
              "
              aria-labelledby="navbarDropdownMessages"
            >
              <h6 class="dropdown-header dropdown-notifications-header">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-mail mr-2"
                >
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                  ></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Message Center
              </h6>

              <MessageCenter
                v-for="conversation in $store.getters.getConversations"
                :conversation="conversation"
                :key="conversation.id"
              />
            </div> -->
          </li>
          <!-- languages li start -->
          <li
            class="
              nav-item
              dropdown
              no-arrow no-caret
              dropdown-user
              mx-2
              d-none d-lg-block
            "
          >
            <a
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownUserImage"
              href="javascript:void(0);"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Languages"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-globe"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"
                />
              </svg>
            </a>
            <div
              class="
                dropdown-menu dropdown-menu-right
                border-0
                shadow
                animated--fade-in-up
              "
              aria-labelledby="navbarDropdownUserImage"
            >
              <a class="dropdown-item" href="#">
                <div class="dropdown-item-icon"></div>
                English
              </a>
              <a class="dropdown-item" href="#">
                <div class="dropdown-item-icon"></div>
                Suomalainen
              </a>
              <a class="dropdown-item" href="#">
                <div class="dropdown-item-icon"></div>
                Türkçe
              </a>
            </div>
          </li>
          <!-- languages li end -->
          <li
            class="
              nav-item
              dropdown
              no-arrow no-caret
              dropdown-user
              d-none d-lg-block
            "
          >
            <a
              class="btn btn-icon btn-transparent-dark dropdown-toggle"
              id="navbarDropdownUserImage"
              href="javascript:void(0);"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              title="Profile"
            >
              <img
                :src="`${imgURL}/${user.image ?  user.image : '/assets/images/avator.png'}`"
                class="dropdown-user-img img-full"
                alt="profile_img"
              />
            </a>
            <div
              class="
                dropdown-menu dropdown-menu-right
                border-0
                shadow
                animated--fade-in-up
              "
              aria-labelledby="navbarDropdownUserImage"
            >
              <h6 class="dropdown-header d-flex align-items-center">
                <img
                  :src="`${imgURL}/${user.image}`"
                  class="dropdown-user-img img-full"
                  alt="profile_img"
                />
                <div class="dropdown-user-details">
                  <div class="dropdown-user-details-name">
                    {{ userInfo.username }}
                  </div>
                  <div class="dropdown-user-details-email">
                    {{ userInfo.email }}
                  </div>
                </div>
              </h6>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/buyer-account">
                <div class="dropdown-item-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-settings"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path
                      d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                    ></path>
                  </svg>
                </div>
                Account
              </router-link>

              <div class="d-sm-none">
                <router-link class="dropdown-item" to="/buyer/jobs">
                  <i
                    class="fa fa-briefcase mr-2 text-muted"
                    aria-hidden="true"
                  ></i>
                  Manage Job
                </router-link>
              </div>
              <div class="d-sm-none">
                <router-link class="dropdown-item" to="/buyer/manage_order">
                  <i
                    class="fa fa-first-order text-muted mr-2"
                    aria-hidden="true"
                  ></i>
                  Manage Order
                </router-link>
              </div>
              <div v-if="!isBuyerMode" :disabled="userInfo.isFreelancer">
                <div class="d-sm-none">
                  <router-link
                    class="dropdown-item"
                    to="/seller/manage_service"
                  >
                    <i
                      class="fa fa-cogs text-muted mr-2"
                      aria-hidden="true"
                    ></i>
                    Manage services
                  </router-link>
                </div>
                <div class="d-sm-none">
                  <router-link
                    class="dropdown-item"
                    to="/seller/buyer_requests"
                  >
                    <i
                      class="fa fa-cart-arrow-down text-muted mr-2"
                      aria-hidden="true"
                    ></i>
                    Buyer Requests
                  </router-link>
                </div>
              </div>

              <button class="dropdown-item" @click="handleLogout">
                <div class="dropdown-item-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </div>
                Logout
              </button>
            </div>
          </li>
        </ul>

        <!-- Before Login Nav Start -->
        <ul class="navbar-nav align-items-center ml-auto" v-else>
          <!-- @else -->
          <!-- login Button -->
          <li class="nav-item dropdown no-arrow no-caret dropdown-user m-2">
            <router-link class="btn btn-success" to="/login">Login</router-link>
          </li>

          <!-- Signup Button -->
          <li class="nav-item dropdown no-arrow no-caret dropdown-user">
            <router-link class="btn btn-success" to="/register"
              >Register</router-link
            >
          </li>
          <!-- @endif -->
        </ul>
        <!-- Before Login Nav End -->
      </ul>
    </div>
  </nav>
</template>

<script>
import Api from "@/services/API";
import {  useRouter } from "vue-router";
import { computed, onMounted, ref } from "@vue/runtime-core";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const keywords = ref(null);

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
      const isLoggedIn = localStorage.getItem("PROELEAN_TOKEN");
      if (isLoggedIn) {
        store.dispatch("getNotification");
      }
      // tooltip
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new window.bootstrap.Tooltip(tooltipTriggerEl);
      });
    });

    const handleSearch = () => {
      let url = keywords.value ? `/gigs/${slugify(keywords.value)}` : "/gigs";
      router.push(url);
      keywords.value = "";
    };

    const handleUserMode = () => {
      store.commit("toggleUserMode");
      if (isBuyerMode.value) {
        router.push({name: 'Home'});
      } else {
        router.push({name: 'sellerDashboard'});
      }
    };

    // /* Encode string to slug */
    /* eslint-disable */
    function slugify(text) {
      return text
        .toString()
        .normalize("NFKD")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-");
    }

    return {
      handleLogout,
      handleSearch,
      keywords,
      userInfo: computed(() => store.getters.getAuthUser),
      userNotification: computed(() => store.getters.getRecentNotifications),
      user: computed(() => store.getters.getAuthUser),
      imgURL: process.env.VUE_APP_URL,
      handleUserMode,
      isBuyerMode,
    };
  },
};
</script>

<style lang="scss" scoped>

.mobile-p-0{
  @media screen and (max-width:568px) {
    padding: 0;
  }
}

</style>

