import { ref, watch } from "vue";
import  Api  from '@/services/API'

export default function useBecomeSeller() {

    const subCategories = ref(null);
    let subCatLoader=ref(false);

    const data = ref({
        title: '',
        language: '',
        availability: '',
        portfolio: '',
        bio: '',
        categoryId: '',
        subcategoryId: '',
        insta: '',
        fb: '',
        twitter: ''
    });

    const dataErrors = ref({
        title: null,
        language: null,
        availability: null,
        portfolio: null,
        bio: null,
        categoryId: null,
        subcategoryId: null,
        insta: null,
        fb: null,
        twitter: null
    });

    watch(data.value,(value) => {
        if(!value.title) {
            dataErrors.value.title = 'title is required'
        } else if(value.title.length < 6) {
            dataErrors.value.title = 'title is required'
        } else {
            dataErrors.value.title = null
        }
        if(!value.language) {
            dataErrors.value.language = 'language is required'
        }
        if(!value.availability) {
            dataErrors.value.availability = 'availability is required'
        }
        if(!value.website) {
            dataErrors.value.website = 'website is required'
        }
        if(!value.bio) {
            dataErrors.value.bio = 'bio is required'
        }
        if(!value.categoryId) {
            dataErrors.value.categoryId = 'category is required'
        }
        if(!value.subcategoryId) {
            dataErrors.value.subcategoryId = 'subcategory is required'
        }
        if(!value.insta) {
            dataErrors.value.insta = 'insta is required'
        }
        if(!value.fb) {
            dataErrors.value.fb = 'fb is required'
        }
        if(!value.twitter) {
            dataErrors.value.twitter = 'twitter is required'
        }

    })

    const loadSubCategories= (categoryID) => {
        console.log(categoryID);
        alert(categoryID);
        subCatLoader.value=true;
        return Api.get(`subcategories/${categoryID}`).then(res=>{
            subCategories.value=res.data;
            subCatLoader.value=false;
        })

    }

    return {
        data,
        dataErrors,
        subCategories,
        subCatLoader,
        loadSubCategories
    }

}