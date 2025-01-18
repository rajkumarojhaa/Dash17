import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./tasks/tasksSlice"
import userReducer from "./user/userSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

