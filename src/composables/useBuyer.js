import { computed, ref,watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default function useBecomeSeller() {

        const subCategories = ref(null);
    
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


    const store = useStore();
    const route = useRoute();
    const createJob = ref({
        description: "",
        category_id: "cU1VOWVkQVVpVElJdll4eThYOXpBZz09",
        sub_category_id: "cU1VOWVkQVVpVElJdll4eThYOXpBZz09",
        delivery_time: "",
        budget:"",
    });

    const handleCredentials = () =>{
        data.value.categoryId = document.getElementById("category_id").value;
        data.value.subcategoryId = document.getElementById("sub_category_id").value;
        data.value.delivery_time = document.getElementById("delivery_time").value;
        console.log("categoryId", data.value.categoryId);
        console.log("subcategoryId", data.value.subcategoryId);
        console.log("delivery_time", data.value.delivery_time);
    }

    const jobCreation = () => {
        store.dispatch('createAJob',createJob.value)
        console.log("Create Job Value", createJob.value);
        createJob.value = '';
        document.getElementById("sub_category_id").value = '';
        document.getElementById("delivery_time").value = '';

    }

    const payload = {
        id: route.params.id,
        type: "SERVICE_DETAIL",
        };


    const formData = ref([
        { 
            paymentElements: { 
            service_id:payload.id,
            number:4242424242424242,
            exp_month:6,
            exp_year:2022,
            cvc:123,}
        },
        { 
            descriptionData: {
            service_id:payload.id,
            description:'',
            token: ''}
        }
        ]);


    
    const descriptionRegex = /^[a-zA-Z. ]{20,300}$/;
    const descriptionErrors = ref({
      description: null,
    });

        
    watch(formData.value[1].descriptionData,(current) => {
        if(!current.description){
            console.log("in condition",current.description)
            descriptionErrors.value.description = "Description is required"
        }
        else if(!current.description.match(descriptionRegex)){
            descriptionErrors.value.description = "Description's length must be minimum 20 characters"
        }
        else{
            descriptionErrors.value.description = null
        }
    })

    return {
        service: computed(() => store.getters.getSingleService),
        data,
        subCategories,
        createJob,
        jobCreation,
        handleCredentials,
        formData,
        payload,
        descriptionRegex,
        descriptionErrors
    }

}