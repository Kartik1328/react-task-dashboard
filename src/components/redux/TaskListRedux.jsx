import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectFilteredTasks,
  selectFilter,
  selectStatus,
  selectError,
  setFilter,
  fetchTasksFromAPI,
} from '../../store/taskSlice'
import TaskCardRedux from './TaskCardRedux'
import TaskFormRedux from './TaskFormRedux'
import SearchBar from './SearchBar'            // ← add
import ScrollStats from './ScrollStats'        // ← add

const filters = ['all', 'todo', 'in-progress', 'done']

function TaskListRedux() {
  const dispatch = useDispatch()
  const filteredTasks = useSelector(selectFilteredTasks)
  const activeFilter = useSelector(selectFilter)
  const status = useSelector(selectStatus)
  const error = useSelector(selectError)

  useEffect(() => {
    if (status === 'idle') dispatch(fetchTasksFromAPI())
  }, [status, dispatch])

  if (status === 'loading') return (
    <div className="text-center py-20 text-gray-400">
      <p className="text-lg animate-pulse">Loading via Redux thunk...</p>
    </div>
  )

  if (status === 'failed') return (
    <div className="text-center py-20 text-red-400">
      <p className="text-lg">Redux fetch failed</p>
      <p className="text-sm mt-1">{error}</p>
    </div>
  )

  return (
    <div className="mt-6">
      <TaskFormRedux />
      <ScrollStats />       {/* ← throttle demo */}
      <SearchBar />         {/* ← debounce demo */}

      {/* Filter buttons */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f))}
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

      {filteredTasks.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg">No tasks here</p>
          <p className="text-sm mt-1">Add a task or change the filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCardRedux key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  )
}

export default TaskListRedux