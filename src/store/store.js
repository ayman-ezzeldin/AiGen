import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js'
import chatReducer from './chat/chatSlice.js'
import roomsReducer from './chat/roomsSlice.js'
import messagesReducer from './chat/messagesSlice.js'
import socketReducer from './chat/socketSlice.js'

const store = configureStore({
  reducer: {
    auth : authReducer,
    chat: chatReducer,
    rooms: roomsReducer,
    messages: messagesReducer,
    socket: socketReducer,
  },
})

export default store