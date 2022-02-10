import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

export default function seller(){

    const store = useStore();
    const route = useRoute();
    const bannersBase64= ref([]);
    const preview = ref(null);

    const data = ref({
        description: '',
        category_id: '',
        sub_category_id: '',
    });


    const convertFileToBase64 = (file) => {
        data.value.cinic = file;
        const reader = new FileReader();
        reader.onloadend = function() {
            preview.value = reader.result;
        }
        reader.readAsDataURL(file);
    }

    const createGig = ref({
        s_description: "",
        description: "",
        banner: [],
        category_id: "d3JkUHdCcEZRMGdseTBvNXFOVXNGUT09",
        sub_category_id: "cU1VOWVkQVVpVElJdll4eThYOXpBZz09",
        delivery_time: "20 days",
        price: "",
      });

    const updateGig = ref(store.state.getUserServices.filter( service => (
        service.id === route.params.id)));

      const  gigCreation = () => {
        store.dispatch('createGig',createGig.value)
        console.log("Create Gig Value", createGig.value);
      }
      
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
    const encodeImageFileAsURL =file => {    
        const reader = new FileReader();  
        reader.onloadend = function() {  
            bannersBase64.value.push(reader.result);  
        }  
        reader.readAsDataURL(file);  
    }

    const registerStatus = () => {
        return   store.getters.getRegisterStatus;
      };

    const removeImage = index => {
        bannersBase64.value.splice(index, 1);
        createGig.value.banner.splice(index, 1);
    }

    const onChange = () => {
        data.value.categoryId = document.getElementById("category").value;
        store.dispatch("loadSubCategories", data.value.categoryId);
      };

    return{
        data,
        onChange,
        gigCreation,
        selectThumbnail,
        removeImage,
        encodeImageFileAsURL,
        createGig,
        updateGig,
        bannersBase64,
        convertFileToBase64,
        registerStatus

    }
}