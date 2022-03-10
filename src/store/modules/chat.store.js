import { getFirestore, collection, query, where, onSnapshot, orderBy,limit } from "firebase/firestore";

export const state = {
    selectedConversation: {},
    error: null,
    conversations: [],
    conversationLoadingStatus: null,
    chatLoadingStatus: null,
    selectedChatListenerRef: null,
    messages: []
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
                    console.log(message)
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
    sendMessage({ commit },message) {
        console.log(message);
        commit("setSelectedConversation", message);
    },
    lookForConversationChanges({ commit, getters }) {
        commit('setConversationLoadingStatus', 'LOADING');
        const db = getFirestore();
        const user = getters.getAuthUser;
        const conversationRef = collection(db, "Conversations");
        const q = query(conversationRef, where('members', 'array-contains', user.id) , orderBy("createdAt",'desc'));


        /*const unsubscribe = */ onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const id = change.doc.id;
                const convesation = { id, ...change.doc.data() };
                if (change.type === "added") {
                    commit('setConversation', convesation);
                }
                if (change.type === "modified") {
                    console.log("Modified Conversation: ", change.doc.data());
                    commit('updateConversation', convesation);
                }
                if (change.type === "removed") {
                    console.log("Removed Conversation: ", convesation);
                }
            });
        });

        commit('setConversationLoadingStatus', 'COMPLETED');
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
}