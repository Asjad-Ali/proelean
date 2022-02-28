import { ref } from '@vue/reactivity';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default function Filter() {

    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const budgetArr = ref([
        { 
            filter: 'price<',
            filter_value: '50',
            label: 'less - $50'
        },
        { 
            filter: 'price',
            filter_value: '50,100',
            label: '$50 - $100'
        },
        { 
            filter: 'price',
            filter_value: '100,500',
            label: '$100 - $500'
        },
        { 
            filter: 'price',
            filter_value: '500,1000',
            label: '$500 - $1000'
        },
        { 
            filter: 'price>',
            filter_value: '1000',
            label: 'above - $1000'
        },
    ]);
    const handleBugdetFilter = (index) => {
        let budget = budgetArr.value[index];
        let url = `filter=${budget.filter}&filter_value=${budget.filter_value}`
        let query = route.params.slug ?? '';
        url = url.concat(`&q=${query}`)

        store.dispatch('searchServices',`search?${url}`)
    }

    const handleCategoriesFilter = (slug) => {
        router.push(`/gigs/${slug}`)
    }

    const loadCategories = () => {
        store.dispatch('loadCategories');
    }

    return {
        budgetArr,
        loadCategories,
        handleCategoriesFilter,
        handleBugdetFilter
    }
}