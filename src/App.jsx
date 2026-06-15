import React from 'react'
import TaskList from './components/TaskList'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Task Dashboard
      </h1>
      <p className= "text-gray-600 mb-6">Manage your tasks efficiently</p>
      <TaskList />
    </div>
  )
}

export default App