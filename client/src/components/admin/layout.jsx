import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen container mx-auto " >
      <div className="flex flex-1 flex-col" >
        <main className=" flex-1 flex-col px-4 md:p-6" >
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default AdminLayout