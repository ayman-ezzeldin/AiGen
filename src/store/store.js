import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js'
import chatReducer from './chat/chatSlice.js'
import roomsReducer from './chat/roomsSlice.js'
import messagesReducer from './chat/messagesSlice.js'

const store = configureStore({
  reducer: {
    auth : authReducer,
    chat: chatReducer,
    rooms: roomsReducer,
    messages: messagesReducer,
  },
})

export default store