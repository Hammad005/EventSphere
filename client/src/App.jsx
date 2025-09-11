import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import PageLayout from './layout/PageLayout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { Toaster } from 'sonner'
import { useAuthStore } from './store/useAuthStore';
import Loading from './components/Loading';

const protectedRoutes = (condition, children, navigate) => {
  return condition ? children : <Navigate to={navigate} />
};
const App = () => {
  const {authLoading, user, checkAuth} = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])
  

  if (authLoading) return <Loading/>
  return (
    <>
    <Routes>
      <Route path='/dashboard' element={
        protectedRoutes(user, <Dashboard/>, "/signin")
      }/>

      <Route element={<PageLayout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={
        protectedRoutes(!user, <Signin/>, "/")
      }/>
      <Route path='/signup' element={
        protectedRoutes(!user, <Signup/>, "/")
      }/>
      </Route>
    </Routes>
    <Toaster/>
    </>
  )
}

export default App