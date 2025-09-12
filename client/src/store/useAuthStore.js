import axios from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    allUsers: [],
    userLoading: false,
    updateUserLoading: false,
    gettingUsersLoading: false,
    switchActivationLoading: false,
    createOrganizerLoading: false,
    authLoading: false,

    checkAuth: async () => {
      set({authLoading: true});
      await new Promise((resolve) => setTimeout(resolve, 2000));
      try {
        const res = await axios.get("/auth/me");
        set({ user: res.data, authLoading: false });
      } catch (error) {
        console.log(error);
        set({user: null, authLoading: false});
      }  
    },
    signup: async (data) => {
        set({ userLoading: true });
        try {
            const res = await axios.post("/auth/signup", data);
            set({ user: res.data?.user, userLoading: false });
        } catch (error) {
            toast.error(error.response.data.error);
            set({ userLoading: false, user: null });
            console.log(error);
            
        }
    },
    signin: async (data) => {
        set({ userLoading: true });
        try {
            const res = await axios.post("/auth/login", data);
            set({ user: res.data?.user, userLoading: false });
        } catch (error) {
            toast.error(error.response.data.error);
            set({ userLoading: false, user: null });
            console.log(error);
        }
    },
    signout: async () => {
        set({ userLoading: true });
        try {
            await axios.post("/auth/logout");
            set({ user: null, allUsers: [], userLoading: false });
        } catch (error) {
            set({ userLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    updateUser: async (data) => {
        set({updateUserLoading: true});
        try {
            const res = await axios.put('/auth/update', data);
            set({user: res.data?.user, updateUserLoading: false});
            toast.success("Updated successfully");
        } catch (error) {
            set({ updateUserLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    
    getAllUsers: async () => {
        set({ gettingUsersLoading: true });
        try {
            const res = await axios.get("/auth/getAllUsers");
            set({ gettingUsersLoading: false, allUsers: res.data.users });
        } catch (error) {
            set({ gettingUsersLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
        }
    },
    switchActivation: async (id) => {
      set({switchActivationLoading: true});

      try {
        const res = await axios.patch(`/auth/switchActivation/${id}`);
        set((state) => {
          const updatedUsers = state.allUsers.map((user) => {
            if (user._id === id) {
              return { ...user, isActive: !user.isActive };
            }
            return user;
          });
          return { allUsers: updatedUsers, switchActivationLoading: false };
        });
        toast.success(`${res.data.message}`);
      } catch (error) {
        set({ gettingUsersLoading: false });
            toast.error(error.response.data.error);
            console.log(error);
      }
    },
    createOrganizer: async (data) => {
        set({ createOrganizerLoading: true });
        try {
            const res = await axios.post("/auth/createOranizer", data);
            set((state) => {
                state.allUsers.push(res.data.user);
                return { createOrganizerLoading: false };
            });
            toast.success("Organizer added successfully");
            return {success: true};
        } catch (error) {
            toast.error(error.response.data.error);
            set({ createOrganizerLoading: false });
            console.log(error);
            
        }
    }
}));