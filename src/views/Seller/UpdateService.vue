<template>
  <div class="container-xl" v-if="updateGig">
    <h1 class="app-page-title mb-2">Update Services</h1>
    <div class="border-bottom mb-3"></div>
    <div class="row g-4 settings-section">
      <div class="col-12 col-md-12">
        <div class="app-card app-card-settings shadow-sm p-4">
          <div class="app-card-body">
            <form class="settings-form">
              <div class="mb-3">
                <label for="setting-input-1" class="form-label"
                  >Enter Your Title
                  <span
                    class="ms-2"
                    data-container="body"
                    data-bs-toggle="popover"
                    data-trigger="hover"
                    data-placement="top"
                    data-content="This is a Bootstrap popover example. You can use popover to provide extra info."
                  ></span>
                </label>
                <input
                  type="text"
                  v-model="updateGig.s_description"
                  name="s_description"
                  class="form-control"
                  placeholder="I will create"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="setting-input-2" class="form-label"
                  >Describe Your services</label
                >
                <div class="form-group">
                  <textarea
                    class="form-control"
                    v-model="updateGig.description"
                    name="description"
                    rows="7"
                    placeholder="Describe About Your Serivce"
                    required
                  ></textarea>
                </div>
              </div>

              <div class="mb-3 d-flex flex-start">
                <div class="wrapper">
                  <div
                    class="file-upload mr-2"
                    @click="$refs.bannerInput.click()"
                  >
                    <i class="fa fa-arrow-up cursor-pointer"></i>
                    <input
                      type="file"
                      multiple
                      ref="bannerInput"
                      id="bannerInput"
                      style="display: none"
                      @change="selectThumbnail"
                      required
                    />
                  </div>
                  <div
                    v-for="(banner, index) in updateGig.service_media"
                    :key="index"
                  >
                    <div
                      class="cursor-pointer position-relative"
                      style="
                        height: 90px;
                        width: 90px;
                        border: 1px solid grey;
                        margin-left: 10px;
                        background-size: cover;
                      "
                      :style="`background-image: url(${banner.media ? `${imgURL}/${banner.media}` : banner};`"
                    >
                      <i
                        v-show="getBanners.length"
                        @click="removeOldImage(index, banner)"
                        class="mdi mdi-close-box position-absolute"
                        style="top: 1%; right: 1%; font-size: 16px; color: red"
                      ></i>
                    </div>
                  </div>
                  <div v-for="(banner, index) in bannersBase64" :key="index">
                    <div
                      class="cursor-pointer position-relative"
                      style="
                        height: 90px;
                        width: 90px;
                        border: 1px solid grey;
                        margin-left: 20px;
                        background-size: cover;
                      "
                      :style="`background-image: url(${banner});`"
                    >
                      <i
                        v-show="getBanners.length > 1"
                        @click="removeNewImage(index)"
                        class="mdi mdi-close-box position-absolute"
                        style="top: 1%; right: 1%; font-size: 16px; color: red"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="setting-input-2" class="form-label"
                      >Choose a category</label
                    >
                    <select
                      id="category"
                      class="form-control"
                      name="category_id"
                      data-msg="Please select category."
                      :onchange="getCategory"
                      required
                    >
                      <option
                        v-for="category in $store.getters.getCategories"
                        :value="category.id"
                        :key="category.id"
                        :selected="category.id == updateGig.category_id"
                      >
                        {{ category.title }}
                      </option>
                    </select>
                  </div>

                  <div class="form-group col-md-6">
                    <label for="setting-input-2" class="form-label"
                      >Choose subcategory</label
                    >
                    <select
                      id="subCategory"
                      class="form-control"
                      name="category_id"
                      required
                    >
                      <option disabled>Select Sub Category</option>
                      <option
                        v-for="subCategory in $store.getters.getSubCategories"
                        :value="subCategory.id"
                        :selected="subCategory.id == updateGig.sub_category_id"
                        :key="subCategory.id"
                      >
                        {{ subCategory.title }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="mb-3">
                <div class="row">
                  <div class="form-group col-md-6">
                    <label for="setting-input-2" class="form-label"
                      >Delivery Time</label
                    >
                    <select
                      id="deliveryTime"
                      class="form-control"
                      name="delivery_time"
                      required
                    >
                      <option disabled>Select day</option>
                      <option
                        v-for="day in $store.getters.getDeliveryDays"
                        :value="day"
                        :selected="day == updateGig.delivery_time"
                        :key="day.index"
                      >
                        {{ day }}
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="setting-input-2" class="form-label"
                      >What is your budget for this service?</label
                    >
                    <div class="input-group">
                      <div
                        class="input-group-prepend d-flex align-items-center"
                      >
                        <div class="btn app-btn-secondary">$</div>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        name="price"
                        v-model="updateGig.price"
                        id="inlineFormInputGroup"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                :disabled="registerStatus === 2"
                class="btn app-btn-primary"
                @click.prevent="updateService"
              >
                {{ registerStatus == 2 ? "Loading..." : "Update" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useUpdateService from "@/composables/useSeller/useUpdateService";
import { computed, onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const {
      data,
      updateService,
      selectThumbnail,
      bannersBase64,
      removeNewImage,
      removeOldImage,
      updateGig,
      getCategory,
      getBanners,
    } = useUpdateService();

    const payload = {
      id: route.params.id,
      type: "ONUPDATE",
    };

    onMounted(() => {
      store.dispatch("userSingleService", payload);
      store.dispatch("getCountriesLanguage");
    });

    return {
      registerStatus: computed(() => store.getters.getRegisterStatus),
      imgURL: process.env.VUE_APP_URL,
      updateGig,
      getCategory,
      data,
      updateService,
      selectThumbnail,
      bannersBase64,
      removeNewImage,
      removeOldImage,
      getBanners,
    };
  },
};
</script>

<style>
.wrapper {
  width: 100%;
  background: #fafbff;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: start;
}
.wrapper .file-upload {
  height: 100px;
  width: 100px;
  border-radius: 100px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 4px solid #fff;
  overflow: hidden;
  background-image: linear-gradient(to bottom, #2590eb 50%, #fff 50%);
  background-size: 100% 200%;
  transition: all 1s;
  color: #fff;
  font-size: 100px;
}
.wrapper .file-upload input[type="file"] {
  height: 200px;
  width: 200px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
}
.wrapper .file-upload:hover {
  background-position: 0 -100%;
  color: #2590eb;
}
</style>