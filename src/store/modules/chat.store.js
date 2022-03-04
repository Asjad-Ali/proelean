import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

export const state = {
    messages: [
        {name: 'Waheed', photo: '/assets/images/user/s2.png', body: 'hey! wait a minute i am on it', sent_at: '04:52pm'},
        {name: 'Jenkins', photo: '/assets/images/user/s1.png', body: 'why so serious larkay?', sent_at: '04:52am'},
    ],
    selectedChat:[],
    error: null,
    conversations:[],
}

export const mutations = {
    setMessages(state, messages) {
        messages.forEach(msg => state.messages.push(msg));
    },
    setSelectedChat(state,chat) {
        state.selectedChat.push(chat)
    },
    setError(state, error) {
        state.error = error;
    },
    setConversations(state,conversations){
        state.conversations= conversations;
    }
}

export const actions = {
    async openSelectedChat({ commit, state },index) {
        commit('setSelectedChat', state.messages[index])
    },
    async sendMessage({ commit }, msg) {
        // send msg to selected user
        commit("setSelectedChat", msg);
    },
    async lookForConversationChanges ({ commit, getters }) {
        const db = getFirestore();
        const user = getters.getAuthUser;
        const conversationRef = collection(db, "Conversations");
        const q = query(conversationRef, where('members', 'array-contains', user.id));
        const querySnapshot = await getDocs(q);
        const conversations=[];
        querySnapshot.forEach((doc) => {
            const id=doc.id;
            conversations.push({id , ...doc.data()});
        });

        commit('setConversations',conversations);
    }
}

export const getters = {
    getMessages: (state) => state.messages,
    getSelectedUserChat: (state) => state.selectedChat,
    getConversations: state=> state.conversations
}