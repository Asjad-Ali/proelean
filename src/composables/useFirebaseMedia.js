import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useStore } from "vuex";

export default function useFirebaseMedia() {

    const store = useStore();

    async function uploadAttachment(file, message) {
        
        const storage = getStorage();
        const selectedConversationId = store.getters.getSelectedConversation
        const mediaDir = file.type.includes('image') ? 'images' : 'videos';

        // Create the file metadata
        /** @type {any} */
        const metadata = {
            contentType: 'image/jpeg'
        };

        console.log("dir", mediaDir);

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, `uploads/${mediaDir}/${selectedConversationId.id}` + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                document.getElementById('upload-progress').innerText = progress+ '% done';
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    message.attachment = downloadURL;
                    store.dispatch("sendMessage", message);
                    file="";
                });
            }
        );
    }

    return {
        uploadAttachment
    }
}