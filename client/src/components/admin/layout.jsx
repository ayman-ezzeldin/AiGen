import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen w-full" >
      <div className="flex flex-1 flex-col" >
        <main className=" flex-1 flex=col bg-red-700 px-4 md:p-6" >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout