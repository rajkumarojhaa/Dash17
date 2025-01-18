import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

export interface Task {
  id: number
  title: string
  description: string
  status: 'In Progress' | 'Completed'
}

interface TasksState {
  tasks: Task[]
  loading: boolean
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
}

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await fetch('/api/tasks')
  const data = await response.json()
  return data
})

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find(t => t.id === action.payload)
      if (task) {
        task.status = task.status === 'In Progress' ? 'Completed' : 'In Progress'
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch tasks'
      })
  },
})

export const { toggleTaskStatus } = tasksSlice.actions
export default tasksSlice.reducer

