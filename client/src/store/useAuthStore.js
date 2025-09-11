import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    userLoading: false,
    authLoading: false,

    signup: async (data) => {
        set({ userLoading: true });
        try {
            const res = await axios.post("/auth/signup", data);
            set({ user: res.data, userLoading: false });
        } catch (error) {
            toast.error(error.response.data.error);
            set({ userLoading: false, user: null });
            console.log(error);
            
        }
    },
    signin: async (data) => {
        set({ authLoading: true });
        try {
            const res = await axios.post("/auth/login", data);
            set({ user: res.data, authLoading: false });
        } catch (error) {
            toast.error(error.response.data.error);
            set({ authLoading: false, user: null });
            console.log(error);
        }
    },
    signout: async () => {
        set({ userLoading: true });
        try {
            await axios.post("/auth/logout");
            set({ user: null, userLoading: false });
        } catch (error) {
            set({ userLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
}));