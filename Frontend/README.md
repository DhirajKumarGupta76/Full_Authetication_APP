## install vite 
project name choose (.) for project inside a create folder

## import { createBrowserRouter, RouterProvider } from "react-router-dom";
The router's job is to look at the browser URL and decide which React component should be displayed.
is used to create and manage routing/navigation in a React application.

In simple words, it allows your React app to have different pages like:

/              → Home
/login         → Login
/register      → Register
/dashboard     → Dashboard

##  npm i axios 

##  Connect to Backend Signup
 // Handle form submit 
  const handleSubmit =async(e) => {
    e.preventDefault();

    // UI only
    console.log("Signup data:", formData);

    try {
      const res=await axios.post(`http://localhost:8000/user/resister`,formData,{
        headers:{
          "Content-Type":"application/json"
        }
      })
      if(res.data.success){
        navigate('/login')
        toast.success(res.data.message)
      }
    } catch (error) {
      
    }

    // Temporary loading demonstration
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };