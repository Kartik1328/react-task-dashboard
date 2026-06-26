import { memo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteTask, updateStatus } from '../../store/taskSlice'
import type { Task, Status } from '../../types'

// ─── Typing props ────────────────────────────────────────────────
interface TaskCardTypedProps {
  task: Task
  showActions?: boolean   // optional with default
}

const statusStyles: Record<Status, { bg: string; text: string; border: string }> = {
  'todo':        { bg: 'bg-gray-100',  text: 'text-gray-600',  border: 'border-gray-200'  },
  'in-progress': { bg: 'bg-blue-100',  text: 'text-blue-700',  border: 'border-blue-200'  },
  'done':        { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200' },
}
// ↑ Record<Status, ...> means: object where keys are Status values
// TypeScript will error if you miss 'todo', 'in-progress', or 'done'

const priorityDot: Record<string, string> = {
  low:    'bg-green-500',
  medium: 'bg-yellow-500',
  high:   'bg-red-500',
}

// React.FC<Props> = Function Component with Props type
// OR just type the props inline (modern preferred approach)
function TaskCardTyped({ task, showActions = true }: TaskCardTypedProps) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id, title, description, status, priority } = task
  const s = statusStyles[status]

  // TypeScript knows e is React.ChangeEvent<HTMLSelectElement>
  function handleStatusChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    dispatch(updateStatus({ id, status: e.target.value as Status }))
    // "as Status" = type assertion — we know it's valid because select options are Status values
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
      <div className="flex items-start justify-between gap-2">
        <h3
          onClick={() => navigate(`/tasks/${id}`)}
          className="font-semibold text-gray-800 text-base cursor-pointer hover:text-purple-600"
        >
          {title}
        </h3>
        {showActions && (
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-2 py-1 rounded-full font-medium border ${s.bg} ${s.text} ${s.border}`}>
              {status}
            </span>
            <button
              onClick={() => dispatch(deleteTask(id))}
              className="text-gray-300 hover:text-red-400 text-lg leading-none"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <p className="text-sm text-gray-500 mt-1">{description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${priorityDot[priority]}`} />
          <span className="text-xs text-gray-500 capitalize">{priority} priority</span>
        </div>
        <select
          value={status}
          onChange={handleStatusChange}
          className="text-xs border border-gray-200 rounded-lg px-2 py-1 outline-none bg-white"
        >
          <option value="todo">Todo</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
    </div>
  )
}

export default memo(TaskCardTyped)