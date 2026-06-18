import { createContext, useContext, useReducer, useState, useEffect} from 'react'
import { taskReducer, initialTasks } from '../reducers/TaskReducer'
import { useFetch } from '../hooks/useFetch'


// 1. Create the context (just an empty container for now)
const TaskContext = createContext(null)

// 2. Provider — wraps your app, holds the actual state
export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, initialTasks)
  const [activeFilter, setActiveFilter] = useState('all')

    // Fetch from API on mount
  const { data, loading, error } = useFetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=8'
  )

  useEffect(() => {
    if (!data) return
    // Shape the API response to match our task format
    const fetched = data.map((item) => ({
      id: item.id + 1000,   // offset to avoid ID clash with local tasks
      title: item.title,
      description: 'Fetched from JSONPlaceholder API',
      status: item.completed ? 'done' : 'todo',
      priority: 'medium',
    }))
    dispatch({ type: 'FETCH_TASKS', payload: [...initialTasks, ...fetched] })
  }, [data])


  // Derived state — computed here, available everywhere
  const filteredTasks = activeFilter === 'all'
    ? tasks
    : tasks.filter((task) => task.status === activeFilter)

  // Action dispatchers — clean API for components to use
  function addTask(task) {
    dispatch({ type: 'ADD_TASK', payload: { ...task, id: Date.now() } })
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE_TASK', payload: id })
  }

  function updateStatus(id, status) {
    dispatch({ type: 'UPDATE_STATUS', payload: { id, status } })
  }
// type is what happened, payload is the data that came with it.

  const value = {
    tasks,
    filteredTasks,
    activeFilter,
    setActiveFilter,
    addTask,
    deleteTask,
    updateStatus,
    loading,
    error,      
  }

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

// 3. Custom hook — clean way to consume context
export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used inside TaskProvider')
  }
  return context
}