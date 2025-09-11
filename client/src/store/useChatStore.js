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
    }
}))