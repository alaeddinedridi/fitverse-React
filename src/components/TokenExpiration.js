import { Navigate, useNavigate } from "react-router-dom";
import { selectUser,selectisTokenExpired,checkIfTokenExpired,logout } from '../redux/features/authSlice'
import { useDispatch,useSelector } from 'react-redux'
import Cookies from 'js-cookie';
import { useEffect } from "react";

export const TokenExpiration = ({ children }) => {
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  
  const dispatch = useDispatch();
  

  useEffect(() => {
    console.log("inside useeffect of tokenExpiration")
    if (user!=null){
        dispatch(checkIfTokenExpired(user.token))
    }
    
  },[])

  let isTokenExpired = useSelector(selectisTokenExpired)
  console.log("this is the value of isTokenExpired that we got from redux: "+isTokenExpired)
  

  if (user!=null){
    console.log("inside user!=null of tokenExpiration")
    if (!isTokenExpired){
        console.log("inside !isTokenExpired of tokenExpiration")
        return children;
    }else{
        console.log("inside isTokenExpired of tokenExpiration")
        dispatch(logout())
        
    }
  }
  return <Navigate to="/admin/login" />;
  
  
};