import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import userReducer from "@/lib/features/user/userSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    tasks: tasksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

