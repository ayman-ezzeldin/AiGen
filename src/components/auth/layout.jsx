import { Outlet } from "react-router-dom"

const AuthLayout = () => {
  return (
    <div className="flex justify-center min-h-screen w-full bg-[#F2F2F2] " >
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8" >
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout