import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useSelector } from 'react-redux'
import { selectTaskStats } from '../../store/selectors'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const stats = useSelector(selectTaskStats)

  function handleLogout() {
    logout()
    navigate('/login')
  }

  const links = [
    { to: '/', label: 'Dashboard' },
    { to: '/tasks', label: `Tasks (${stats.total})` },
    { to: '/about', label: 'About' },
    { to: '/advanced', label: 'Advanced Hooks' },
    { to: '/patterns', label: 'Patterns' },
    { to: '/typescript', label: 'TypeScript' },
  ]

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-8">
        <span className="font-bold text-gray-800 text-base">TaskDash</span>
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${location.pathname === link.to
                  ? 'bg-gray-100 text-gray-800'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-500">
            👋 <span className="font-medium text-gray-700">{user.username}</span>
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar