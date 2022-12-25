import { Navigate, useLocation } from "react-router-dom"

const Authentication = (props) => {
  const { children } = props;
  const location = useLocation();
  if (! localStorage.getItem('google_access_token') && location.pathname !== 'login') {
    return <Navigate to="/login" replace />
  }
  return children;
}

export default Authentication;
