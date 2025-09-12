import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useEventStore = create((set) => ({
    events: [],
    eventLoading: false,

    getAllEvents: async () => {
        set({ eventLoading: true });
        try {
            const res = await axios.get("/event/getAllEvents");
            set({ eventLoading: false, events: res.data.events });
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    createEvent: async (data) => {
        set({ eventLoading: true });
        try {
            const res = await axios.post("/event/create", data);
            set((state) => {
                state.events.push(res.data.event);
                return { eventLoading: false };
            });
            toast.success("Event created successfully");
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    }
}))