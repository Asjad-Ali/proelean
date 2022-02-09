<template>
  <div class="main-page second py-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="d-flex align-items-center mb-3 pb-3 border-bottom">
            <h2 class="mb-0 p-0">Jobs</h2>
            <router-link
              class="btn btn-sm btn-success ml-auto light"
              to="/create_job"
            >
              Create a new job
            </router-link>
          </div>

          <div
            class="
              tab-content
              osahan-table
              bg-white
              rounded
              shadow-sm
              px-3
              pt-1
            "
          >
            <div class="tab-pane active" id="active">
              <div class="table-responsive box-table mt-3">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>JOB DESCRIPTION</th>
                      <th>POSTED DATE</th>
                      <th>DURATION</th>
                      <th>BUDGET</th>
                      <th>OFFERS</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="job in jobs" :key="job.id">
                      <td>
                        <a href="#" class="make-black">
                          <p class="order-proposal-title">
                            {{ job.description }}
                          </p>
                        </a>
                      </td>
                      <td>{{ job.created_at }}</td>
                      <td>{{ job.delivery_time }} days</td>
                      <td>${{ job.budget }}</td>
                      <td>
                        <button class="btn btn-sm btn-primary">
                          {{ job.total_offers }}
                        </button>
                      </td>
                      <td>
                        <button
                          class="btn btn-sm btn-danger"
                          @click="deleteJob(job.id)"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "@vue/runtime-core";
import store from "../../store";
export default {
  setup() {
    onMounted(store.dispatch("showAllJobs"));
    function deleteJob(id) {
      store.dispatch("deleteAJob", id);
    }
    return {
      jobs: computed(() => store.getters.getAllJobs),
      deleteJob,
    };
  },
};
</script>

<style>
</style>