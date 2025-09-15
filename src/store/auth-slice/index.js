import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";
import AuthAxiosInstance from "./AuthAxiosInstance";

// ✅ Helper: Decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding token:", error);
    return {};
  }
};

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  isAuthenticated: !!localStorage.getItem("accessToken"),
  user: null,
  isVerified: false,
  verificationError: null,
  isLoading: false,
  forgotPasswordMessage: null,
  forgotPasswordError: null,
  verifyOtpMessage: null,
  verifyOtpError: null,
  resetPasswordMessage: null,
  resetPasswordError: null,
};

// ============ 🔐 Thunks ============

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}register/`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}login/`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await AuthAxiosInstance.get("check-auth/");
      return { success: true, user: response.data };
    } catch (error) {
      return rejectWithValue({ success: false });
    }
  }
);

// For verifyMail, use axiosInstance too
export const verifyMail = createAsyncThunk(
  "auth/verify-email",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await AuthAxiosInstance.post("verify-email/", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const requestOtp = createAsyncThunk(
  "auth/request-otp",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const token =
        state.auth.accessToken || localStorage.getItem("accessToken");

      const response = await axios.post(
        `${API_URL}request-otp/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot-password",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}forgot-password/request/`, {
        email: email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const verifyPasswordOtp = createAsyncThunk(
  "auth/verify-password-otp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}forgot-password/verify-otp/`,
        {
          email: email,
          otp: otp,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset-password",
  async ({ email, new_password, confirm_password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}forgot-password/reset/`, {
        email: email,
        new_password: new_password,
        confirm_password: confirm_password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// ============ 🧠 Slice ============

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isVerified = false;
      state.verificationError = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isVerified = false;
        state.verificationError = null;
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        const decodedToken = decodeToken(action.payload.access);
        state.user = {
          user_id: decodedToken.user_id,
          username: decodedToken.username,
          email: decodedToken.email,
          full_name: decodedToken.full_name,
          bio: decodedToken.bio,
          image: decodedToken.image,
        };
        state.isVerified = decodedToken.verified || false;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isVerified = false;
        state.verificationError =
          action.payload?.message || "Registration failed";
        state.user = null;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      })
      .addCase(loginUser.pending, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.verificationError = null;
        state.user = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
        const decodedToken = decodeToken(action.payload.access);
        state.user = {
          user_id: decodedToken.user_id,
          username: decodedToken.username,
          email: decodedToken.email,
          full_name: decodedToken.full_name,
          bio: decodedToken.bio,
          image: decodedToken.image,
        };
        state.isVerified = decodedToken.verified || false;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.verificationError = action.payload?.message || "Login failed";
        state.user = null;
      })
      .addCase(verifyMail.pending, (state) => {
        state.verificationError = null;
      })
      .addCase(verifyMail.fulfilled, (state) => {
        state.isVerified = true;
        state.user = { ...state.user, isVerified: true };
      })
      .addCase(verifyMail.rejected, (state, action) => {
        state.verificationError =
          action.payload?.detail ||
          action.payload?.message ||
          "Verification failed";
      })
      // ✅ ✅ FIXED checkAuth response handling
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;

        if (action.payload?.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
          state.isVerified = action.payload.user.verified || false;
        } else {
          const token = localStorage.getItem("accessToken");
          if (token) {
            const decoded = decodeToken(token);
            state.user = {
              user_id: decoded.user_id,
              username: decoded.username,
              email: decoded.email,
              full_name: decoded.full_name,
              bio: decoded.bio,
              image: decoded.image,
            };
            state.isAuthenticated = true;
            state.isVerified = decoded.verified || false;
          } else {
            state.user = null;
            state.isAuthenticated = false;
            state.isVerified = false;
          }
        }
      })

      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;

        const token = localStorage.getItem("accessToken");
        if (token) {
          const decoded = decodeToken(token);
          state.user = {
            user_id: decoded.user_id,
            username: decoded.username,
            email: decoded.email,
            full_name: decoded.full_name,
            bio: decoded.bio,
            image: decoded.image,
          };
          state.isAuthenticated = true;
          state.isVerified = decoded.verified || false;
        } else {
          state.user = null;
          state.isAuthenticated = false;
          state.isVerified = false;
        }
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordMessage = null;
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPasswordMessage =
          action.payload.message || "OTP sent to your email successfully";
        state.forgotPasswordError = null;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.forgotPasswordError =
          action.payload?.message || "Failed to send OTP";
        state.forgotPasswordMessage = null;
      })
      .addCase(verifyPasswordOtp.pending, (state) => {
        state.verifyOtpMessage = null;
        state.verifyOtpError = null;
      })
      .addCase(verifyPasswordOtp.fulfilled, (state, action) => {
        state.verifyOtpMessage =
          action.payload.message || "OTP verified successfully";
        state.verifyOtpError = null;
      })
      .addCase(verifyPasswordOtp.rejected, (state, action) => {
        state.verifyOtpError = action.payload?.message || "Invalid OTP";
        state.verifyOtpMessage = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.resetPasswordMessage = null;
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.resetPasswordMessage =
          action.payload.message || "Password reset successfully";
        state.resetPasswordError = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordError =
          action.payload?.message || "Failed to reset password";
        state.resetPasswordMessage = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
