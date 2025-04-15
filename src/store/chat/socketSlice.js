import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
  },
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    closeSocket: (state) => {
      if (state.socket) {
        state.socket.close();
      }
      state.socket = null;
    },
  },
});

export const { setSocket, closeSocket } = socketSlice.actions;
export default socketSlice.reducer;
