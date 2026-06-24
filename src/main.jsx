import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import './index.css'
import store from './store/store'
import { TaskProvider } from './context/TaskContext'
import { AuthProvider } from './context/AuthContext'

import Layout from './components/layout/Layout'
import ProtectedRoute from './components/layout/ProtectedRoute'

import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TasksPage from './pages/TasksPage'
import TaskDetailPage from './pages/TaskDetailPage'
import AboutPage from './pages/AboutPage'
import PatternsPage from './pages/PatternsPage'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <TaskProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>

              {/* Public route — no auth needed */}
              <Route path="/login" element={<LoginPage />} />

              {/* Layout route — Navbar wraps all child routes */}
              <Route element={<Layout />}>

                {/* Protected routes — redirect to /login if not logged in */}
                <Route path="/" element={
                  <ProtectedRoute><Dashboard /></ProtectedRoute>
                } />
                <Route path="/tasks" element={
                  <ProtectedRoute><TasksPage /></ProtectedRoute>
                } />
                <Route path="/tasks/:id" element={
                  <ProtectedRoute><TaskDetailPage /></ProtectedRoute>
                } />

                {/* Public but inside layout */}
                <Route path="/about" element={<AboutPage />} />

                <Route path="/patterns" element={
  <ProtectedRoute><PatternsPage /></ProtectedRoute>
} />

                {/* 404 */}
                <Route path="*" element={
                  <div className="text-center py-20 text-gray-400">
                    <p className="text-4xl font-bold mb-2">404</p>
                    <p>Page not found</p>
                  </div>
                } />

              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TaskProvider>
    </Provider>
  </StrictMode>,
)