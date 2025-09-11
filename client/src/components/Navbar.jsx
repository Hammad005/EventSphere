import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import ModeToggle from './ModeToggle'

const Navbar = () => {
  return (
    <nav className='w-full p-4 flex items-center justify-between sticky top-0 z-50'>
        <div></div>
        <div className='flex items-center gap-3'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            <Link to='/events'>Events</Link>
            <Link to='/gallery'>Gallery</Link>

<ModeToggle/>
            <Button>Dashboard</Button>
            <Button>Sign in</Button>
        </div>
    </nav>
  )
}

export default Navbar