<template>
  <div class="container-xl">
    <h1 class="app-page-title">Create Services</h1>
    <hr class="mb-4" />
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
                    ><svg
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                      class="bi bi-info-circle"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
                      />
                      <path
                        d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588z"
                      />
                      <circle cx="8" cy="4.5" r="1" /></svg></span
                ></label>
                <input
                  type="text"
                  class="form-control"
                  id="setting-input-1"
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
                    name="description"
                    rows="7"
                    placeholder="Describe About Your Serivce"
                    required=""
                    spellcheck="false"
                  ></textarea>
                </div>
              </div>
              <div class="mb-3">
                <div class="wrapper">
                  <div class="file-upload">
                    <input type="file" />
                    <i class="fa fa-arrow-up"></i>
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
                      placeholder="Select Category"
                      data-msg="Please select category."
                      required=""
                    >
                      <option disabled="" value="">Select category</option>
                      <option value="cU1VOWVkQVVpVElJdll4eThYOXpBZz09">
                        Graphic &amp; Design
                      </option>
                      <option value="d3JkUHdCcEZRMGdseTBvNXFOVXNGUT09">
                        Digital Marketing
                      </option>
                      <option value="S2ZRcEpwa2FBZkV6UnpUV0xUYlAvQT09">
                        Writing &amp; Translation
                      </option>
                      <option value="czlPZ2tiNVpDSHJRdWo4dGtqWUJodz09">
                        Video &amp; Animation
                      </option>
                      <option value="WE96NU9EZTlZc3VrdGtEZFZqRDB1dz09">
                        Music &amp; Audio
                      </option>
                      <option value="K0N2WTlQN3dkbE9rTE40cDdzZVZqQT09">
                        Programming &amp; Tech
                      </option>
                      <option value="L25HN2crTFhRd2hqQzRDU2hGdGNSdz09">
                        Data
                      </option>
                      <option value="SytDL1pNdmpKVG84VENnZ3RBYnZ6UT09">
                        Bussiness
                      </option>
                      <option value="WFpGRnJhMGNWcmNrMjRwRjR6SFByZz09">
                        Lifestyle
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
                      required=""
                    >
                      <option disabled="" value="">Select Sub Category</option>
                      <option value="czlPZ2tiNVpDSHJRdWo4dGtqWUJodz09">
                        Video &amp; Animation
                      </option>
                      <option value="WE96NU9EZTlZc3VrdGtEZFZqRDB1dz09">
                        Music &amp; Audio
                      </option>
                      <option value="K0N2WTlQN3dkbE9rTE40cDdzZVZqQT09">
                        Programming &amp; Tech
                      </option>
                      <option value="L25HN2crTFhRd2hqQzRDU2hGdGNSdz09">
                        Data
                      </option>
                      <option value="SytDL1pNdmpKVG84VENnZ3RBYnZ6UT09">
                        Bussiness
                      </option>
                      <option value="WFpGRnJhMGNWcmNrMjRwRjR6SFByZz09">
                        Lifestyle
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
                      id="category"
                      class="form-control"
                      name="category_id"
                      placeholder="Select Category"
                      data-msg="Please select category."
                      required=""
                    >
                      <option disabled="" value="">Select Days</option>
                      <option value="cU1VOWVkQVVpVElJdll4eThYOXpBZz09">
                        Graphic &amp; Design
                      </option>
                      <option value="d3JkUHdCcEZRMGdseTBvNXFOVXNGUT09">
                        Digital Marketing
                      </option>
                      <option value="S2ZRcEpwa2FBZkV6UnpUV0xUYlAvQT09">
                        Writing &amp; Translation
                      </option>
                      <option value="czlPZ2tiNVpDSHJRdWo4dGtqWUJodz09">
                        Video &amp; Animation
                      </option>
                      <option value="WE96NU9EZTlZc3VrdGtEZFZqRDB1dz09">
                        Music &amp; Audio
                      </option>
                      <option value="K0N2WTlQN3dkbE9rTE40cDdzZVZqQT09">
                        Programming &amp; Tech
                      </option>
                      <option value="L25HN2crTFhRd2hqQzRDU2hGdGNSdz09">
                        Data
                      </option>
                      <option value="SytDL1pNdmpKVG84VENnZ3RBYnZ6UT09">
                        Bussiness
                      </option>
                      <option value="WFpGRnJhMGNWcmNrMjRwRjR6SFByZz09">
                        Lifestyle
                      </option>
                    </select>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="setting-input-2" class="form-label"
                      >Choose subcategory</label
                    >
                    <div class="input-group">
                      <div class="input-group-prepend d-flex align-items-center">
                        <div class="btn app-btn-secondary">$</div>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        name="price"
                        id="inlineFormInputGroup"
                        required=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn app-btn-primary">
                Create
              </button>
            </form>
          </div>
          <!--//app-card-body-->
        </div>
        <!--//app-card-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
};
</script>

<style scoped>
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
.svg-inline--fa {
  height: 80px;
}
</style>