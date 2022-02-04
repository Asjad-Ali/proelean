import { ref, watch } from "vue";

export default function useBecomeSeller() {

    const subCategories = ref(null);
    let subCatLoader=ref(false);
    const preview = ref(null);

    const data = ref({
        freelancer_title: '',
        lang: '',
        availability: '',
        portfolio: '',
        description: '',
        cinic: '',
        category_id: '',
        sub_category_id: '',
        country_id: '',
        instagram: '',
        facebook: '',
        twitter: ''
    });

    const dataErrors = ref({
        freelancer_title: null,
        lang: null,
        availability: null,
        cinic:null,
        country:null,
        portfolio: null,
        description: null,
        category_id: null,
        sub_category_id: null,
        instagram: null,
        facebook: null,
        twitter: null
    });

    watch(data.value,(value) => {
        if(!value.freelancer_title) {
            dataErrors.value.freelancer_title = 'title is required'
        }
        if(!value.lang) {
            dataErrors.value.lang = 'language is required'
        }
        if(!value.availability) {
            dataErrors.value.availability = 'availability is required'
        }
        if(!value.portfolio) {
            dataErrors.value.portfolio = 'portfolio is required'
        }
        if(!value.bio) {
            dataErrors.value.bio = 'bio is required'
        }
        if(!value.category_id) {
            dataErrors.value.category_id = 'category is required'
        }
        if(!value.country) {
            dataErrors.value.country = 'country is required'
        }
        if(!value.sub_category_id) {
            dataErrors.value.sub_category_id = 'subcategory is required'
        }
        if(value.instagram && value.instagram.length < 10) {
            dataErrors.value.instagram = 'incorrect url'
        }
        if(value.facebook && value.facebook.length < 10) {
            dataErrors.value.facebook = 'incorrect url'
        }
        if(value.twitter && value.twitter.length < 10) {
            dataErrors.value.twitter = 'incorrect url'
        }

    })

    const convertFileToBase64 = (file) => {
        const reader = new FileReader();
        reader.onloadend = function() {
            preview.value = reader.result;
            data.value.cinic = reader.result;
        }
        reader.readAsDataURL(file);
    }

    return {
        data,
        preview,
        dataErrors,
        subCategories,
        subCatLoader,
        convertFileToBase64
    }

}