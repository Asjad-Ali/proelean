<template>
<div class="py-5">
    <div class="container">
    <div class="row">
        <main class="col-md-8">
            <form>
                <div class="shadow-sm rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                    <h6 class="m-0">Edit Basic Info</h6>
                    <p class="mb-0 mt-0 small">Lorem ipsum dolor sit amet, consecteturs.
                    </p>
                    </div>
                    <div class="box-body p-3">
                        <div class="row">
                            <div class="col-sm-6 mb-2">
                                <div class="js-form-message">
                                <label id="titleLabel" class="form-label">
                                Freelancer Title
                                <span class="text-danger">*</span>
                                </label>
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Enter your freelancer title"
                                         aria-label="Enter your freelancer title" aria-describedby="titleLabel"
                                          data-msg="Please enter a valid title." data-error-class="u-has-error"
                                           data-success-class="u-has-success" v-model="user.freelancer_title"
                                    >
                                </div>
                                </div>
                            </div>                              
                            <!-- End Input -->
                        </div>
                        
                        <div class="row">
                            <div class="col-sm-6 mb-2">
                                <div class="js-form-message">
                                <label class="form-label">
                                Preferred language
                                <span class="text-danger">*</span>
                                </label>
                                <div class="form-group">
                                    <select class="custom-select w-100" name="lang">
                                        <option selected>Select language</option>
                                        <!-- @foreach ($languages as $language)
                                            <option value="{{$language->language}}">{{$language->language}}</option>
                                        @endforeach -->
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div class="col-sm-6 mb-2">
                                <div class="js-form-message">
                                <label class="form-label">
                                Availability
                                <span class="text-danger">*</span>
                                </label>
                                <div class="form-group">
                                    <select class="custom-select" name="availability">
                                        <option selected>Select availability</option>
                                            <option value="full_time">Full Time</option>
                                            <option value="part_time">Part Time</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                        </div>
                            <!-- End Input -->
                            <div class="row">
                            <div class="col-sm-6 mb-2">
                                <div class="js-form-message">
                                <label id="websiteLabel" class="form-label">
                                Website
                                <span class="text-danger">*</span>
                                </label>
                                <div class="form-group">
                                    <input class="form-control" type="url" name="portfolio" placeholder="Enter your website"
                                         aria-label="Enter your website"  aria-describedby="websiteLabel"
                                          data-msg="Password enter a valid website" data-error-class="u-has-error"
                                           data-success-class="u-has-success" v-model="user.portfolio"
                                    >
                                </div>
                                </div>
                            </div>
                            <!-- End Input -->
                        </div>
                    </div>
                </div>
                <div class="shadow-sm rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                    <h6 class="m-0">About</h6>
                    <p class="mb-0 mt-0 small">Tell about yourself in two sentences.</p>
                    </div>
                    <div class="box-body">
                    <div class="p-3">
                        <div class="form-group mb-4">
                            <label class="mb-1">BIO</label>
                            <div class="position-relative">
                                <textarea class="form-control" rows="4" name="description" min="15" placeholder="Enter Bio" v-model="user.description"></textarea>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="shadow-sm rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                        <h6 class="m-0">Category
                        </h6>
                        <p class="mb-0 mt-0 small">Tell about your work, job, and other experiences.
                        </p>
                    </div>
                    <div class="box-body px-3 pt-3 pb-0">
                    <div class="row">
                    <div class="col-sm-6 mb-2">
                        <div class="js-form-message">
                            <label class="form-label">
                            Category
                            <span class="text-danger">*</span>
                            </label>
                            <div class="form-group">
                                <select class="form-control custom-select" data-msg="Please select your gender." data-error-class="u-has-error" data-success-class="u-has-success" 
                                    :disabled="loading"
                                    @change="getSubCategories($event)"
                                    v-model="user.category_id">
                                    <option v-for="category in $store.getters.getCategories" 
                                        :value="category.id" 
                                        :key="category.id"
                                        >
                                        {{ category.title }}
                                    </option>                                                      
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-6 mb-2">
                        <div class="js-form-message">
                            <label class="form-label">
                            Sub Category
                            <span class="text-danger">*</span>
                            </label>
                            <div class="form-group">
                                <select class="form-control custom-select"  data-msg="Please select your gender." data-error-class="u-has-error" data-success-class="u-has-success"
                                :disabled="subCatLoader">
                                    <option value="SubCatSelect1" selected="">Select Sub Category</option>
                                    <option v-for="subCategory in subCategories" 
                                        :value="subCategory.id" 
                                        :key="subCategory.id"
                                        >
                                        {{ subCategory.title }}
                                    </option>                                                      
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

                <div class="shadow-sm rounded bg-white mb-3">
                    <div class="box-title border-bottom p-3">
                    <h6 class="m-0">Social profiles</h6>
                    <p class="mb-0 mt-0 small">Add elsewhere links to your profile.</p>
                    </div>
                    <div class="box-body">
                    <div class="p-3">
                        <div class="position-relative icon-form-control mb-2">
                            <i class="mdi mdi-instagram position-absolute text-muted"></i>
                            <input placeholder="Add Instagram link"  type="text" name="instagram" class="form-control">
                        </div>
                        <div class="position-relative icon-form-control mb-2">
                            <i class="mdi mdi-facebook position-absolute text-muted"></i>
                            <input placeholder="Add Facebook link" type="text" name="facebook" class="form-control">
                        </div>
                        <div class="position-relative icon-form-control mb-2">
                            <i class="mdi mdi-twitter position-absolute text-muted"></i>
                            <input placeholder="Add Twitter link" type="text" name="twitter" class="form-control">
                        </div>
                    </div>
                    </div>
                </div>

                <div class="mb-3 text-right">
                    <button type="submit" class="btn btn-outline-success">Cancel</button>
                    <button type="submit" class="btn btn-success" @click="handleBecomeFreelancer">Submit</button>
                </div>
            </form>
        </main>
    </div>
    </div>
</div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity';
import  Api  from '@/services/API'

export default {

    setup(){
        var subCategories=ref([]);
        let subCatLoader=ref(false);

        const user=reactive({
            category_id:'',
            portfolio:'',
            freelancer_title:'',
            description:''
        });

        const getSubCategories=(event)=>{
            subCatLoader.value=true;
            return Api.get(`subcategories/${event.target.value}`).then(res=>{
                subCategories.value=res.data;
                subCatLoader.value=false;
            })

        }

        const handleBecomeFreelancer = ()=>{
            alert(JSON.stringify(user));            
        }

        return {
            user,
            handleBecomeFreelancer,
            subCategories,
            getSubCategories,
            subCatLoader,
        }
    }

}
</script>

<style>

</style>