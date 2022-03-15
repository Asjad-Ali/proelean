<template>
  <div class="container-xl mb-3">
    <h4 >My Account</h4>
    <div class="border-bottom mb-3"></div>
    <div class="row gy-4 d-flex justify-content-center">
      <div class="col-12 col-lg-6">
        <div
          class="
            app-card app-card-account
            shadow-sm
            d-flex
            flex-column
            align-items-start
          "
        >
          <div class="app-card-body p-4 w-100 text-center">
            <div class="align-items-center ">
              <div>
              </div>
              <!--//col-->
              <div class="col-auto">
                <h3 class="app-card-title">Change Password</h3>
              </div>
              <!--//col-->
            </div>
            <!--//row-->
          </div>

          <!--//app-card-header-->
          <div class="app-card-body px-4 w-100">
            <div class="item border-bottom">
              <div class="row justify-content-center">
                <div class="col-auto">
                  <!-- <div class="item-label mb-2"><strong>Photo</strong></div> -->
                  <div class="item-data position-relative mb-3 cursor-pointer" @click="$refs.profileInput.click">
                    <img 
                      :src="`${imgURL}/${user.image ?  user.image : '/assets/images/avator.png'}`"
                      class="profile-image dropdown-user-img img-full rounded-circle"
                      alt="profile_img"
                    />
                  </div>
                </div>
                <!--//col-->
                <!--//col-->
              </div>
              <!--//row-->
            </div>
            <!--//item-->
            <div class="row">
              <div  class="item py-2 col-12">
                    <div>
                      <div class="item-label mb-2"><strong>Current Password</strong></div>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="changePassword.current_password"
                            placeholder="Enter your name"
                            required
                          />
                    </div>
                    <!--//col-->
                <!--//row-->
                </div>
                <div  class="item py-2 col-12">
                    <div>
                      <div class="item-label mb-2"><strong>New Password</strong></div>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            v-model="changePassword.password"
                            placeholder="Enter your name"
                            required
                          />
                    </div>
                    <!--//col-->
                <!--//row-->
                </div>
                <!--//item-->
                <div class="item py-2 col-12">
                      <div>
                        <div class="item-label mb-2"><strong>Confirm Password</strong></div>
                            <input
                              type="password"
                              class="form-control"
                              id="confirm-password"
                              v-model="changePassword.password_confirmation"
                              placeholder="Enter your name"
                              required
                            />
                      </div>
                  <!--//row-->
                </div>
            </div>
          </div>
          <!--//app-card-body-->
          <div class="app-card-footer p-4 mt-auto ">
            <a class="btn app-btn-secondary mr-2" @click="updatePassword">{{ btnStatus === 2 ? 'Loading...' : 'Update Password' }}</a>
            <router-link class="btn app-btn-secondary" to="/dashboard">Back</router-link>
          </div>
          <!--//app-card-footer-->
        </div>
        <!--//app-card-->
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, ref } from '@vue/runtime-core';
export default {
  setup(){
    const store = useStore()
    const changePassword = ref({
      current_password: '',
      password:'',
      password_confirmation:''
    })

    const updatePassword = () => {
      store.dispatch('updatePassword',changePassword.value);
      console.log("Change Password Value",changePassword.value)
    }

    return{
      changePassword,
      updatePassword,
      imgURL: process.env.VUE_APP_URL,
      user: computed(() => store.getters.getAuthUser),
      btnStatus: computed(() => store.getters.getRegisterStatus)
    }
  }
};
</script>

<style>

</style>