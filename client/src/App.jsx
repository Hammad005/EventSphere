import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import PageLayout from './layout/PageLayout'
import Signin from './pages/Signin'
import Signup from './pages/Signup'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/dashboard' element={<Dashboard/>}/>

      <Route element={<PageLayout/>}>
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App