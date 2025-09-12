import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useChatStore = create((set) => ({
    messages: [],
    messageLoading: false,

    sendMessage: async (data) => {
        set({ messageLoading: true })

        try {
            await axios.post("/contact/send", data);
            set({ messageLoading: false })
            toast.success("Message sent successfully");
            return {success: true}
        } catch (error) {
            toast.error(error.response.data.error);
            set({ messageLoading: false });
            console.log(error);
        }
    },
    getMessages: async () => {
        set({ messageLoading: true });
        try {
            const res = await axios.get("/contact");
            set({ messages: res.data.messages, messageLoading: false });
        } catch (error) {
            set({ messageLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    deleteMessage: async (id) => {
        set({ messageLoading: true });
        try {
            await axios.delete(`/contact/delete/${id}`);
            set((state) => ({
                messages: state.messages.filter((message) => message._id !== id),
                messageLoading: false
            }));
            toast.success("Message deleted successfully");
        } catch (error) {
            set({ messageLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
}))