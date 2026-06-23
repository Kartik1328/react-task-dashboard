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

// import { lazy, Suspense } from 'react'
// import TaskStats from './components/TaskStats'

// // ✅ These load only when needed — not in the initial bundle
// const TaskList = lazy(() => import('./components/TaskList'))

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-1">Task Dashboard</h1>
//         <p className="text-gray-500 text-sm mb-6">Manage your work, track progress</p>

//         <TaskStats />

//         {/* ✅ Suspense shows fallback while the lazy component loads */}
//         <Suspense fallback={
//           <div className="text-center py-20 text-gray-400 animate-pulse">
//             Loading dashboard...
//           </div>
//         }>
//           <TaskList />
//         </Suspense>
//       </div>
//     </div>
//   )
// }

// export default App

// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'
// import './index.css'
// import App from './App'
// import { TaskProvider } from './context/TaskContext'
// import store from './store/store'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Provider store={store}>        {/* RTK Provider — wraps everything */}
//       <TaskProvider>                {/* Context still here for reference */}
//         <App />
//       </TaskProvider>
//     </Provider>
//   </StrictMode>,
// )

//TaskProvider is the context API and the store is the redux store.

import { lazy, Suspense } from 'react'
import TaskStats from './components/TaskStats'
import TaskListRedux from './components/redux/TaskListRedux'

const TaskList = lazy(() => import('./components/TaskList'))

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-1">Task Dashboard</h1>
        <p className="text-gray-500 text-sm mb-6">Manage your work, track progress</p>

        <TaskStats />

        {/* Divider showing both approaches */}
        <div className="mb-6 p-3 bg-purple-50 border border-purple-100 rounded-xl">
          <p className="text-xs text-purple-700 font-medium">
            ⚡ Below uses Redux Toolkit — useSelector + useDispatch + createAsyncThunk
          </p>
        </div>
        <TaskListRedux />

        <div className="my-10 border-t border-gray-200 pt-8">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
            <p className="text-xs text-blue-700 font-medium">
              📦 Below uses Context API — useContext + useReducer (kept for reference)
            </p>
          </div>
          <Suspense fallback={<div className="text-center py-10 text-gray-400 animate-pulse">Loading Context version...</div>}>
            <TaskList />
          </Suspense>
        </div>

      </div>
    </div>
  )
}

export default App