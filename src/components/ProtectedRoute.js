import { Navigate } from "react-router-dom";
import { selectUser } from '../redux/features/authSlice'
import { useDispatch,useSelector } from 'react-redux'


export const ProtectedRoute = ({ children }) => {
  
  const user = useSelector(selectUser)
  if (user!=null){
    if (user.user.role === "admin") {
      return children;
    }
  }
  return <Navigate to="/" />;
  
};