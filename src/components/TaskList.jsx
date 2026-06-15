import TaskCard from './TaskCard'

const sampleTasks = [
  {
    id: 1,
    title: 'Set up project structure',
    description: 'Initialize Vite, Tailwind, and folder structure',
    status: 'done',
    priority: 'high',
  },
  {
    id: 2,
    title: 'Build TaskCard component',
    description: 'Create reusable card with props for title, status, priority',
    status: 'in-progress',
    priority: 'high',
  },
  {
    id: 3,
    title: 'Add task filtering',
    description: 'Filter tasks by status using useState',
    status: 'todo',
    priority: 'medium',
  },
  {
    id: 4,
    title: 'Integrate REST API',
    description: 'Fetch tasks from JSONPlaceholder in useEffect',
    status: 'todo',
    priority: 'low',
  },
]

//created a array of objects

function TaskList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {sampleTasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          status={task.status}
          priority={task.priority}
        />
      ))}
    </div>
  )
}

export default TaskList