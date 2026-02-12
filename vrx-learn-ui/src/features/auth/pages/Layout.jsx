import React from 'react'
import Login from './Login'

function Layout() {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-surface">
      <div className="flex w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden shadow-lg bg-white">
        <div className="w-1/2 bg-primary flex items-center justify-center">
      
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center">
          <Login />
        </div>
      </div>
    </div>

  )
}

export default Layout
