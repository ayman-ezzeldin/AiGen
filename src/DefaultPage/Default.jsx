import "./root.css";
import "./App.css";
import Navbar from "../components/admin/navbar";
import UserHome from "../pages/user/Home";

function Default() {
  return (
    <div>
      <Navbar />
      <UserHome />
    </div>
  );
}

export default Default;
