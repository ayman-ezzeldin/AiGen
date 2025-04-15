import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch rooms with authorization
export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('accessToken');

      const res = await axios.get('http://127.0.0.1:8000/chat/rooms/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      // Validate that data is an array
      if (!Array.isArray(data)) {
        return thunkAPI.rejectWithValue('Invalid rooms format from server');
      }

      return data;
    } catch (err) {
      // Optional: log error to console for debugging
      console.error('fetchRooms error:', err);

      // You can also include the error message for better debugging
      return thunkAPI.rejectWithValue(err.response?.data?.detail || 'Failed to fetch rooms');
    }
  }
);

// Rooms slice
const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    rooms: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default roomsSlice.reducer;
