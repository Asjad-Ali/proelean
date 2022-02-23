<template>
  <div class="bg-white">
    <div class="container">
      <div class="row justify-content-center align-items-center d-flex vh-100">
        <div class="col-lg-4 mx-auto">
          <div class="osahan-login py-4">
            <div class="text-center mb-4">
              <a href="index.html"
                ><img src="/assets/images/Pro-eLean-.png" alt=""
              /></a>
              <p class="text-muted">
                Don't miss your next opportunity. Sign in to stay updated on
                your professional world.
              </p>
            </div>
            <form id="login">
              <div class="form-group mb-3">
                <label class="mb-1">Email</label>

                <div class="position-relative icon-form-control">
                  <input
                    type="email"
                    :class="[{ 'border-danger': forgotErrors.email },{'border-success': !forgotErrors.email}]"
                    class="form-control border-10 shadow-none position-relative"
                    name="email"
                    v-model="forgot.email"
                    :readonly="passwordSectionVisibility"
                    required
                  />
                  <i
                    class="mdi mdi-account position-absolute"
                    style="left: 0"
                  ></i>
                </div>
                <div class="text-danger mt-1" v-show="forgotErrors.email">
                  {{ forgotErrors.email }}
                </div>
              </div>


              <div v-show="passwordSectionVisibility">
                <div class="form-group">
                <label class="mb-1">Token</label>
                <div class="position-relative icon-form-control">
                  <input
                    ref="tokenRef"
                    type="number"
                    class="form-control userForm position-relative"
                    :class="[{ 'border-danger ': forgotErrors.token },{'border-success': !forgotErrors.password}]"
                    v-model="forgot.token"
                  />
                  <i class="mdi mdi-onepassword position-absolute" style="left:0"></i>
                </div>
                
                  <div class="text-danger mt-1" v-show="forgotErrors.token">
                     {{ forgotErrors.token }}
                  </div>
              </div>

                <div>
                <label class="mb-1">Password (6 or more characters)</label>
                <div class="position-relative icon-form-control">
                  <input
                    ref="passwordRef"
                    type="password"
                    class="form-control userForm position-relative"
                    :class="[{ 'border-danger ': forgotErrors.password },{'border-success': !forgotErrors.password}]"
                    v-model="forgot.password"
                  />
                  <i class="mdi mdi-lock position-absolute" style="left:0"></i>
                  <i @click="toggleVisibility"  class="mdi position-absolute cursor-pointer" 
                     :class="`${eyeIcon}`" style="right:0"></i>
                </div>
                  <div class="text-danger mt-1" v-show="forgotErrors.password">
                     {{ forgotErrors.password }}
                  </div>
              </div>

              <div>
                <label class="mb-1">Confirm Password</label>
                <div class="position-relative icon-form-control">
                  <i class="mdi mdi-key-variant position-absolute"></i>
                  <input
                    ref="passwordConRef"
                    type="password"
                    :class="[{ 'border-danger ': forgotErrors.confirmation_password },{'border-success': !forgotErrors.confirmation_password}]"
                    class="form-control userForm position-relative"
                    v-model="forgot.confirmation_password"
                  />
                  <i class="mdi mdi-lock position-absolute" style="left:0"></i>
                  <i @click="toggleVisSignupConPass"  class="mdi position-absolute cursor-pointer" 
                     :class="`${eyeIcon2}`" style="right:0"></i>                  
                </div>
                  <div class="text-danger mt-1" v-show="forgotErrors.confirmation_password">
                     {{ forgotErrors.confirmation_password }}
                  </div>
              </div>

              </div>

              <div class="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  name="remember"
                  id="customCheck1"
                />
                <label class="custom-control-label" for="customCheck1"
                  >Remember password</label
                >
              </div>

              <!-- errors bag -->
              <button
              v-if="!passwordSectionVisibility"
                type="button"
                class="btn btn-success btn-block text-uppercase"
                id="loginBtn"
                :disabled="forgotErrors.email || registerStatus == 2 || forgot.email === ''"
                @click.prevent="forgotPassword(forgot.email)"
                >                
                {{registerStatus == 2 ? ' Loading...' : ' forgot'}}
              </button>
              <button
                v-else
                type="button"
                class="btn btn-success btn-block text-uppercase"
                id="loginBtn"
                :disabled="forgotErrors.email || registerStatus == 2 || forgot.email === ''"
                @click.prevent="forgotPassword(forgot.email)"
                >                
                {{registerStatus == 2 ? ' Loading...' : ' Set Password'}}
              </button>
              <div class="text-center mt-3 border-bottom pb-3">
                <p class="small text-muted">Or login with</p>
                <div class="row">
                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-outline-instagram btn-block"
                    >
                      <i class="mdi mdi-instagram"></i> Instagram
                    </button>
                  </div>
                  <div class="col-6">
                    <button
                      type="button"
                      class="btn btn-outline-facebook btn-block"
                    >
                      <i class="mdi mdi-facebook"></i> Facebook
                    </button>
                  </div>
                </div>
              </div>
              <div class="py-3 d-flex align-item-center">
                <router-link to="/login">Login</router-link>
                <span class="ml-auto">
                  New to Proelean?
                  <router-link to="/register">Join now</router-link></span
                >
              </div>
            </form>
          </div>

        
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useAuth from "@/composables/useAuth";
import { computed } from "vue";
import { useStore } from 'vuex';

export default {
  name: "Login",
  setup() {
    const store = useStore()
    const {
      toggleVisibility,
      eyeIcon,
      eyeIcon2,
      passwordRef,
      loginErrors,
      forgotErrors,
      toggleVisSignupConPass,
      forgot,
      login,
      loginLoading,
    } = useAuth();


    const forgotPassword = async (email) => {
      store.dispatch('forgot',email)
   }


    return {
      registerStatus: computed(() => store.getters.getRegisterStatus),
      passwordSectionVisibility: computed(() => store.getters.getPasswordSection),
      login,
      forgotPassword,
      loginLoading,
      loginErrors,
      toggleVisSignupConPass,
      passwordRef,
      forgotErrors,
      forgot,
      eyeIcon,
      eyeIcon2,
      toggleVisibility,
    };
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>
