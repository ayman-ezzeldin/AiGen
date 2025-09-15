import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";

import AuthLayout from "./components/auth/layout";
import AuthRegister from "./pages/auth/register";
import VerifyMailPage from "./pages/auth/VerifyMail";
import AuthLogin from "./pages/auth/login";
import UserHome from "./pages/user/Home";
import UserLayout from "./components/user/layout";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import { Skeleton } from "./components/ui/skeleton";
import Simulator from "./pages/user/Simulator";
import Blog from "./pages/user/Blog";
import BlogPost from "./pages/user/BlogPost";
import Community from "./pages/user/Community";
import CommunityGroup from "./pages/user/CommunityGroup";
import Default from "./DefaultPage/Default";
import LearnPage from "./pages/user/Components/LearnPage/LearnPage";
import DatasetPage from "./pages/user/Components/DatasetPage/DatasetPage";
import ModelPage from "./pages/user/Components/ModelPage/ModelPage";
import ChatBotpage from "./DefaultPage/ChatPage";
import Profile from "./profile/features/Profile";
import Account from "./profile/features/Account";
import Appearance from "./profile/features/Appearance";
import Notifications from "./profile/features/Notifications";
import Settings from "./profile/features/Settings";
import ProjectList from "./pages/user/Components/ProjectList";
import CreateProject from "./pages/user/Components/CreateProject";
import UsersProfile from "./pages/user/UsersProfile";
import ArchPage from "./pages/user/Components/ArchPage/ArchPage";
import Converter from "./pages/user/Converter";
import ForgetPassword from "./pages/auth/ForgetPassword";
import VerifyPasswordOtp from "./pages/auth/VerifyPasswordOtp";
import NewPassword from "./pages/auth/NewPassword";

function App() {
  const { isAuthenticated, isLoading, isVerified } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  console.log("App isAuthenticated:", isAuthenticated);
  console.log("App isLoading:", isLoading);
  console.log("App isVerified:", isVerified);
  

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading)
    return <Skeleton className="w-[100px] bg-gray-100 h-[20px] rounded-full" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Default />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isVerified={isVerified}> 
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
          <Route path="verify" element={<VerifyMailPage />} />
          <Route path="forgot-password" element={<ForgetPassword />} />
          <Route path="VerifyPasswordOtp" element={<VerifyPasswordOtp />} />
          <Route path="NewPassword" element={<NewPassword />} />
        </Route>

        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} isVerified={isVerified}> 
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<UserHome />} />
          <Route path="converter" element={<Converter />} />
          <Route path="docs" element={<NotFound />} />
          <Route path="dataset" element={<DatasetPage />} />
          <Route path="models" element={<ModelPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="arch" element={<ArchPage />} />
          <Route path="chatbot" element={<ChatBotpage />} />
          <Route path="community" element={<Community />} />
          <Route path="community/:id" element={<CommunityGroup />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:id" element={<BlogPost />} />
          <Route path="settings" element={<Settings />}>
            <Route path="profile" element={<Profile />} />
            <Route path="account" element={<Account />} />
            <Route path="appearance" element={<Appearance />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
          <Route path="projects" element={<ProjectList />} />
          <Route path="/user/projects/create" element={<CreateProject />} />
          <Route path="projects/:id" element={<Simulator />} />
          <Route path="projects/edit/:id" element={<Simulator />} />
          <Route path="profile/:username" element={<UsersProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
