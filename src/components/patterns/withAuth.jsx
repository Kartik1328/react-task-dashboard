import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

// HOC that protects a component — redirect if not logged in
function withAuth(WrappedComponent) {
  function WithAuth(props) {
    const { user } = useAuth()
    const location = useLocation()

    if (!user) {
      return <Navigate to="/login" state={{ from: location }} replace />
    }

    // Pass through all original props + inject user
    return <WrappedComponent {...props} user={user} />
  }

  WithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name})`
  return WithAuth
}

export default withAuth