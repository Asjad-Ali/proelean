<template>
  <h1 class="app-page-title">Add Bank Account</h1>
  <hr class="mb-4" />
  <div class="row g-4 settings-section">
    <div class="col-12 col-md-4">
      <h3 class="section-title">General</h3>
      <div class="section-intro">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure maiores
        ea vel eveniet dolore aut harum molestias ipsum ratione recusandae!
      </div>
    </div>
    <div class="col-12 col-md-8">
      <div class="app-card app-card-settings shadow-sm p-4">
        <div class="app-card-body">
          <form class="settings-form">
            <div class="mb-3">
              <label for="setting-input-1" class="form-label"
                >Account Name
              </label>
              <input
                type="text"
                class="form-control"
                id="setting-input-1"
                placeholder="Enter your account name"
                required=""
              />
            </div>
            <div class="mb-3">
              <label for="setting-input-1" class="form-label"
                >IBAN Number
              </label>
              <input
                type="number"
                class="form-control"
                id="setting-input-1"
                placeholder="12345678901234"
                required=""
              />
            </div>

            <div class="form-group mb-3">
              <label for="setting-input-2" class="form-label"
                >Bank Name<span class="text-danger m-0 p-0">*</span
                ><span
                  class="text-danger mt-1"
                  style="display: none"
                ></span></label
              ><select
                id="category"
                class="form-control"
                name="category_id"
                placeholder="Select Category"
                data-msg="Please select category."
                required=""
              >
                <option disabled="" value="">Select Bank Account</option>
                <option value="cU1VOWVkQVVpVElJdll4eThYOXpBZz09">
                  Meezan Bank
                </option>
                <option value="d3JkUHdCcEZRMGdseTBvNXFOVXNGUT09">UBL</option>
              </select>
            </div>
            <button type="submit" class="btn app-btn-primary">
              Save Changes
            </button>
          </form>
        </div>
        <!--//app-card-body-->
      </div>
      <!--//app-card-->
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>