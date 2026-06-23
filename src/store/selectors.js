// Re-export everything from taskSlice for clean imports
export {
  selectAllTasks,
  selectFilter,
  selectStatus,
  selectError,
  selectFilteredTasks,
} from './taskSlice'

// Memoized selector using RTK's built-in createSelector
// Use when selector does expensive computation
import { createSelector } from '@reduxjs/toolkit'
import { selectAllTasks } from './taskSlice'

export const selectTaskStats = createSelector(
  [selectAllTasks],   // input selectors
  (tasks) => ({       // result function — only reruns when tasks changes
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
    highPriority: tasks.filter((t) => t.priority === 'high').length,
  })
)