import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default function useCreateService() {

  const store = useStore();
  const route = useRouter();
  const bannersBase64 = ref([]);
  const preview = ref(null);

  const data = ref({
    description: '',
    category_id: '',
    sub_category_id: '',
  });

  const convertFileToBase64 = (file) => {
    data.value.cinic = file;
    const reader = new FileReader();
    reader.onloadend = function () {
      preview.value = reader.result;
    }
    reader.readAsDataURL(file);
  }

  const createService = ref({
    s_description: "",
    description: "",
    banner: [],
    category_id: "",
    sub_category_id: "",
    delivery_time: '',
    price: "",
  });

 
  const gigCreation = () => {
    createService.value.sub_category_id = document.getElementById("subCategory").value
    createService.value.delivery_time = document.getElementById("deliveryTime").value
    console.log(createService.value)
    store.dispatch('createService', createService.value).then(res => {
      if(res.status === 201) {

        route.push({name: "SellerServices"});
      }
    })

  }


  const selectThumbnail = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++)
        createService.value.banner.push(files[i]);

    document.querySelector('#bannerInput').value = '';
    bannersBase64.value = [];
      createService.value.banner.forEach( img => {
        encodeImageFileAsURL(img);
      })
  }
    
  const encodeImageFileAsURL = file => {
    const reader = new FileReader();
    reader.onloadend = function () {
      bannersBase64.value.push(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const removeImage = index => {
    bannersBase64.value.splice(index, 1);
    createService.value.banner.splice(index, 1);
  }

  const getCategory = () => {
    data.value.category_id = document.getElementById("category").value;
    console.log("Catogry id", data.value.category_id)
    store.dispatch("loadSubCategories", data.value.category_id);
    createService.value.category_id = data.value.category_id;
  };


  return {
    data,
    getCategory,
    gigCreation,
    selectThumbnail,
    removeImage,
    encodeImageFileAsURL,
    createService,
    bannersBase64,
    convertFileToBase64
  }
}
