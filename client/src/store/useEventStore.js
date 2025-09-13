import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useEventStore = create((set) => ({
    events: [],
    eventLoading: false,
    updateEventLoading: false,
    registerLoading: false,

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
    getAllApprovedEvents: async () => {
        set({ eventLoading: true });
        try {
            const res = await axios.get("/event/getAllApprovedEvents");
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
    updateEvent: async (id, data) => {
        set({ updateEventLoading: true });
        try {
            const res = await axios.put(`/event/edit/${id}`, data);
            set((state) => ({
                events: state.events.map((event) =>
                    event._id === id ? { ...event, ...res.data.event } : event
                ),
                updateEventLoading: false
            }))
            toast.success("Event updated successfully");
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
    },
    participateInEvent: async (id) => {
        set({ registerLoading: true });
        try {
            const res = await axios.post(`/event/register/${id}`);
            useAuthStore.setState((state) => ({
                participatedEvents: [res.data.eventId?._id, ...(state.participatedEvents || [])]
            }));
            set({ registerLoading: false });
            toast.success("Event registered successfully");
        } catch (error) {
            set({ registerLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    postFeedback: async (id, data) => {
        set({ eventLoading: true }); // should start as true while posting
        try {
            const res = await axios.post(`/event/feedback/${id}`, data);

            set((state) => ({
                events: state.events.map((event) =>
                    event._id === id ? res.data.event : event
                ),
                eventLoading: false,
            }));

            toast.success("Feedback posted successfully");
            return { success: true }
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response?.data?.error || "Failed to post feedback");
            console.error(error);
        }
    }
}))