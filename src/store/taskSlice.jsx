import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ─── Initial state ───────────────────────────────────────────────
const localTasks = [
  {
    id: 1,
    title: 'Set up Redux Toolkit',
    description: 'Replace Context API with RTK store and slices',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Create task slice',
    description: 'createSlice with reducers and extraReducers',
    status: 'todo',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Add RTK Query',
    description: 'createApi to replace useFetch custom hook',
    status: 'todo',
    priority: 'medium',
  },
]

// ─── Async thunk — fetch tasks from API ──────────────────────────
// createAsyncThunk takes:
// 1. action type string (prefix/actionName)
// 2. async function that returns the data
export const fetchTasksFromAPI = createAsyncThunk(
  'tasks/fetchFromAPI',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos?_limit=6'
      )
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()

      // Shape API response to match our task format
      return data.map((item) => ({
        id: item.id + 100,
        title: item.title,
        description: 'Fetched via createAsyncThunk',
        status: item.completed ? 'done' : 'todo',
        priority: 'medium',
      }))
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// ─── Slice ────────────────────────────────────────────────────────
const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: localTasks,        // the actual task array
    activeFilter: 'all',
    status: 'idle',           // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  // reducers = synchronous actions
  // Immer is active here — you CAN mutate state directly
  reducers: {
    addTask: (state, action) => {
      state.items.unshift({   // unshift = add to front — direct mutation, Immer handles it
        ...action.payload,
        id: Date.now(),
      })
    },

    deleteTask: (state, action) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },

    updateStatus: (state, action) => {
      const task = state.items.find((t) => t.id === action.payload.id)
      if (task) task.status = action.payload.status  // direct mutation — Immer magic
    },

    setFilter: (state, action) => {
      state.activeFilter = action.payload
    },
  },

  // extraReducers = handle async thunk lifecycle
  // pending → loading → fulfilled OR rejected
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksFromAPI.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTasksFromAPI.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Append API tasks to local tasks, avoid duplicates
        const existingIds = new Set(state.items.map((t) => t.id))
        const newTasks = action.payload.filter((t) => !existingIds.has(t.id))
        state.items.push(...newTasks)
      })
      .addCase(fetchTasksFromAPI.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

// Export actions — these are what components dispatch
export const { addTask, deleteTask, updateStatus, setFilter } = taskSlice.actions

// Export selectors — these are what components read
// Selectors are just functions that take state and return a piece of it
export const selectAllTasks = (state) => state.tasks.items
export const selectFilter = (state) => state.tasks.activeFilter
export const selectStatus = (state) => state.tasks.status
export const selectError = (state) => state.tasks.error

// Derived selector — filtered tasks computed from store
export const selectFilteredTasks = (state) => {
  const tasks = state.tasks.items
  const filter = state.tasks.activeFilter
  if (filter === 'all') return tasks
  return tasks.filter((t) => t.status === filter)
}

export default taskSlice.reducer