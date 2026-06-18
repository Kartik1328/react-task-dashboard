// import { useState } from 'react'
// import TaskCard from './TaskCard'
// import TaskForm from './TaskForm'

// const initialTasks = [
//   {
//     id: 1,
//     title: 'Set up project structure',
//     description: 'Initialize Vite, Tailwind, and folder structure',
//     status: 'done',
//     priority: 'high',
//   },
//   {
//     id: 2,
//     title: 'Build TaskCard component',
//     description: 'Create reusable card with props for title, status, priority',
//     status: 'in-progress',
//     priority: 'high',
//   },
//   {
//     id: 3,
//     title: 'Add task filtering',
//     description: 'Filter tasks by status using useState',
//     status: 'todo',
//     priority: 'medium',
//   },
//   {
//     id: 4,
//     title: 'Integrate REST API',
//     description: 'Fetch tasks from JSONPlaceholder in useEffect',
//     status: 'todo',
//     priority: 'low',
//   },
// ]

// function TaskList() {
//   const [tasks, setTasks] = useState(initialTasks)
//   const [activeFilter, setActiveFilter] = useState('all')

//   //TaskList (parent) — defines the function, owns the state
//   function addTask(newTask) {
//   setTasks((prev) => [newTask, ...prev])
// }

// function deleteTask(id) {
//   setTasks((prev) => prev.filter((task) => task.id !== id))
// }

//   const filters = ['all', 'todo', 'in-progress', 'done']

//   const filteredTasks = activeFilter === 'all'
//     ? tasks
//     : tasks.filter((task) => task.status === activeFilter)

//   return (
//     <div className="mt-6">

//           <TaskForm onAddTask={addTask} />

//       {/* Filter buttons */}
//       <div className="flex gap-2 mb-6 flex-wrap">
//         {filters.map((f) => (
//           <button
//             key={f}
//             onClick={() => setActiveFilter(f)}
//             className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
//               ${activeFilter === f
//                 ? 'bg-gray-800 text-white border-gray-800'
//                 : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
//               }`}
//           >
//             {f}
//           </button>
//         ))}

//         {/* Task count badge */}
//         <span className="ml-auto text-sm text-gray-400 self-center">
//           {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
//         </span>
//       </div>

//       {/* Task grid */}
//       {filteredTasks.length === 0 ? (
//         <div className="text-center py-16 text-gray-400">
//           <p className="text-lg">No tasks here</p>
//           <p className="text-sm mt-1">Add a new task or change the filter</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredTasks.map((task) => (
//             <TaskCard
//               key={task.id}
//               title={task.title}
//               description={task.description}
//               status={task.status}
//               priority={task.priority}
//               onDelete={() => deleteTask(task.id)}
//             />
//           ))}
//         </div>
//       )}

//     </div>
//   )
// }

// export default TaskList

import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'
import TaskForm from './TaskForm'

const filters = ['all', 'todo', 'in-progress', 'done']

function TaskList() {
  const { filteredTasks, activeFilter, setActiveFilter, loading, error } = useTasks()

  // These MUST be outside the return — before the JSX starts
  if (loading) return (
    <div className="text-center py-20 text-gray-400">
      <p className="text-lg animate-pulse">Loading tasks...</p>
    </div>
  )

  if (error) return (
    <div className="text-center py-20 text-red-400">
      <p className="text-lg">Failed to load tasks</p>
      <p className="text-sm mt-1">{error}</p>
    </div>
  )

  // Main return only runs if not loading and no error
  return (
    <div className="mt-6">
      <TaskForm />

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors
              ${activeFilter === f
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
          >
            {f}
          </button>
        ))}
        <span className="ml-auto text-sm text-gray-400 self-center">
          {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Task grid */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No tasks here</p>
          <p className="text-sm mt-1">Add a new task or change the filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskList