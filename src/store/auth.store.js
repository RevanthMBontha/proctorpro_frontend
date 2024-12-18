import { create } from "zustand";

const useAuthStore = create((set) => ({
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  tests: [],

  //   Function to set first name
  setFirstName: (value) => set(() => ({ firstName: value })),

  //   Function to set last name
  setLastName: (value) => set(() => ({ lastName: value })),

  //   Function to set email
  setEmail: (value) => set(() => ({ email: value })),

  //   Function to set Tests
  setTests: (value) => set(() => ({ tests: value })),
}));

export default useAuthStore;
