// import { memo } from 'react'
// import { useDispatch } from 'react-redux'
// import { deleteTask, updateStatus } from '../../store/taskSlice'

// const statusStyles = {
//   todo: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
//   'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
//   done: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
// }

// const priorityDot = {
//   low: 'bg-green-500',
//   medium: 'bg-yellow-500',
//   high: 'bg-red-500',
// }

// function TaskCardRedux({ task }) {
//   const dispatch = useDispatch()
//   const { id, title, description, status, priority } = task
//   const s = statusStyles[status] || statusStyles['todo']

//   return (
//     <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between gap-2">
//         <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
//         <div className="flex items-center gap-2 shrink-0">
//           <span className={`text-xs px-2 py-1 rounded-full font-medium border ${s.bg} ${s.text} ${s.border}`}>
//             {status}
//           </span>
//           <button
//             onClick={() => dispatch(deleteTask(id))}
//             className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
//           >
//             ×
//           </button>
//         </div>
//       </div>

//       <p className="text-sm text-gray-500 mt-1">{description}</p>

//       <div className="mt-3 flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <span className={`w-2 h-2 rounded-full ${priorityDot[priority]}`}></span>
//           <span className="text-xs text-gray-500 font-medium capitalize">{priority} priority</span>
//         </div>
//         <select
//           value={status}
//           onChange={(e) => dispatch(updateStatus({ id, status: e.target.value }))}
//           className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-gray-400 bg-white text-gray-600"
//         >
//           <option value="todo">Todo</option>
//           <option value="in-progress">In Progress</option>
//           <option value="done">Done</option>
//         </select>
//       </div>
//     </div>
//   )
// }

// export default memo(TaskCardRedux)

import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'    // ← add
import { deleteTask, updateStatus } from '../../store/taskSlice'

// ... statusStyles and priorityDot same as before ...

const statusStyles = {
  todo: { bg: 'bg-gray-100', text: 'text-gray-600', border: 'border-gray-200' },
  'in-progress': { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  done: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
}

const priorityDot = {
  low: 'bg-green-500',
  medium: 'bg-yellow-500',
  high: 'bg-red-500',
}

function TaskCardRedux({ task }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()                  // ← add
  const { id, title, description, status, priority } = task
  const s = statusStyles[status] || statusStyles['todo']

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        {/* Title now links to detail page */}
        <h3
          onClick={() => navigate(`/tasks/${id}`)}
          className="font-semibold text-gray-800 text-base cursor-pointer hover:text-purple-600 transition-colors"
        >
          {title}
        </h3>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs px-2 py-1 rounded-full font-medium border ${s.bg} ${s.text} ${s.border}`}>
            {status}
          </span>
          <button
            onClick={() => dispatch(deleteTask(id))}
            className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
          >
            ×
          </button>
        </div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${priorityDot[priority]}`}></span>
          <span className="text-xs text-gray-500 font-medium capitalize">{priority} priority</span>
        </div>
        <select
          value={status}
          onChange={(e) => dispatch(updateStatus({ id, status: e.target.value }))}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none focus:border-gray-400 bg-white text-gray-600"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  )
}

export default memo(TaskCardRedux)