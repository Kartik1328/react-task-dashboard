import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../store/taskSlice'

const emptyForm = { title: '', description: '', status: 'todo', priority: 'medium' }

function TaskFormRedux() {
  const dispatch = useDispatch()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const newErrors = {}
    if (!form.title.trim()) newErrors.title = 'Title is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    return newErrors
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    dispatch(addTask(form))    // dispatch action — slice handles the rest
    setForm(emptyForm)
    setErrors({})
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Add New Task</h2>
        <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">
          via Redux
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange}
            placeholder="What needs to be done?"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors
              ${errors.title ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`} />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}
            placeholder="Add some details..." rows={2}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none resize-none transition-colors
              ${errors.description ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`} />
          {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white">
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
            <select name="priority" value={form.priority} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <button onClick={handleSubmit}
          className="w-full bg-purple-700 text-white rounded-lg py-2 text-sm font-medium hover:bg-purple-800 transition-colors">
          Add Task via Redux
        </button>
      </div>
    </div>
  )
}

export default TaskFormRedux