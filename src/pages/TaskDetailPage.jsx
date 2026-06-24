import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllTasks, updateStatus, deleteTask } from '../store/taskSlice'

const statusStyles = {
  todo: 'bg-gray-100 text-gray-700',
  'in-progress': 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
}

function TaskDetailPage() {
  const { id } = useParams()           // reads :id from URL
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tasks = useSelector(selectAllTasks)

  // Find the task by id — useParams always returns strings so convert
  const task = tasks.find((t) => t.id === Number(id) || t.id === id)

  if (!task) return (
    <div className="text-center py-20">
      <p className="text-lg text-gray-400">Task not found</p>
      <button
        onClick={() => navigate('/tasks')}
        className="mt-4 text-sm text-blue-500 hover:underline"
      >
        ← Back to tasks
      </button>
    </div>
  )

  function handleDelete() {
    dispatch(deleteTask(task.id))
    navigate('/tasks')
  }

  return (
    <div className="max-w-2xl">
      <button
        onClick={() => navigate(-1)}    // -1 = browser back
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 flex items-center gap-1"
      >
        ← Back
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 p-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold text-gray-800">{task.title}</h1>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles[task.status]}`}>
            {task.status}
          </span>
        </div>

        <p className="text-gray-600 mb-8">{task.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Priority</p>
            <p className="font-semibold text-gray-800 capitalize">{task.priority}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500 mb-1">Task ID</p>
            <p className="font-semibold text-gray-800">#{task.id}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Update status
          </label>
          <select
            value={task.status}
            onChange={(e) => dispatch(updateStatus({ id: task.id, status: e.target.value }))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white"
          >
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <button
          onClick={handleDelete}
          className="w-full border border-red-200 text-red-500 rounded-lg py-2 text-sm font-medium hover:bg-red-50 transition-colors"
        >
          Delete task
        </button>
      </div>
    </div>
  )
}

export default TaskDetailPage