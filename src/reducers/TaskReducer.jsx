export const initialTasks = [
  {
    id: 1,
    title: 'Set up project structure',
    description: 'Initialize Vite, Tailwind, and folder structure',
    status: 'done',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Build TaskCard component',
    description: 'Create reusable card with props for title, status, priority',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Add task filtering',
    description: 'Filter tasks by status using useState',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Integrate REST API',
    description: 'Fetch tasks from JSONPlaceholder in useEffect',
    status: 'todo',
    priority: 'low',
  },
]

export function taskReducer(state, action) {
  switch (action.type) {

    case 'ADD_TASK':
      return [action.payload, ...state]

    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload)

    case 'UPDATE_STATUS':
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, status: action.payload.status }
          : task
      )

      case 'FETCH_TASKS':
  return action.payload   // replace entire state with fetched tasks

    default:
      return state
  }
}