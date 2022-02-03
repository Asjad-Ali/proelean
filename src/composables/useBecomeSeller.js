import { ref, watch } from "vue";

export default function useBecomeSeller() {

    const subCategories = ref(null);
    let subCatLoader=ref(false);
    const doc = ref(null);

    const data = ref({
        title: '',
        language: '',
        availability: '',
        portfolio: '',
        bio: '',
        cinic: '',
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
        if(!value.portfolio) {
            dataErrors.value.portfolio = 'portfolio is required'
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

    const convertFileToBase64 = (file) => {
        const reader = new FileReader();
        reader.onloadend = function() {
            doc.value = reader.result;
            data.value.cinic = reader.result;
        }
        reader.readAsDataURL(file);
    }

    return {
        data,
        doc,
        dataErrors,
        subCategories,
        subCatLoader,
        convertFileToBase64
    }

}