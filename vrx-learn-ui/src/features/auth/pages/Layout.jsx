import Login from "./Login";

function Layout() {
  return (
    // 'bg-surface' for desktop, 'bg-white' for mobile 
    <div className="flex min-h-screen w-full justify-center items-center bg-[#ffffff] md:bg-surface p-4 lg:p-5 xl:p-5 ">
      {/* Container: Full width on mobile, max-w-4xl on desktop */}

      <div
        className="flex w-full h-full md:h-[95vh] 
                md:max-w-3xl lg:max-w-4xl xl:max-w-7xl 
                2xl:max-w-none 2xl:w-[85%] 2xl:p-0
                rounded-xl overflow-hidden md:shadow-lg bg-white"
      >
        {/* LEFT SECTION: Hidden on mobile (hidden), shown on medium screens and up (md:flex) */}
        <div className="hidden md:block relative w-1/2 bg-primary overflow-hidden">
          <img
            src="/src/assets/images/Learning-Illustration.png"
            alt="Background Decor"
            className="absolute top-35 sm:top-55 lg:top-45 xl:top-35  left-[-11%] w-4/5  opacity-16 scale-110 pointer-events-none  "
          />
          <img
            src="/src/assets/images/Learning-Illustration.png"
            alt="Login Illustration"
            className="absolute bottom-7 right-1 w-8px h-20px scale-105  object-contain z-10"
          />
        </div>

        {/* RIGHT SECTION (The Form): Full width on mobile, half width on desktop */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white py-10">
          <Login />
        </div>
      </div>
    </div>
  );
}

export default Layout;
