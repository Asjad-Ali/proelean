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


  // const updateGig = ref({
  //   s_description: "",
  //   description: "",
  //   banner: [],
  //   category_id: "",
  //   sub_category_id: "",
  //   delivery_time: '',
  //   price: "",
  // });



 
  const updateService = () => {
    updateGig.value.sub_category_id = document.getElementById("subCategory").value
    updateGig.value.delivery_time = document.getElementById("deliveryTime").value
    updateGig.value.delivery_time = document.getElementById("deliveryTime").value
    console.log(updateGig.value)
    // store.dispatch('updateGig', updateGig.value)
  }

  const getBanners = computed(() =>
  updateGig.value.service_media ? [...bannersBase64.value, ...updateGig.value.service_media] : bannersBase64.value);



  const selectThumbnail = (e) => {
    const files = e.target.files;
    console.log("Image",e.target.files);

    for (let i = 0; i < files.length; i++)
      updateGig.value.service_media.push(files[i]);

    document.querySelector('#bannerInput').value = '';
    bannersBase64.value = [];
      updateGig.value.service_media.forEach( img => {
        console.log("Image", img)
        encodeImageFileAsURL(img);
      })
  }
    
  const encodeImageFileAsURL = file => {
    const reader = new FileReader();
    reader.onloadend = function () {
      updateGig.value.service_media.value.push(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const removeImage = index => {
    bannersBase64.value.splice(index, 1);
    updateGig.value.service_media.splice(index, 1);
  }

  const getCategory = () => {
    data.value.category_id = document.getElementById("category").value;
    console.log("Catogry id", data.value.category_id)
    updateGig.value.category_id = data.value.category_id;
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
