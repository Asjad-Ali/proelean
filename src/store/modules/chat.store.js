import Api from "@/services/API";
import {
    getFirestore,
    collection,
    query,
    where,
    onSnapshot,
    orderBy,
    doc,
    setDoc,
    updateDoc,
    startAfter,
    getDocs,
    limitToLast,
} from "firebase/firestore";

export const state = {
    selectedConversation: null,
    error: null,
    conversations: [],
    conversationLoadingStatus: null,
    chatLoadingStatus: null,
    selectedChatListenerRef: null,
    messages: [],
    referrerGig: null,
    areConversationsLoaded: false,
    newConversationUser: null,
    isConversationNew: true,
    hasMoreMessages: true,
    customServiceOffer: {},
    msgOfferLoadingStatus: ''
};

const scrollToBottom = () => {
    setTimeout(() => {
        const messagesDiv = document.getElementById("messages-section");
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },300);
}

const holdScroll =() =>{
    let messagesDiv = document.getElementById("messages-section");
    const lastScrollHeight= messagesDiv.scrollHeight;
    setTimeout(() => {
        messagesDiv = document.getElementById("messages-section");
        messagesDiv.scrollTop = (messagesDiv.scrollHeight - lastScrollHeight);
    },200);
}

export const mutations = {
    setMessages(state, messages) {
        messages.forEach((msg) => state.messages.push(msg));
    },
    setSelectedConversation(state, conversation) {
        state.selectedConversation = conversation;
        state.newConversationUser = null;
    },
    setError(state, error) {
        state.error = error;
    },
    setReferrerGig(state, gig) {
        state.referrerGig = gig;
    },
    setConversation(state, conversation) {
        state.conversations.push(conversation);

        const paramId = location.pathname.split("/").pop();
        if (!paramId.includes("chat") && conversation.members.includes(paramId)) {
            this.dispatch("openSelectedConversation", conversation.id);
        }
    },
    setNewConversationStatus(state, value) {
        state.isConversationNew = value;
    },
    updateConversation(state, updatedConv) {
        const conversations = state.conversations;
        const index = conversations.findIndex((conv) => conv.id == updatedConv.id);
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
    setSelectedChatListenerRef(state, ref) {
        state.selectedChatListenerRef = ref;
    },
    resetMessages(state) {
        state.messages = [];
    },
    setMessage(state, message) {
        state.messages.push(message);
        scrollToBottom();
    },
    setHasMoreMessages(state, val) {
        state.hasMoreMessages = val;
    },
    setMessageInStart(state, message) {
        state.messages.unshift(message);
        holdScroll();
    },
    setConversationsAreLoaded(state) {
        state.areConversationsLoaded = true;
    },
    setNewConversationUser(state, user) {
        state.newConversationUser = user;
    },
    setWithdrawLoadingStatus(state, status) {
        state.msgOfferLoadingStatus = status;
    },
    setCustomOffer(state, offer) {
        state.customServiceOffer = offer;
    }
};

export const actions = {
    openSelectedConversation({ commit, getters }, conversationID) {
        commit("setNewConversationStatus", false);

        const selectedConversation = getters.getConversations.find(
            (conversation) => conversation.id == conversationID
        );
        commit("setSelectedConversation", selectedConversation);
        commit("setChatLoadingStatus", "LOADING");
        commit("resetMessages");
        commit('setHasMoreMessages', true);

        //unsubscribe old chat listener
        if (getters.getSelectedChatListenerRef) {
            getters.getSelectedChatListenerRef();
        }

        const db = getFirestore();

        const chatRef = collection(
            db,
            `Conversations/${selectedConversation.id}/Messages`
        );
        const limitRecords = 8;
        const q = query(chatRef, orderBy("sentAt"), limitToLast(limitRecords));
        const unsubscribe = onSnapshot(q, (snapshot) => {

            commit('setHasMoreMessages', snapshot.docs.length == limitRecords ? true : false);

            snapshot.docChanges().forEach((change) => {
                const id = change.doc.id;
                const message = { id, ...change.doc.data() };
                if (change.type === "added") {
                    commit("setMessage", message);
                }
                if (change.type === "modified") {
                    console.log("Modified Message: ", message);
                }
                if (change.type === "removed") {
                    console.log("Removed Message: ", message);
                }
            });
        });

        commit("setSelectedChatListenerRef", unsubscribe);
    },
    async reversePaginate({ commit, getters }) {
        const selectedConversation = getters.getSelectedConversation;
        if (!selectedConversation || !getters.hasMoreMessages) {
            return false;
        }
        commit("setChatLoadingStatus", "LOADING");

        const db = getFirestore();

        const chatRef = collection(
            db,
            `Conversations/${selectedConversation.id}/Messages`
        );

        const firstMessage = getters.getMessages[0];
        const limitRecords = 8;
        const q = query(chatRef, orderBy("sentAt", 'desc'), startAfter(firstMessage));

        const querySnapshot = await getDocs(q);

        commit('setHasMoreMessages', querySnapshot.docs.length == limitRecords ? true : false);
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const message = { id, ...doc.data() };
            commit("setMessageInStart", message);
        });

        commit("setChatLoadingStatus", "COMPLETED");
    },
    async sendMessage(
        { getters, dispatch },
        { text, attachement, refererGig, attachementType }
    ) {
        const newConversationUser = getters.getNewConversationUser;

        if (!getters.getSelectedConversation && !newConversationUser) {
            return;
        } else if (newConversationUser && !getters.getSelectedConversation) {
            await dispatch("createConversation", newConversationUser);
        }

        const db = getFirestore();
        const newDocId = new Date().getTime().toString() + "id";

        const selectedConversation = getters.getSelectedConversation;
        if (!selectedConversation) {
            return;
        }

        const chatRef = doc(
            collection(db, `Conversations/${selectedConversation.id}/Messages`),
            newDocId
        );
        
        const newMessage = {
            message: text,
            attachment: attachement,
            attachementType: attachementType,
            sentAt: new Date(new Date().toISOString()).getTime(),
            refersGig: refererGig,
            senderId: getters.getAuthUser.id,
            messageOffer: null,
            messageGig: getters.getReferrerGig,
            deleteMessage: [],
            id: newDocId,
        };

        console.log("New Message", newMessage);
        setDoc(chatRef, newMessage);
        dispatch("updateConversation", newMessage);
    },
    lookForConversationChanges({ commit, getters }) {
        commit("setConversationLoadingStatus", "LOADING");
        if (!getters.areConversationListAlreadyLoaded) {
            const db = getFirestore();
            const user = getters.getAuthUser;
            const conversationRef = collection(db, "Conversations");
            const q = query(
                conversationRef,
                where("members", "array-contains", user.id),
                orderBy("createdAt", "desc")
            );

      /*const unsubscribe = */ onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    const id = change.doc.id;
                    const conversation = { id, ...change.doc.data() };
                    if (change.type === "added") {
                        commit("setConversation", conversation);
                    }
                    if (change.type === "modified") {
                        console.log("Modified Conversation: ", change.doc.data());
                        commit("updateConversation", conversation);
                    }
                    if (change.type === "removed") {
                        console.log("Removed Conversation: ", conversation);
                    }
                });
            });
        }
        commit("setConversationLoadingStatus", "COMPLETED");
        commit("setConversationsAreLoaded");
    },
    updateConversation({ getters }, message) {
        const conversation = getters.getSelectedConversation;
        const db = getFirestore();
        const user = getters.getAuthUser;
        const conversationRef = doc(db, "Conversations", conversation.id);

        conversation.membersInfo.forEach((member) => {
            if (member.id == user.id) {
                member.name = user.name;
                (member.photo = user.image), (member.hasReadLastMessage = true);
                member.type = "available";
            }
        });

        updateDoc(conversationRef, {
            sentAt: new Date(new Date().toISOString()).getTime(),
            senderName: user.name,
            senderId: user.id,
            lastMessage: message.message,
            membersInfo: conversation.membersInfo,
        });
    },
    async createConversation({ getters, commit }, user) {
        const db = getFirestore();
        const authUser = getters.getAuthUser;
        const newConvId = new Date().getTime().toString() + "convId";
        const conversationRef = doc(db, "Conversations", newConvId);

        const membersInfo = [
            {
                id: user.id,
                name: user.name,
                photo: user.photo,
                type: "available",
                hasReadLastMessage: false,
            },
            {
                id: authUser.id,
                name: authUser.name,
                photo: authUser.image,
                type: "available",
                hasReadLastMessage: true,
            },
        ];
        const members = [user.id, authUser.id];

        const newCov = {
            id: newConvId,
            senderName: user.name,
            senderId: user.id,
            lastMessage: null,
            members,
            membersInfo,
            title: "",
            createdBy: authUser.id,
            sentAt: new Date(new Date().toISOString()).getTime(),
            createdAt: new Date(new Date().toISOString()).getTime(),
        };

        await setDoc(conversationRef, newCov);
        commit("setSelectedConversation", newCov);
    },

    async getUserDataFromApi({ commit }, userId) {
        const user = await Api.get(`profile?user=${userId}`);
        console.log(user);
        commit("setNewConversationUser", {
            id: user.id,
            name: user.name,
            photo: user.image,
            hasReadLastMessage: false,
            type: "available",
        });
    },

    async sendCustomOfferToBuyerOnChat({ getters, dispatch }, payload) {
        console.log(payload);
        const db = getFirestore();
        const newDocId = new Date().getTime().toString() + "id";

        const selectedConversation = getters.getSelectedConversation;
        if (!selectedConversation) {
            return;
        }

        const chatRef = doc(
            collection(db, `Conversations/${selectedConversation.id}/Messages`),
            newDocId
        );

        const newMessage = {
            message: payload.description,
            attachment: "",
            attachementType: 0,
            sentAt: new Date(new Date().toISOString()).getTime(),
            refersGig: false,
            senderId: getters.getAuthUser.id,
            messageOffer: payload,
            messageGig: getters.getReferrerGig,
            deleteMessage: [],
            id: newDocId,
        };

        console.log("New Message", newMessage);
        setDoc(chatRef, newMessage);
        dispatch("updateConversation", newMessage);
    },

    async withdrawOffer({commit, getters, dispatch}, docID) {

        commit('setWithdrawLoadingStatus', 'LOADING');
        const selectedConversation = getters.getSelectedConversation;
        const messages = getters.getMessages;

        const db = getFirestore();

        const chatRef = doc(collection(db, `Conversations/${selectedConversation.id}/Messages`), docID);

        updateDoc(chatRef, {
            'messageOffer.status': 2
        });

        // update the message offer status
        const message = messages.find(message => message.id === docID)
        if(message && message.messageOffer.status === 0) {
            message.messageOffer.status = 2;
        }

        dispatch("updateConversation", message);
        commit('setWithdrawLoadingStatus', 'COMPLETED');
    }
};

export const getters = {
    getMessages: (state) => state.messages,
    getSelectedConversation: (state) => state.selectedConversation,
    getConversations: (state) => state.conversations,
    getConversationListStatus: (state) => state.conversationLoadingStatus,
    getChatLoadingStatus: (state) => state.chatLoadingStatus,
    getSelectedChatListenerRef: (state) => state.selectedChatListenerRef,
    getChatMessages: (state) => state.messages,
    getReferrerGig: (state) => state.referrerGig,
    isConversationNew: (state) => state.isConversationNew,
    areConversationListAlreadyLoaded: (state) => state.areConversationsLoaded,
    getNewConversationUser: (state) => state.newConversationUser,
    hasMoreMessages: state => state.hasMoreMessages,
    getSelectedCustomOffer: state => state.customServiceOffer,
    getMessageOfferLoadingStatus: state => state.msgOfferLoadingStatus
};
