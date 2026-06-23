import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { TaskProvider } from './context/TaskContext'
import store from './store/store'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <TaskProvider>
        <App />
      </TaskProvider>
    </Provider>
  </StrictMode>,
)