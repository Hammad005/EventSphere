import React, { useEffect } from 'react'

const Dashboard = () => {
  useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    }, [])
  return (
    <>Dashboard</>
  )
}

export default Dashboard