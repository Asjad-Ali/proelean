import { ref, watch } from "vue";
import { useStore } from "vuex";

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
        doc,
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