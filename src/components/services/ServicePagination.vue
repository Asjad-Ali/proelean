<template>
    <div class="footer-pagination text-center" v-if="$store.getters.getUserServices.length">
        <nav class="mb-0 mt-0" aria-label="Page navigation example">
        <ul class="pagination mb-0">
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>
                                       <span class="sr-only"></span>
                </a>
            </li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item active"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">4</a></li>
            <li class="page-item"><a class="page-link" href="#">5</a></li>
            <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
                                       <span class="sr-only"></span>
                </a>
            </li>
        </ul>
        </nav>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>