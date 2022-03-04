import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";

export const state = {
    selectedChat: {},
    error: null,
    conversations: [],
    c_loadingStatus: ''
}

export const mutations = {
    setMessages(state, messages) {
        messages.forEach(msg => state.messages.push(msg));
    },
    setSelectedConversation(state, conversation) {
        state.selectedChat = conversation
    },
    setError(state, error) {
        state.error = error;
    },
    setConversation(state, conversation) {
        state.conversations.push(conversation);
    },
    updateConversation(state,updatedConv){
        const conversations=state.conversations;
        const index=conversations.findIndex(conv=>conv.id==updatedConv.id);
        conversations.splice(index, 1);
        conversations.unshift(updatedConv);
       state.conversations=conversations;
    },
    setConversationLoadingStatus(state, status) {
        state.c_loadingStatus = status;
    }

}

export const actions = {
    async openSelectedChat({ commit, getters }, conversationID) {
        const selectedConversation = getters.getConversations.find(conversation => conversation.id === conversationID)
        commit('setSelectedConversation', selectedConversation)
    },
    async sendMessage({ commit }, msg) {
        // send msg to selected user
        commit("setSelectedChat", msg);
    },
    async lookForConversationChanges({ commit, getters }) {
        commit('setConversationLoadingStatus', 'LOADING');
        const db = getFirestore();
        const user = getters.getAuthUser;
        const conversationRef = collection(db, "Conversations");
        const q = query(conversationRef, where('members', 'array-contains', user.id));


        /*const unsubscribe = */ onSnapshot(q, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const id=change.doc.id;
                const convesation={id,...change.doc.data()};
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
    getSelectedConversation: (state) => state.selectedChat,
    getConversations: state => state.conversations,
    getConversationListStatus: state => state.c_loadingStatus
}