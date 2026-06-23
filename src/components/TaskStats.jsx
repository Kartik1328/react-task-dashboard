// import { useMemo } from 'react'
// import { useTasks } from '../context/TaskContext'

// function TaskStats() {
//   const { tasks } = useTasks()

//   // ✅ Only recalculates when tasks array changes
//   const stats = useMemo(() => {
//     return {
//       total: tasks.length,
//       todo: tasks.filter((t) => t.status === 'todo').length,
//       inProgress: tasks.filter((t) => t.status === 'in-progress').length,
//       done: tasks.filter((t) => t.status === 'done').length,
//       highPriority: tasks.filter((t) => t.priority === 'high').length,
//     }
//   }, [tasks])

//   const cards = [
//     { label: 'Total', value: stats.total, color: 'text-gray-800', bg: 'bg-gray-50' },
//     { label: 'Todo', value: stats.todo, color: 'text-gray-600', bg: 'bg-gray-50' },
//     { label: 'In Progress', value: stats.inProgress, color: 'text-blue-600', bg: 'bg-blue-50' },
//     { label: 'Done', value: stats.done, color: 'text-green-600', bg: 'bg-green-50' },
//     { label: 'High Priority', value: stats.highPriority, color: 'text-red-600', bg: 'bg-red-50' },
//   ]

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
//       {cards.map((card) => (
//         <div key={card.label} className={`${card.bg} rounded-xl p-4 border border-gray-100`}>
//           <p className="text-xs text-gray-500 font-medium">{card.label}</p>
//           <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default TaskStats

import { useSelector } from 'react-redux'
import { selectTaskStats } from '../store/selectors'

function TaskStats() {
  // createSelector handles memoization at store level — no useMemo needed
  const stats = useSelector(selectTaskStats)

  const cards = [
    { label: 'Total', value: stats.total, color: 'text-gray-800', bg: 'bg-gray-50' },
    { label: 'Todo', value: stats.todo, color: 'text-gray-600', bg: 'bg-gray-50' },
    { label: 'In Progress', value: stats.inProgress, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Done', value: stats.done, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'High Priority', value: stats.highPriority, color: 'text-red-600', bg: 'bg-red-50' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
      {cards.map((card) => (
        <div key={card.label} className={`${card.bg} rounded-xl p-4 border border-gray-100`}>
          <p className="text-xs text-gray-500 font-medium">{card.label}</p>
          <p className={`text-2xl font-bold mt-1 ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  )
}

export default TaskStats