import { createSlice } from "@reduxjs/toolkit";
import defaultProfile from "../../profile/assets/me.jpeg";

const initialState = {
  user: {
    name: "mohamed",
    lastName: "nofal",
    username: "mohamedNofal",
    email: "mohamedNofal123@mail.com",
    jobTitle: "Software engineer",
    country: "Egypt",
    bio: "",
    profileImage: defaultProfile,
    profileImageFile: null,
  },
  notifications: {
    inApp: true,
    push: false,
    email: false,
  },
  appearance: {
    theme: "systemTheme",
  },
  account: {
    newPassword: "",
    confirmPassword: "",
  },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },

    updateNotifications: (state, action) => {
      state.notifications = { ...state.notifications, ...action.payload };
    },

    updateProfileImage: (state, action) => {
      const { file, url } = action.payload;
      state.user.profileImageFile = file;
      state.user.profileImage = url || state.user.profileImage;
    },

    updateTheme: (state, action) => {
      state.appearance.theme = action.payload;
    },

    updateAccountPassword: (state, action) => {
      const { newPassword, confirmPassword } = action.payload;
      state.account.newPassword = newPassword;
      state.account.confirmPassword = confirmPassword;
    },
  },
});

export const {
  updateUser,
  updateNotifications,
  updateProfileImage,
  updateTheme,
  updateAccountPassword,
} = settingsSlice.actions;
settingsSlice.actions;
export default settingsSlice.reducer;
