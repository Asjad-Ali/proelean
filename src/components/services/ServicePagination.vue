<template>
  <div class="footer-pagination text-center">
    <nav class="mb-0 mt-0" aria-label="Page navigation example">
      <ul class="pagination mb-0">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            :class="{ disableClick: !$store.getters.getLinks.prev }"
            @click.prevent="prev($store.getters.getPages.current_page)"
          >
            <span aria-hidden="true"
              ><i class="fa fa-chevron-left" aria-hidden="true"></i
            > Previous</span>
            <span class="sr-only"></span>
          </a>
        </li>

        <li
          class="page-item"
          v-for="page in $store.getters.getPages.links"
          :key="page"
          :class="{ active: page.active }"
        >
          <a
            class="page-link"
            href="#"
            @click.prevent="handlePagination(page.label)"
            :class="{ disableClick: page.active }"
            v-if="page.label.length < 5">{{ page.label }}</a
          >
        </li>
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            :class="{ disableClick: !$store.getters.getLinks.next }"
            @click.prevent="next($store.getters.getPages.current_page)"
          >
            <span aria-hidden="true"
              >Next  <i class="fa fa-chevron-right" aria-hidden="true"></i
            ></span>
            <span class="sr-only"></span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const query = route.params.slug ?? "";

    const prev = (page) => {
      handlePagination(page - 1);
    };
    const next = (page) => {
      handlePagination(page + 1);
    };
    const handlePagination = (page) => {
      store.dispatch("searchServices", `search?q=${query}&page=${page}`);
    };

    return {
      prev,
      next,
      handlePagination,
    };
  },
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