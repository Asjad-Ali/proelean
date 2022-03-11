import { getFirestore, collection, query, where, onSnapshot, orderBy,limit ,doc, setDoc,updateDoc} from "firebase/firestore";

export const state = {
    selectedConversation: {},
    error: null,
    conversations: [],
    conversationLoadingStatus: null,
    chatLoadingStatus: null,
    selectedChatListenerRef: null,
    messages: [],
    referrerGig: null,
    areConversationsLoaded: false
}

export const mutations = {
    setMessages(state, messages) {
        messages.forEach(msg => state.messages.push(msg));
    },
    setSelectedConversation(state, conversation) {
        state.selectedConversation = conversation
    },
    setError(state, error) {
        state.error = error;
    },
    setReferrerGig(state,gig){
        state.referrerGig=gig
    },
    setConversation(state, conversation) {
        state.conversations.push(conversation);
    },
    updateConversation(state, updatedConv) {
        const conversations = state.conversations;
        const index = conversations.findIndex(conv => conv.id == updatedConv.id);
        conversations.splice(index, 1);
        conversations.unshift(updatedConv);
        state.conversations = conversations;
    },
    setConversationLoadingStatus(state, status) {
        state.conversationLoadingStatus = status;
    },
    setChatLoadingStatus(state, status) {
        state.chatLoadingStatus = status;
    },
    setSelectedChatListenerRef(state,ref){
        state.selectedChatListenerRef = ref;
    },
    resetMessages(state){
        state.messages=[];
    },
    setMessage(state,message){
        state.messages.push(message);
    },
    setConversationsAreLoaded(state){
        state.areConversationsLoaded = true;
    }
}

export const actions = {
    openSelectedConversation({ commit, getters }, conversationID) {
        const selectedConversation = getters.getConversations.find(conversation => conversation.id == conversationID)
        commit('setSelectedConversation', selectedConversation)
        commit('setChatLoadingStatus', 'LOADING');
        commit('resetMessages');
        
        //unsubscribe old chat listener
        if(getters.getSelectedChatListenerRef){
            getters.getSelectedChatListenerRef();
        }

        const db = getFirestore();

        const chatRef = collection(db, `Conversations/${selectedConversation.id}/Messages`);
        const q = query(chatRef, orderBy('sentAt','asc'), limit(10));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const id = change.doc.id;
                const message = { id, ...change.doc.data() };
                if (change.type === 'added') {
                    commit('setMessage',message);
                }
                if (change.type === "modified") {
                    console.log("Modified Message: ", message);
                }
                if (change.type === "removed") {
                    console.log("Removed Message: ", message);
                }
            });
        });

        commit('setSelectedChatListenerRef',unsubscribe);
    },
    sendMessage({getters, dispatch },message) {
        const db = getFirestore();
        const newDocId=new Date().getTime().toString() + 'id';
        const selectedConversation = getters.getSelectedConversation;
        if(!selectedConversation){
            return
        }

        const chatRef = doc(collection(db, `Conversations/${selectedConversation.id}/Messages`),newDocId);

        const newMessage = {
            message: message.text,
            attachment: message.attachement,
            attachementType: message.attachementType,
            sentAt: new Date(new Date().toISOString()).getTime(),
            refersGig: message.refersGig,
            senderId: getters.getAuthUser.id,
            messageOffer: null,
            messageGig: getters.getReferrerGig,
            deleteMessage: [],
            id: newDocId
        };

        console.log("New Message", newMessage);
        setDoc(chatRef, newMessage);
        dispatch('updateConversation',newMessage);
    },
    lookForConversationChanges({ commit, getters }) {
        commit('setConversationLoadingStatus', 'LOADING');
        if(!getters.areConversationListAlreadyLoaded) {
            const db = getFirestore();
            const user = getters.getAuthUser;
            const conversationRef = collection(db, "Conversations");
            const q = query(conversationRef, where('members', 'array-contains', user.id) , orderBy("createdAt",'desc'));


            /*const unsubscribe = */ onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const id = change.doc.id;
                    const conversation = { id, ...change.doc.data() };
                    if (change.type === "added") {
                        commit('setConversation', conversation);
                    }
                    if (change.type === "modified") {
                        console.log("Modified Conversation: ", change.doc.data());
                        commit('updateConversation', conversation);
                    }
                    if (change.type === "removed") {
                        console.log("Removed Conversation: ", conversation);
                    }
                });
            });
        }
        commit('setConversationLoadingStatus', 'COMPLETED');
        commit('setConversationsAreLoaded');
    },
    updateConversation({ getters},message){
        const conversation=getters.getSelectedConversation;
        const db = getFirestore();
        const user=getters.getAuthUser;
        const conversationRef = doc(db, "Conversations", conversation.id);

        conversation.membersInfo.forEach(member => {
            if(member.id==user.id){
                member.name=user.name;
                member.photo=user.image,
                member.hasReadLastMessage=true;
                member.type='available';
            }
        });
        
        updateDoc(conversationRef, {
            sentAt: new Date(new Date().toISOString()).getTime(),
            senderName: user.name,
            senderId: user.id,
            lastMessage: message.message,
            membersInfo : conversation.membersInfo
        });
    }
}

export const getters = {
    getMessages: (state) => state.messages,
    getSelectedConversation: (state) => state.selectedConversation,
    getConversations: state => state.conversations,
    getConversationListStatus: state => state.conversationLoadingStatus,
    getChatLoadingStatus: state => state.chatLoadingStatus,
    getSelectedChatListenerRef: state => state.selectedChatListenerRef,
    getChatMessages:  state => state.messages,
    getReferrerGig: state => state.referrerGig,
    areConversationListAlreadyLoaded: state => state.areConversationsLoaded
}