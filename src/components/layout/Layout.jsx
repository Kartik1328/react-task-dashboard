import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-5xl mx-auto p-8">
        <Outlet />    {/* child routes render here */}
      </main>
    </div>
  )
}

export default Layout