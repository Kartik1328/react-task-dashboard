import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setFilter } from '../store/taskSlice'
import TaskListRedux from '../components/redux/TaskListRedux'
import TaskFormRHF from '../components/redux/TaskFormRHF'

function TasksPage() {
  const [searchParams] = useSearchParams()
  const dispatch = useDispatch()
  const [activeForm, setActiveForm] = useState('rhf')

  useEffect(() => {
    const filterParam = searchParams.get('filter')
    if (filterParam) dispatch(setFilter(filterParam))
  }, [searchParams, dispatch])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-1">All Tasks</h1>
      <p className="text-sm text-gray-500 mb-6">Manage and track your work</p>

      {/* Toggle between form versions */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveForm('rhf')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
            ${activeForm === 'rhf'
              ? 'bg-green-700 text-white border-green-700'
              : 'bg-white text-gray-600 border-gray-200'}`}
        >
          RHF + Zod form
        </button>
        <button
          onClick={() => setActiveForm('manual')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
            ${activeForm === 'manual'
              ? 'bg-purple-700 text-white border-purple-700'
              : 'bg-white text-gray-600 border-gray-200'}`}
        >
          Manual form (old)
        </button>
      </div>

      {/* Show selected form, hide TaskListRedux's built-in form */}
      {activeForm === 'rhf' && <TaskFormRHF />}

      <TaskListRedux hideForm={activeForm === 'rhf'} />
    </div>
  )
}

export default TasksPage