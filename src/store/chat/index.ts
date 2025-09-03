import { nextTick } from "vue";
import { defineStore } from "pinia";

interface ChatSession {
    id: string;
    userId: string;
    messages: Array<{
        sender: "user" | "bot";
        content: string;
        timestamp: number;
    }>;
}

export const useChatStore = defineStore("chat", {
    state: () => ({
        openChat: false,
        chatSession: <ChatSession>{
            id: "",
            userId: "",
            openChat: false,
            messages: [],
        },
    }),
    actions: {
        setChatSession(data: ChatSession) {
            this.chatSession = data;
        },
        resetChatSession() {
            this.chatSession = {} as ChatSession;
        },
        setOpenChat(status: boolean) {
            this.openChat = status;
        },
    },
    getters: {
        getChatSession(): ChatSession {
            return this.chatSession;
        },
    },
});
