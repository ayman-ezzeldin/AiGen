import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
          <Navbar />
        <main className=" flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
