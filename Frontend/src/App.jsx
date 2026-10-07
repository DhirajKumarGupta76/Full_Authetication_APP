import React from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'



//The router's job is to look at the browser URL and decide which React component should be displayed.
const router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
   {
    path:"/signup",
    element:<SignUp/>
  },
   {
    path:"/login",
    element:<Login/>
  }


])
const App = () => {
  return (
    <div >
      <RouterProvider router={router}/>

     
    </div>
  )
}

export default App


