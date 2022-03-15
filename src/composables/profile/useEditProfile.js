import { computed, ref } from "vue";
import { useStore } from "vuex";

export default function useEditProfile(){

    const store = useStore()
    const user = ref(store.getters.getAuthUser)

    const imageBase64 = ref()

    const editUser = ref({
        name: user.value.name,
        email: user.value.email,
        phone: user.value.phone,
        address: user.value.address,
        description: user.value.description,
        image: user.value.image,
    })

    const handleProfileImage = (e) => {
        convertFileToBase64(e.target.files[0]);
    };

    const convertFileToBase64 = (file) => {
        editUser.value.image = file;
        const reader = new FileReader();
        reader.onloadend = function() {
            imageBase64.value = reader.result;
        }
        reader.readAsDataURL(file);
    }

    const update = () => {
        console.log("Update Value",editUser.value)
        store.dispatch('updateProfile',editUser.value)
      }

    return{
        update,
        imageBase64,
        handleProfileImage,
        editUser,
        btnStatus: computed(() => store.getters.getRegisterStatus)

    }

}