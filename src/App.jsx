// import React from 'react'
// import TaskList from './components/TaskList'

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-2">
//         Task Dashboard
//       </h1>
//       <p className= "text-gray-600 mb-6">Manage your tasks efficiently</p>
//       <TaskList />
//     </div>
//   )
// }

// export default App

import { lazy, Suspense } from 'react'
import TaskStats from './components/TaskStats'

// ✅ These load only when needed — not in the initial bundle
const TaskList = lazy(() => import('./components/TaskList'))

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">Task Dashboard</h1>
        <p className="text-gray-500 text-sm mb-6">Manage your work, track progress</p>

        <TaskStats />

        {/* ✅ Suspense shows fallback while the lazy component loads */}
        <Suspense fallback={
          <div className="text-center py-20 text-gray-400 animate-pulse">
            Loading dashboard...
          </div>
        }>
          <TaskList />
        </Suspense>
      </div>
    </div>
  )
}

export default App