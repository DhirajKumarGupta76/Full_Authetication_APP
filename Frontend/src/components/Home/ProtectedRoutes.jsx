import { getData } from '@/Context/UserContext'
import React, { Children } from 'react'
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({children}) => {
    const {user}=getData()
  return (
    <div>
        {
            user ? children: <Navigate to={"/login"} replace />
        }
    </div>
  )
}

export default ProtectedRoutes