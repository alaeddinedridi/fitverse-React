import { Navigate } from "react-router-dom";
import { selectUser } from '../redux/features/authSlice'
import { useDispatch,useSelector } from 'react-redux'


export const ProtectedRoute = ({ children }) => {
  
  const user = useSelector(selectUser)
  if (user!=null){
    // if user is admin then allow him to visit the page he asked for
    if (user.user.role === "admin") {
      return children;
    }
  }

  // if user is not admin and tries to visit a page he is not allowed to visit, then he is redirected to home page
  return <Navigate to="/" />;
  
};