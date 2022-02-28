import { ref, watch } from "vue";
import { useStore } from "vuex";
import { onBeforeMount } from '@vue/runtime-core';
import router from "../router";

export default function useBecomeSeller() {

    const store = useStore();
    const subCategories = ref(null);
    let subCatLoader=ref(false);
    const bannersBase64= ref([]);
    const preview = ref(null);
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const data = ref({
        freelancer_title: '',
        lang: '',
        availability: '',
        description: '',
        cinic: '',
        category_id: '',
        sub_category_id: '',
        country_id: '',
        portfolio:'',
        instagram: '',
        facebook: '',
        twitter: ''
    });

    const dataErrors = ref({
        freelancer_title: null,
        lang: null,
        availability: null,
        cinic:null,
        country_id:null,
        description: null,
        category_id: null,
        sub_category_id: null,
        portfolio: null,
        instagram: null,
        facebook: null,
        twitter: null
    });


    // const instagram = /^\s*(http\:\/\/)?instagram\.com\/[a-z\d-_]{1,255}\s*$/;
    
    watch(data.value,(value) => {

        if(!value.freelancer_title) {  
        dataErrors.value.freelancer_title = 'Title is required'                               
        } else{
        dataErrors.value.freelancer_title = null                               
        }

        if(!value.lang) {
            dataErrors.value.lang = 'Language is required'
        } else{
            dataErrors.value.lang  = null                               
        }
        
        if(!value.availability) {
            dataErrors.value.availability = 'Availability is required'
        } else{
            dataErrors.value.availability  = null                               
        }

        if(!value.country_id) {
            dataErrors.value.country_id = 'Country is required'
        } else{
            dataErrors.value.country_id = null                               
        }

        if(!value.description) {
            dataErrors.value.description = ' Description is required'
        } else{
            dataErrors.value.description  = null                               
        }
        if(!value.category_id) {
            dataErrors.value.category_id = 'Category is required'
        } else{
            dataErrors.value.category_id  = null                               
        }
        if(!value.sub_category_id) {
            dataErrors.value.sub_category_id = 'Subcategory is required'
        }else{
            dataErrors.value.sub_category_id  = null                               
        }
        if(!value.cinic) {
            dataErrors.value.cinic = 'CNIC image is required'
        }else{
            dataErrors.value.cinic  = null                               
        }


        if(value.portfolio && value.portfolio.length < 10) {
            dataErrors.value.portfolio = 'Incorrect URL'
        }else{
            dataErrors.value.portfolio  = null                               
        }
        if(value.instagram && value.instagram.length < 10) {
            dataErrors.value.instagram = 'Incorrect URL'
        }else{
            dataErrors.value.instagram  = null                               
        }
        if(value.facebook && value.facebook.length < 10) {
            dataErrors.value.facebook = 'Incorrect URL'
        }else{
            dataErrors.value.facebook  = null                               
        }
        if(value.twitter && value.twitter.length < 10) {
            dataErrors.value.twitter = 'Incorrect URL'
        }else{
            dataErrors.value.twitter  = null                               
        }
    })

    const convertFileToBase64 = (file) => {
        data.value.cinic = file;
        const reader = new FileReader();
        reader.onloadend = function() {
            preview.value = reader.result;
        }
        reader.readAsDataURL(file);
    }

    // const removeImage = (e) => {
    //     data.value.cinic.indexOf(index,0)
    // }

 
      
        


    //   const removeImage = index => {
    //     bannersBase64.value.splice(index, 1);
    //     createGig.value.banner.splice(index, 1);
    // }

    const encodeImageFileAsURL =file => {    
        const reader = new FileReader();  
        reader.onloadend = function() {  
            bannersBase64.value.push(reader.result);  
        }  
        reader.readAsDataURL(file);  
    }

    onBeforeMount(()=>{
        // check if user is already seller
        if(user.isFreelancer) {
            router.push('/')
        } else {
            store.dispatch('getCountriesLanguage')
        }
    });

    const onCategorySelected = () => {
        data.value.category_id = document.getElementById("category").value;
        store.dispatch("loadSubCategories", data.value.category_id);
    };

    const handleCinic = (e) => {
        convertFileToBase64(e.target.files[0]);
    };

    const handleBecomeSeller = () => {
        
        if(!data.value.freelancer_title) {  
        dataErrors.value.freelancer_title = 'Title is required'                               
        } else if(!data.value.lang) {
            dataErrors.value.lang = 'Language is required'
        } else if(!data.value.availability) {
            dataErrors.value.availability = 'Availability is required'
        } else if(!data.value.description) {
            dataErrors.value.description = 'description is required'
        }  else if(!data.value.category_id) {
            dataErrors.value.category_id = 'Category is required'
        } else if(!data.value.country_id) {
            dataErrors.value.country_id = 'Country is required'
        } else if(!data.value.sub_category_id) {
            dataErrors.value.sub_category_id = 'Subcategory is required'
        }else{
            console.log(data.value)
            store.dispatch('handleBecomeSeller',data.value);                               
        }


        // 
        // if(!dataErrors.value) {
        //     store.dispatch('handleBecomeSeller',data.value);
        // }
    };

    return {
        data,
        preview,
        dataErrors,
        subCategories,
        subCatLoader,
        bannersBase64,
        convertFileToBase64,
        // removeImage,
        encodeImageFileAsURL,
        handleBecomeSeller,
        onCategorySelected,
        handleCinic
    }

}