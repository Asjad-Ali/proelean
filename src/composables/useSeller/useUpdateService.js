import { computed, ref } from "vue";
import { useStore } from "vuex";

export default function useCreateService() {

  const store = useStore();
  const bannersBase64 = ref([]);
  const updateGig = computed(()=>store.getters.getSingleService);

  const data = ref({
    description: '',
    category_id: '',
    sub_category_id: '',
  });


  const getUpdateGig = ref({
    s_description: "",
    description: "",
    banner: [],
    delete: [],
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
    getUpdateGig.value._method= 'PUT'
    
    console.log(getUpdateGig.value)
    store.dispatch('updateService', getUpdateGig.value)
    getUpdateGig.value.banner=[]
  }

  const getBanners = computed(() =>
  updateGig.value.service_media ? [...bannersBase64.value, ...updateGig.value.service_media] : bannersBase64.value);


  const selectThumbnail = (e) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++)
      getUpdateGig.value.banner.push(files[i]);

    document.querySelector('#bannerInput').value = '';
    bannersBase64.value = [];
    getUpdateGig.value.banner.forEach( img => {
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

  const removeOldImage = (index, path) => {
    getUpdateGig.value.delete.push(path)
    updateGig.value.service_media.splice(index,1)
  }


  const removeNewImage = (index) => {
    console.log(index)
    bannersBase64.value.splice(index, 1);
    getUpdateGig.value.banner.splice(index, 1);
  }

  // const removeImage = index => {
  //   console.log("Index",index)
  //   // bannersBase64.value.splice(index, 1);
  //   updateGig.value.service_media.splice(index,1)
  //   // getUpdateGig.value.banner.splice(index, 1);
  //   // getBanners.value.splice(index, 1)
  //   console.log("All picture",getBanners)
  // }

  const getCategory = () => {
    data.value.category_id = document.getElementById("category").value;
    store.dispatch("loadSubCategories", data.value.category_id);
  };


  return {
    data,
    getCategory,
    updateService,
    selectThumbnail,
    removeOldImage,
    encodeImageFileAsURL,
    updateGig,
    getBanners,
    removeNewImage,
    bannersBase64
  }
}
