import { ref, watch } from "vue";
import { useStore } from "vuex";

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


    const store = useStore();
    const createGig = ref({
        s_description: "",
        description: "",
        banner: [],
        category_id: "d3JkUHdCcEZRMGdseTBvNXFOVXNGUT09",
        sub_category_id: "cU1VOWVkQVVpVElJdll4eThYOXpBZz09",
        delivery_time: "20 days",
        price: "",
      });

      
      const  gigCreation = () => {
          store.dispatch('createGig',createGig.value)
          console.log("Create Gig Value", createGig.value);
        }
        
      const bannersBase64= ref([]);
      const selectThumbnail = (e) => {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
          createGig.value.banner.push(files[i]);
        }
        document.querySelector('#bannerInput').value='';
        console.log(createGig.value);
  
        bannersBase64.value=[];
        createGig.value.banner.forEach(img => {
            encodeImageFileAsURL(img);
        });
      };

      const removeImage = index => {
        bannersBase64.value.splice(index, 1);
        createGig.value.banner.splice(index, 1);
    }

    const encodeImageFileAsURL =file => {    
        const reader = new FileReader();  
        reader.onloadend = function() {  
            bannersBase64.value.push(reader.result);  
        }  
        reader.readAsDataURL(file);  
    }

    return {
        data,
        preview,
        dataErrors,
        subCategories,
        subCatLoader,
        convertFileToBase64,

        createGig,
        bannersBase64,
        gigCreation,
        selectThumbnail,
        removeImage,
        encodeImageFileAsURL
    }

}