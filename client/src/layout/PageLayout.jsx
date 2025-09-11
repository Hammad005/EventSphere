import Navbar from '@/components/Navbar'
import Contact from '@/pages/sub-components/Contact'
import React from 'react'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <>
    <Navbar/>
    <div className='grid grid-cols-12'>
        <div className='lg:col-span-3 lg:block hidden'>
            <Contact/>
        </div>
        <div className='lg:col-span-9 col-span-12'>
            <Outlet/>
        </div>
    </div>
    </>
  )
}

export default PageLayout