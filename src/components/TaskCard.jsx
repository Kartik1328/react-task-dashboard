function TaskCard({title,description,priority,status, onDelete}) {

 //these are basically the props that we are passing to the TaskCard component from the TaskList component. 
 // We are also passing the onDelete function as a prop to the TaskCard component so that we can delete the task when the delete button is clicked.
 //they are passed as a functional arguments.

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

const s = statusStyles[status] || statusStyles['todo']


    //both are objects to map the status and priority to their respective colors

    return(
<div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-2">
      <h3 className="font-semibold text-gray-800 text-base">{title}</h3>
        <div className="flex items-center gap-2 shrink-0">

      <span className={`text-xs px-2 py-1 rounded-full font-medium border ${s.bg} ${s.text} ${s.border}`}>
        {status}
      </span>
          <button
      onClick={onDelete}
      className="text-gray-300 hover:text-red-400 transition-colors text-lg leading-none"
    >
      ×
    </button>
      </div>

    </div>

    <p className="text-sm text-gray-500 mt-1">{description}</p>

    <div className="mt-3 flex items-center gap-2">
      <span className={`w-2 h-2 rounded-full ${priorityDot[priority]}`}></span>
      <span className="text-xs text-gray-500 font-medium capitalize">{priority} priority</span>
    </div>
  </div>  
    )
}

export default TaskCard;