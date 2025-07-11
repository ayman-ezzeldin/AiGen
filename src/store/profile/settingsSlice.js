import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
// import axiosInstance from "../../store/axiosInstance";

// Async thunks
export const getProfileData = createAsyncThunk(
  "settings/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance("/profile/");
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.detail ||
        "Failed to get profile data, please check internet connection";
      return rejectWithValue(errorMessage);
    }
  },
);

export const editProfileData = createAsyncThunk(
  "settings/editProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/profile/", formData);
      return response.data;
    } catch (error) {
      console.log("Edit profile error:", error.response?.data);

      const errorMessage =
        error.response.data.detail ||
        "Failed to get profile data, please check internet connection";
      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteImage = createAsyncThunk(
  "settings/deleteImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch("/profile/", formData);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response.data.detail || "Failed to delete image";
      return rejectWithValue(errorMessage);
    }
  },
);

export const changePassword = createAsyncThunk(
  "settings/changePassword",
  async (account, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/change-password/", {
        old_password: account.old_password,
        new_password: account.new_password,
        confirm_password: account.confirm_password,
      });
      return response.data;
    } catch (error) {
      const resData = error.response?.data;

      let errorMessage = "Failed to change password";

      if (resData && typeof resData === "object") {
        errorMessage = Object.values(resData).flat().join(" - ");
      }

      return rejectWithValue(errorMessage);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  "settings/deleteAccount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete("/users/delete/");
      return response.data;
    } catch (error) {
      const resData = error.response?.data;

      let errorMessage = "Failed to delete account, check internet connection";

      if (resData && typeof resData === "object") {
        errorMessage = Object.values(resData).flat().join(" - ");
      }

      return rejectWithValue(errorMessage);
    }
  },
);

// Initial state
const initialState = {
  user: {
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "@example.com",
    profile: {
      full_name: "",
      bio: "",
      image: "",
      verified: false,
    },
  },
  status: {
    getProfile: "idle",
    editProfile: "idle",
    deleteImage: "idle",
    changePassword: "idle",
    deleteAccount: "idle",
  },
  error: {
    getProfile: null,
    editProfile: null,
    deleteImage: null,
    changePassword: null,
    deleteAccount: null,
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
    old_password: "",
    new_password: "",
    confirm_password: "",
  },
};

// Helpers
const getActionKey = (action) => action.type.split("/")[1];

// Slice
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
      const { url } = action.payload;
      state.user.profile.image = url;
    },
    updateTheme: (state, action) => {
      state.appearance.theme = action.payload;
    },
    updateAccountPassword: (state, action) => {
      const { key, value } = action.payload;
      state.account[key] = value;
    },
    resetEditStatus: (state) => {
      state.status.editProfile = "idle";
      state.error.editProfile = null;
    },
    resetPasswordInputs: (state) => {
      state.account.old_password = "";
      state.account.new_password = "";
      state.account.confirm_password = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(editProfileData.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.user.profile.image = action.payload;
      })

      // 🟡 Matchers
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          const key = getActionKey(action);
          if (state.status[key] !== undefined) state.status[key] = "loading";
          if (state.error[key] !== undefined) state.error[key] = null;
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          const key = getActionKey(action);
          if (state.status[key] !== undefined) state.status[key] = "succeeded";
        },
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          const key = getActionKey(action);
          if (state.status[key] !== undefined) state.status[key] = "failed";
          if (state.error[key] !== undefined) state.error[key] = action.payload;
        },
      );
  },
});

// Exports
export const {
  updateUser,
  updateNotifications,
  updateProfileImage,
  updateTheme,
  updateAccountPassword,
  resetEditStatus,
  resetPasswordInputs,
} = settingsSlice.actions;

export default settingsSlice.reducer;