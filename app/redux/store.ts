import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    User: userReducer,
  },
})

// Types for TypeScript
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
