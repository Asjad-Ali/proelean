<template>
  <div>
    <section class="py-5 ">
      <div class="container ">
        <div class="row d-flex justify-content-center">
          <div class="col-lg-9">
            <h4 class="font-weight-bold pb-3">Create Serivce</h4>
            <form>
              <div class="bg-white rounded shadow-sm sidebar-page-right">
                <div class="bg-white rounded p-0">
                  <div class="border-bottom p-3">
                    <label>Enter Your Title</label>
                    <!-- @error('s_description')
                           <span style="color:red">{{$message}}</span>
                           @enderror -->
                    <div class="form-group">
                      <input
                        type="text"
                        v-model="createGig.s_description"
                        name="s_description"
                        class="form-control"
                        placeholder="I will create"
                        required
                      />
                    </div>
                    <label>Describe your service</label>
                    <!-- @error('description')
                              <span style="color:red">{{$message}}</span>
                              @enderror -->
                    <div class="form-group">
                      <textarea
                        class="form-control"
                        v-model="createGig.description"
                        name="description"
                        rows="7"
                        placeholder="Describe About Your Serivce"
                        required
                      ></textarea>
                    </div>

                    <div class="d-flex">
                      <div
                        class="
                          cursor-pointer
                          d-flex
                          justify-content-center
                          align-items-center
                        "
                        @click="$refs.bannerInput.click()"
                        style="
                          height: 80px;
                          width: 80px;
                          border: 1px solid grey;
                        "
                      >
                        <i
                          style="font-size: 32px"
                          class="fa fa-file-image-o"
                        ></i>

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
                        v-for="(banner, index) in bannersBase64"
                        :key="index"
                      >
                        <div
                          class="
                            cursor-pointer
                            position-relative
                          "
                          style="
                            height: 80px;
                            width: 80px;
                            border: 1px solid grey;
                            margin-left:20px;
                            background-size:cover;
                          "
                          :style="`background-image: url(${banner});`"
                        >
                          <i @click="removeImage(index)" class="fa fa-close position-absolute" style="top:1%; right:1%; font-size:16px; color:red"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom p-3">
                    <label>Choose a category:</label>
                    <div class="row">
                      <div class="form-group col-md-6">
                        <select
                          id="category"
                          class="form-control"
                          name="category_id"
                          v-model="createGig.category_id"
                          data-msg="Please select category."
                          :onchange="onChange"
                          required
                        >
                          <option
                            v-for="category in $store.getters.getCategories"
                            :value="category.id"
                            :key="category.id"
                          >
                            {{ category.title }}
                          </option>

                          <!-- @foreach ($categories as $category)
                                       <option value="{{$category->id}}">{{$categorytitle}}</option>                                       
                                    @endforeach -->
                        </select>
                      </div>
                      <div class="form-group col-md-6">
                        <select
                          id="category_id"
                          class="form-control"
                          name="category_id"
                          v-model="createGig.sub_category_id"
                          required
                        >
                          <option value="SubCatSelect1" selected disabled>
                            Select Sub Category
                          </option>
                          <option
                            v-for="subCategory in $store.getters.getSubCategories"
                            :value="subCategory.id"
                            :key="subCategory.id"
                          >
                            {{ subCategory.title }}
                          </option>

                          <!-- @foreach ($categories as $category)
                                       <option value="{{$category->id}}">{{$categorytitle}}</option>                                       
                                    @endforeach -->
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="border-bottom p-3">
                    <label>Delivery Time</label>
                    <div class="form-group col-md-6">
                      <select
                        id="inputState"
                        class="form-control"
                        name="delivery_time"
                        v-model="createGig.delivery_time"
                        required
                      >
                        <option selected disabled>Select day</option>
                        <option value="2" v-for="day in 30" :key="day.index"
                        >{{ day }} day</option>

                        <!-- @foreach($days as $day)
                                    <option>{{$day->days}}</option>                                    
                                    @endforeach -->
                      </select>
                    </div>
                  </div>
                  <div class="border-bottom p-3">
                    <label>What is your budget for this service?</label>
                    <div class="input-group mb-2 col-md-4 p-0">
                      <div class="input-group-prepend">
                        <div class="btn btn-success">$</div>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        name="price"
                        v-model="createGig.price"
                        id="inlineFormInputGroup"
                        required
                      />
                    </div>
                  </div>
                  <div class="p-3 d-flex justify-content-end">
                    <button
                      class="btn btn-success btn-lg font-weight-bold"
                      @click.prevent="gigCreation"
                    >
                      {{registerStatus == 2 ? 'Loading...' : 'Create'}}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import useSeller from '@/composables/useSeller.js'
import { computed } from '@vue/runtime-core';
import store from '../../store';
export default {
  setup() {
const { createGig,
        data,
        bannersBase64,
        gigCreation,
        selectThumbnail,
        removeImage,
        onChange,
        encodeImageFileAsURL } = useSeller();

    return {
      registerStatus: computed(() => store.getters.getRegisterStatus),
      createGig,
      onChange,
      data,
      gigCreation,
      selectThumbnail,
      bannersBase64,
      removeImage,
      encodeImageFileAsURL
    };  },
};
</script>

<style>
</style>