import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch } from 'react-redux'
import { addTask } from '../../store/taskSlice'
import { taskSchema, taskDefaults } from '../../schemas/taskSchema'

function TaskFormRHF() {
  const dispatch = useDispatch()

  const {
    register,           // connects input to RHF
    handleSubmit,       // wraps your submit fn with validation
    formState: { errors, isSubmitting, isDirty, touchedFields },
    reset,              // resets form to defaults
    watch,              // watch field values in real time
  } = useForm({
    resolver: zodResolver(taskSchema),   // plug Zod into RHF
    defaultValues: taskDefaults,
    mode: 'onTouched',  // validate field when user leaves it (onBlur)
  })

  // watch title to show character count
  const titleValue = watch('title')

  function onSubmit(data) {
    // data is already validated and typed by Zod
    // data = { title: '...', description: '...', status: '...', priority: '...' }
    dispatch(addTask(data))
    reset()  // clear form after successful submit
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Add New Task</h2>
        <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
          React Hook Form + Zod
        </span>
      </div>

      <div className="space-y-4">

        {/* Title */}
        <div>
          <div className="flex justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            {/* Character count — powered by watch() */}
            <span className={`text-xs ${
              (titleValue?.length || 0) > 80 ? 'text-red-500' : 'text-gray-400'
            }`}>
              {titleValue?.length || 0}/100
            </span>
          </div>
          <input
            {...register('title')}
            type="text"
            placeholder="What needs to be done?"
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors
              ${errors.title
                ? 'border-red-400 bg-red-50 focus:border-red-500'
                : 'border-gray-200 focus:border-gray-400'
              }`}
          />
          {/* Error message comes directly from Zod schema */}
          {errors.title && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <span>⚠</span> {errors.title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            {...register('description')}
            placeholder="Add some details... (min 10 characters)"
            rows={3}
            className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-colors resize-none
              ${errors.description
                ? 'border-red-400 bg-red-50 focus:border-red-500'
                : 'border-gray-200 focus:border-gray-400'
              }`}
          />
          {errors.description && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <span>⚠</span> {errors.description.message}
            </p>
          )}
        </div>

        {/* Status + Priority */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              {...register('status')}
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white transition-colors
                ${errors.status ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && (
              <p className="text-xs text-red-500 mt-1">{errors.status.message}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              {...register('priority')}
              className={`w-full border rounded-lg px-3 py-2 text-sm outline-none bg-white transition-colors
                ${errors.priority ? 'border-red-400' : 'border-gray-200 focus:border-gray-400'}`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            {errors.priority && (
              <p className="text-xs text-red-500 mt-1">{errors.priority.message}</p>
            )}
          </div>
        </div>

        {/* Form state indicators — useful for learning */}
        <div className="flex gap-3 text-xs text-gray-400">
          <span className={isDirty ? 'text-orange-500' : ''}>
            {isDirty ? '● unsaved changes' : '○ no changes'}
          </span>
          <span>
            Touched: {Object.keys(touchedFields).join(', ') || 'none'}
          </span>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          className="w-full bg-green-700 text-white rounded-lg py-2 text-sm font-medium
            hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Adding...' : 'Add Task (RHF + Zod)'}
        </button>

      </div>
    </div>
  )
}

export default TaskFormRHF