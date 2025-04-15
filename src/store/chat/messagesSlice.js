import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch messages for a specific room
export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (roomName, thunkAPI) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(`http://127.0.0.1:8000/chat/messages/${roomName}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Failed to fetch messages");
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    loading: false,
    error: null,
    selectedRoom: null, 
  },
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setSelectedRoom(state, action) {
      state.selectedRoom = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
    }
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

export const { addMessage, setSelectedRoom, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
