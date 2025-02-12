import { Outlet } from "react-router-dom";
import Footer from "../../pages/user/Components/Footer";
import Navbar from "../../DefaultPage/component/Navbar";

const UserLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-1 flex-col">
          <Navbar />
        <main className=" flex-1 flex-col px-4 md:p-6 mt-20">
          <Outlet />
          <Footer
            title="Didn't find what you were looking for?"
            buttonLabel="Search On Youtube"
            buttonLink="https://example.com/public-datasets"
          />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
