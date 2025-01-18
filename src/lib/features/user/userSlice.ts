import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/store/store"

interface UserState {
  name: string
  avatar: string
}

const initialState: UserState = {
  name: "John Doe",
  avatar: "https://github.com/shadcn.png",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name
      state.avatar = action.payload.avatar
    },
  },
})

export const { setUser } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer

