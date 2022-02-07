<template>
    <div class="col-lg-3">
        <div class="filters shadow-sm rounded bg-white mb-4">
            <div class="filters-header border-bottom pl-4 pr-4 pt-3 pb-3">
            <h5 class="m-0">Filter By</h5>
            </div>

        <div class="filters-body">
        <div id="accordion">
            <div class="filters-card border-bottom p-4">
                <div class="filters-card-header" id="headingOne">
                    <h6 class="mb-0">
                    <a href="#" class="btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Popular <i class="mdi mdi-chevron-down float-right"></i>
                    </a>
                    </h6>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="filters-card-body card-shop-filters">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb1">
                        <label class="custom-control-label" for="cb1">Website Building </label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb2">
                        <label class="custom-control-label" for="cb2">WordPress</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb3">
                        <label class="custom-control-label" for="cb3">Logo Design</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb4">
                        <label class="custom-control-label" for="cb4">Dropshipping</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb3">
                        <label class="custom-control-label" for="cb3">Website Design</label>
                    </div>
                    <div class="mt-2"><a href="#" class="link">See all</a></div>
                    </div>
                </div>
            </div>
            <div class="filters-card border-bottom p-4">
                <div class="filters-card-header" id="headingTwo">
                    <h6 class="mb-0">
                    <a href="#" class="btn-link" data-toggle="collapse" data-target="#collapsetwo" aria-expanded="true" aria-controls="collapsetwo">
                    Categories <i class="mdi mdi-chevron-down float-right"></i>
                    </a>
                    </h6>
                </div>
                <div id="collapsetwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="filters-card-body card-shop-filters">
                    <form class="filters-search mb-3">
                        <div class="form-group">
                            <i class="fa fa-search"></i>
                            <input type="text" class="form-control" placeholder="Search Brand">
                        </div>
                    </form>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb6">
                        <label class="custom-control-label" for="cb6">Full Website Creation </label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb7">
                        <label class="custom-control-label" for="cb7">Landing Page</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb8">
                        <label class="custom-control-label" for="cb8">Customization</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb9">
                        <label class="custom-control-label" for="cb9">Bug Fixes</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb10">
                        <label class="custom-control-label" for="cb10">Theme/Plugin</label>
                    </div>
                    <div class="mt-2"><a href="#" class="link">See all</a></div>
                    </div>
                </div>
            </div>
            <div class="filters-card border-bottom p-4">
                <div class="filters-card-header" id="headingCategory">
                    <h6 class="mb-0">
                    <a href="#" class="btn-link" data-toggle="collapse" data-target="#collapseCategory" aria-expanded="true" aria-controls="collapseCategory">
                    Budget <i class="mdi mdi-chevron-down float-right"></i>
                    </a>
                    </h6>
                </div>
                <div id="collapseCategory" class="collapse" aria-labelledby="headingCategory" data-parent="#accordion">
                    <div class="filters-card-body card-shop-filters">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb1">
                        <label class="custom-control-label" for="cb1">$10 - $100 </label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb2">
                        <label class="custom-control-label" for="cb2">$100 - $500</label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb3">
                        <label class="custom-control-label" for="cb3">$500 - $1000</label>
                    </div>
                    <div class="mt-2"><a href="#" class="link">See all</a></div>
                    </div>
                </div>
            </div>
            <div class="filters-card p-4 border-bottom">
                <div class="filters-card-header" id="headingOffer">
                    <h6 class="mb-0">
                    <a href="#" class="btn-link" data-toggle="collapse" data-target="#collapseOffer" aria-expanded="true" aria-controls="collapseOffer">
                    Seller Details <i class="mdi mdi-chevron-down float-right"></i>
                    </a>
                    </h6>
                </div>
                <div id="collapseOffer" class="collapse" aria-labelledby="headingOffer" data-parent="#accordion">
                    <div class="filters-card-body card-shop-filters">
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb6">
                        <label class="custom-control-label" for="cb6">Top Rated Seller <small class="text-danger float-right">80</small></label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb7">
                        <label class="custom-control-label" for="cb7">Level One <small class="text-danger float-right">34</small></label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb8">
                        <label class="custom-control-label" for="cb8">Level Two <small class="text-danger float-right">56</small></label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb9">
                        <label class="custom-control-label" for="cb9">New Seller <small class="text-danger float-right">98</small></label>
                    </div>
                    <div class="custom-control custom-checkbox">
                        <input type="checkbox" class="custom-control-input" id="cb10">
                        <label class="custom-control-label" for="cb10"> Seller <small class="text-danger float-right">21</small></label>
                    </div>
                    <div class="mt-2"><a href="#" class="link">See all</a></div>
                    </div>
                </div>
            </div>
            <div class="filters-card p-4">
                <div class="filters-card-header" id="headingDistance">
                    <h6 class="mb-0">
                    <a href="#" class="btn-link" data-toggle="collapse" data-target="#collapseDistance" aria-expanded="true" aria-controls="collapseDistance">
                    Pro Services <i class="mdi mdi-chevron-down float-right"></i>
                    </a>
                    </h6>
                </div>
                <div id="collapseDistance" class="collapse show" aria-labelledby="headingDistance" data-parent="#accordion">
                    <div class="filters-card-body card-shop-filters">
                    <div class="filters-card">
                        <div>
                            <div class="filters-card-body card-shop-filters pt-0">
                                <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio1" name="customRadio" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="customRadio1">Yes</label>
                                </div>
                                <div class="custom-control custom-radio">
                                <input type="radio" id="customRadio2" name="customRadio" class="custom-control-input">
                                <label class="custom-control-label" for="customRadio2">No
                                with offers</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
     </div>
               </div>
</template>

<script>
export default {

}
</script>

<style>

</style>