import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'https://lucky0wl.pythonanywhere.com/';

// ✅ Your backend base URL
const API_URL = 'http://127.0.0.1:8000/';

// ✅ Helper: Decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return {};
  }
};

const initialState = {
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('accessToken'),
  user: null,
  isVerified: false,
  verificationError: null,
  isLoading: false,
};

// ============ 🔐 Thunks ============

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}register/`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const loginUser = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}login/`, userData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const verifyMail = createAsyncThunk('auth/verify-email', async (userData, { getState, rejectWithValue }) => {
  try {
    const state = getState();
    const token = state.auth.accessToken || localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('No access token available');
    }

    const response = await axios.post(`${API_URL}verify-email/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Verification error:', error.response?.data || error.message);
    return rejectWithValue(error.response?.data || { message: error.message });
  }
});

// ✅✅ ✅ UPDATED checkAuth: uses token from localStorage
export const checkAuth = createAsyncThunk('auth/checkauth', async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem('accessToken');
    if (!token) throw new Error('No token in localStorage');

    const response = await axios.get(`${API_URL}check-auth/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });

    return { success: true, user: response.data };
  } catch (error) {
    console.error('checkAuth error:', error);
    return rejectWithValue({ success: false });
  }
});

// ============ 🧠 Slice ============

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.isVerified = false;
      state.verificationError = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
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
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.isVerified = false;
        state.verificationError = action.payload?.message || 'Registration failed';
        state.user = null;
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
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
        localStorage.setItem('accessToken', action.payload.access);
        localStorage.setItem('refreshToken', action.payload.refresh);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.verificationError = action.payload?.message || 'Login failed';
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
        state.verificationError = action.payload?.detail || action.payload?.message || 'Verification failed';
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
    const token = localStorage.getItem('accessToken');
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

  const token = localStorage.getItem('accessToken');
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

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
