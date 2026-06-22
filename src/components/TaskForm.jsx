// import { useState } from 'react'
// import { useTasks } from '../context/TaskContext' 

// const emptyForm = {
//   title: '',
//   description: '',
//   status: 'todo',
//   priority: 'medium',
// }

// function TaskForm() {  // ← remove onAddTask prop
//   const { addTask } = useTasks() // ← get addTask from context
//   const [form, setForm] = useState(emptyForm)
//   const [errors, setErrors] = useState({})

//   // Single handler for ALL inputs — no separate handler per field
//   function handleChange(e) {
//     const { name, value } = e.target
//     setForm((prev) => ({ ...prev, [name]: value }))
//     if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
//   }

//   function validate() {
//     const newErrors = {}
//     if (!form.title.trim()) newErrors.title = 'Title is required'
//     if (!form.description.trim()) newErrors.description = 'Description is required'
//     return newErrors
//   }


//   function handleSubmit(e) {
//     e.preventDefault()
//     const newErrors = validate()
//     if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
//     addTask(form)                                   // ← calls context directly
//     setForm(emptyForm)
//     setErrors({})
//   }

//   return (
//     <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
//       <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h2>

//       <div className="space-y-4">

//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Title
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="What needs to be done?"
//             className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors
//               ${errors.title
//                 ? 'border-red-400 focus:border-red-500'
//                 : 'border-gray-200 focus:border-gray-400'
//               }`}
//           />
//           {errors.title && (
//             <p className="text-xs text-red-500 mt-1">{errors.title}</p>
//           )}
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Description
//           </label>
//           <textarea
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholder="Add some details..."
//             rows={2}
//             className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors resize-none
//               ${errors.description
//                 ? 'border-red-400 focus:border-red-500'
//                 : 'border-gray-200 focus:border-gray-400'
//               }`}
//           />
//           {errors.description && (
//             <p className="text-xs text-red-500 mt-1">{errors.description}</p>
//           )}
//         </div>

//         {/* Status + Priority row */}
//         <div className="flex gap-4">
//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Status
//             </label>
//             <select
//               name="status"
//               value={form.status}
//               onChange={handleChange}
//               className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white"
//             >
//               <option value="todo">Todo</option>
//               <option value="in-progress">In Progress</option>
//               <option value="done">Done</option>
//             </select>
//           </div>

//           <div className="flex-1">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Priority
//             </label>
//             <select
//               name="priority"
//               value={form.priority}
//               onChange={handleChange}
//               className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white"
//             >
//               <option value="low">Low</option>
//               <option value="medium">Medium</option>
//               <option value="high">High</option>
//             </select>
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           onClick={handleSubmit}
//           className="w-full bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition-colors"
//         >
//           Add Task
//         </button>

//       </div>
//     </div>
//   )
// }

// export default TaskForm

import { useState, useRef, useEffect } from 'react'
import { useTasks } from '../context/TaskContext'

const emptyForm = { title: '', description: '', status: 'todo', priority: 'medium' }

function TaskForm() {
  const { addTask } = useTasks()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  // ✅ useRef — points to the actual DOM input element
  const titleRef = useRef(null)

  // Auto-focus on mount
  useEffect(() => {
    titleRef.current.focus()
  }, [])

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
    addTask(form)
    setForm(emptyForm)
    setErrors({})
    titleRef.current.focus()  // ✅ refocus after submit — no re-render needed
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Add New Task</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            ref={titleRef}          // ✅ attach ref to DOM element
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors
              ${errors.title ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-gray-400'}`}
          />
          {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Add some details..."
            rows={2}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors resize-none
              ${errors.description ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-gray-400'}`}
          />
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
          className="w-full bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 transition-colors">
          Add Task
        </button>
      </div>
    </div>
  )
}

export default TaskForm