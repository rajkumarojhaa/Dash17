import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "@/lib/features/store"

export interface Task {
  id: number
  title: string
  description: string
  status: "In Progress" | "Completed"
}

interface TasksState {
  tasks: Task[]
}

const initialState: TasksState = {
  tasks: [],
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: number; status: "In Progress" | "Completed" }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id)
      if (task) {
        task.status = action.payload.status
      }
    },
  },
})

export const { setTasks, updateTaskStatus } = tasksSlice.actions

export const selectTasks = (state: RootState) => state.tasks.tasks

export default tasksSlice.reducer

