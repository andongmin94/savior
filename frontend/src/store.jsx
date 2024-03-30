import create from "zustand";

export const useStore = create((set) => ({
  username: undefined,
  setUsername(res) {
    set(() => ({ username: res }));
  },
  email: undefined,
  setEmail(res) {
    set(() => ({ email: res }));
  },
  ageRange: undefined,
  setAgeRange(res) {
    set(() => ({ ageRange: res }));
  },
  gender: undefined,
  setGender(res) {
    set(() => ({ gender: res }));
  },
  profileImage: undefined,
  setProfileImage(res) {
    set(() => ({ profileImage: res }));
  },
}));
