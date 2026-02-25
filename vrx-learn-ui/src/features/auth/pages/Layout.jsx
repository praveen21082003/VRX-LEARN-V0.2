import React from 'react'
import Login from './Login'

function Layout() {
  return (
    <div className="flex h-screen w-full justify-center items-center bg-surface">
      <div className="flex w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden shadow-lg bg-white">
       <div className="md:hidden lg:block relative w-1/2 bg-primary overflow-hidden">

          <img
            src='/src/assets/images/Learning-Illustration.png'
            alt="Background Decor"
            className="absolute top-35 left-[-11%] w-4/5 opacity-16 scale-110 pointer-events-none"
          />

          <img
            src='/src/assets/images/Learning-Illustration.png'
            alt="Login Illustration"
            className="absolute bottom-7 right-1 w-8px h-20px scale-105 object-contain z-10"
          />
          
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center">
          <Login />
        </div>
      </div>
    </div>

  )
}

export default Layout
