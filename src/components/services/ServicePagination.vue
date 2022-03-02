<template>
  <div class="footer-pagination text-center">
    <nav class="mb-0 mt-0" aria-label="Page navigation example">
      <ul class="pagination mb-0">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            :class="$store.getters.getCurrentPage === 1 ? 'disableClick' : ''"
            @click.prevent="prev($store.getters.getCurrentPage)"
          >
            <span aria-hidden="true"
              ><i class="fa fa-chevron-left" aria-hidden="true"></i
            ></span>
            <span class="sr-only"></span>
          </a>
        </li>

        <li class="page-item"  v-for="n in $store.getters.getNextPage" :key="n"
            :class="$store.getters.getCurrentPage === n ? 'active' : ''"
        >
            <a class="page-link" href="#" @click.prevent="handlePagination(n)">{{n}}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next"
          :class="{'disableClick': !$store.getters.getNextPage}"
          @click.prevent="next($store.getters.getCurrentPage)"
          >
            <span aria-hidden="true"
              ><i class="fa fa-chevron-right" aria-hidden="true"></i
            ></span>
            <span class="sr-only"></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
export default {
    setup() {
        const store = useStore();
        const route = useRoute();
        const query = route.params.slug ?? '';
        
        const prev = (page) => {
          handlePagination(page-1)
        }
        const next = (page) => {
          handlePagination(page+1)
        }
        const handlePagination = (page) => {
          console.log(page)
          store.dispatch('searchServices',`search?q=${query}&page=${page}`)
        }

        return {
          prev,
          next,
          handlePagination
        }
    }
};
</script>

<style scoped>
.disableClick {
  pointer-events: none;
}
a.disableClick {
  cursor: default;
}
</style>