import create from 'zustand';

export const useStore = create((set) => ({
  username: undefined,
  setUsername: (username) => set({ username }),
  email: undefined,
  setEmail: (email) => set({ email }),
  ageRange: undefined,
  setAgeRange: (ageRange) => set({ ageRange }),
  gender: undefined,
  setGender: (gender) => set({ gender }),
  profileImage: undefined,
  setProfileImage: (profileImage) => set({ profileImage }),
}));
