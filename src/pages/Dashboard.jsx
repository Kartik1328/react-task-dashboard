import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectTaskStats } from '../store/selectors'
import { useAuth } from '../context/AuthContext'
import TaskStats from '../components/TaskStats'

function Dashboard() {
  const navigate = useNavigate()
  const stats = useSelector(selectTaskStats)
  const { user } = useAuth()

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Good morning, {user?.username} 👋
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          You have{' '}
          <span className="font-medium text-gray-700">{stats.todo} tasks</span>{' '}
          pending and{' '}
          <span className="font-medium text-green-600">{stats.done} completed</span>
        </p>
      </div>

      <TaskStats />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-1">Quick actions</h2>
          <p className="text-sm text-gray-500 mb-4">Jump to what you need</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => navigate('/tasks')}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              → View all tasks
            </button>
            <button
              onClick={() => navigate('/tasks?filter=todo')}
              className="w-full text-left px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
            >
              → View pending tasks
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <h2 className="font-semibold text-gray-800 mb-1">Progress</h2>
          <p className="text-sm text-gray-500 mb-4">Overall completion</p>
          {stats.total > 0 && (
            <>
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>{stats.done} of {stats.total} done</span>
                <span className="font-medium">
                  {Math.round((stats.done / stats.total) * 100)}%
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(stats.done / stats.total) * 100}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard