import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

export const useEventStore = create((set, get) => ({
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
            set((state) => ({
                events: [state.events, res.data.event],
                eventLoading: false
            }));
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
            get().getAllEvents();
            set({ registerLoading: false });
            toast.success("Participation successfully");
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
    },
    attendEvent: async (id, userId) => {
        set({ eventLoading: true });
        try {
            await axios.patch(`/event/attended/${id}/${userId}`);

            // Update allUsers
            useAuthStore.setState((state) => ({
                allUsers: state.allUsers.map((u) =>
                    u._id === userId
                        ? {
                            ...u,
                            registeredEvents: [
                                ...u.registeredEvents,
                                { eventId: id, status: "attended" },
                            ],
                        }
                        : u
                ),
            }));

            // Update events (force string compare to prevent duplicate)
            set((state) => ({
                events: state.events.map((event) =>
                    event._id === id
                        ? {
                            ...event,
                            status: "ongoing",
                            participants: event.participants.map((p) =>
                                String(p.user._id) === String(userId)
                                    ? { ...p, attended: true }
                                    : p
                            ),
                        }
                        : event
                ),
                eventLoading: false,
            }));

            toast.success("User attended event successfully");
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response?.data?.error || "Failed to mark attendance");
            console.error(error);
        }
    },

    issueCertificate: async (id, userId) => {
        set({ eventLoading: true });
        try {
            await axios.patch(`/event/issueCertificate/${id}/${userId}`);
            // Update allUsers
            useAuthStore.setState((state) => ({
                allUsers: state.allUsers.map((u) =>
                    u._id === userId
                        ? {
                            ...u,
                            registeredEvents: [
                                ...u.registeredEvents,
                                { eventId: id, certificateIssued: "attended" },
                            ],
                        }
                        : u
                ),
            }));

            set((state) => ({
                events: state.events.map((event) =>
                    event._id === id
                        ? {
                            ...event,
                            status: "completed",
                            participants: event.participants.map((p) =>
                                String(p.user._id) === String(userId)
                                    ? { ...p, certificateIssued: true }
                                    : p
                            ),
                        }
                        : event
                ),
                eventLoading: false,
            }));

            toast.success("Certificate issued successfully");
        } catch (error) {
            set({ eventLoading: false });
            toast.error(error.response?.data?.error || "Failed to issue certificate");
            console.error(error);
        }
    }
}))