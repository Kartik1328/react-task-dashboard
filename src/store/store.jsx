import { configureStore } from '@reduxjs/toolkit'
import taskReducer from './taskSlice'

const store = configureStore({
  reducer: {
    tasks: taskReducer,   // "tasks" becomes the key in global state
  },
})

export default store

// These two types are used throughout the app
// RootState = shape of entire store
// AppDispatch = type of dispatch function
export const { getState } = store