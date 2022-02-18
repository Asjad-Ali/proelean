import { computed, ref } from "vue";
import { useStore } from "vuex";

export default function useCreateService() {

  const store = useStore();
  const bannersBase64 = ref([]);
  const updateGig = ref( computed(()=>store.getters.getSingleService));


  const data = ref({
    description: '',
    category_id: '',
    sub_category_id: '',
  });


  const getUpdateGig = ref({
    s_description: "",
    description: "",
    // banner: [],
    category_id: "",
    sub_category_id: "",
    delivery_time: '',
    price: "",
    id:""
  });


  const updateService = () => {
    getUpdateGig.value.sub_category_id = document.getElementById("subCategory").value
    getUpdateGig.value.category_id = document.getElementById("category").value
    getUpdateGig.value.delivery_time = document.getElementById("deliveryTime").value
    getUpdateGig.value.s_description = updateGig.value.s_description
    getUpdateGig.value.description = updateGig.value.description
    getUpdateGig.value.price = updateGig.value.price
    getUpdateGig.value.id = updateGig.value.id
    console.log(getUpdateGig.value)
    store.dispatch('updateService', getUpdateGig.value)
  }

  const getBanners = computed(() =>
  updateGig.value.service_media ? [...bannersBase64.value, ...updateGig.value.service_media] : bannersBase64.value);



  const selectThumbnail = (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++)
      {
        console.log("pic",files)
        getUpdateGig.value.banner.push(files[i]);
      }

    document.querySelector('#bannerInput').value = '';
    bannersBase64.value = [];
      getUpdateGig.value.banner.forEach( img => {
        encodeImageFileAsURL(img);
      })
  }

  const encodeImageFileAsURL = file => {
    const reader = new FileReader();
    reader.onloadend = function () {
      // updateGig.value.service_media.value.push(reader.result);
      bannersBase64.value.push(reader.result)
    }
    reader.readAsDataURL(file);

  }


  const removeImage = index => {
    bannersBase64.value.splice(index, 1);
    updateGig.value.service_media.splice(index, 1);
  }

  const getCategory = () => {
    data.value.category_id = document.getElementById("category").value;
    store.dispatch("loadSubCategories", data.value.category_id);
  };


  return {
    data,
    getCategory,
    updateService,
    selectThumbnail,
    removeImage,
    encodeImageFileAsURL,
    updateGig,
    getBanners,
    bannersBase64
  }
}
