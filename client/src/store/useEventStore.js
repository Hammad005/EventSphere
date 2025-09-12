import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useEventStore = create((set) => ({
    events: [],
    eventLoading: false,
    updateEventLoading: false,

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
            return { success: true }
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    removeEvent: async (id) => {
        set({ eventLoading: true });
        try {
            await axios.delete(`/event/delete/${id}`);
            set((state) => ({
                events: state.events.filter((event) => event._id !== id),
                eventLoading: false,
            }));
            toast.success("Event deleted successfully");
            return { success: true };
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    updateEvent: async (data) => {
        set({ updateEventLoading: true });
        try {
            const res = await axios.put(`/event/edit/${data._id}`, data);
            set((state) => {
                const updatedEvents = state.events.map((event) => {
                    if (event._id === data._id) {
                        return res.data.event;
                    }
                    return event;
                });
                return { events: updatedEvents, updateEventLoading: false };
            })
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    approveEvent: async (id) => {
        set({ eventLoading: true });
        try {
            const res = await axios.patch(`/event/approve/${id}`);
            useAuthStore.setState((state) => ({
                userNotifications: [res.data.notification, ...(state.userNotifications || [])]
            }));
            set((state) => ({
                events: state.events.map((event) =>
                    event._id === id ? { ...event, approved: true } : event
                ),
                eventLoading: false
            }));
            toast.success("Event approved successfully")
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    }
}))