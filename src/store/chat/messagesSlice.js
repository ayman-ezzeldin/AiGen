import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API_URL from "../../utils/api";

// 📦 Get messages from backend
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (roomName, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`${API_URL}chat/messages/${roomName}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      console.error("❌ Error fetching messages:", err);
      return thunkAPI.rejectWithValue("Failed to fetch messages");
    }
  }
);

// 🧠 Redux Slice
const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
    selectedRoom: null,
  },
  reducers: {
    // ✅ Add single message (from WebSocket OR manually)
    addMessage(state, action) {
      const payload = action.payload;

      if (payload?.type === "message" && payload?.data) {
        state.messages.push(payload.data);
      } else {
        state.messages.push(payload);
      }
    },

    // ✅ Select room to load messages
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
    },

    // ✅ Clear messages on room switch or logout
    clearMessages(state) {
      state.messages = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// 🧾 Exports
export const { addMessage, setSelectedRoom, clearMessages } =
  messagesSlice.actions;

export default messagesSlice.reducer;
