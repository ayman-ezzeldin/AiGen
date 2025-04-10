import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';

import AuthLayout from './components/auth/layout';
import AuthRegister from './pages/auth/register';
import AuthLogin from './pages/auth/login';
import AdminHome from './pages/admin/Home';
import UserHome from './pages/user/Home';
import AdminLayout from './components/admin/layout';
import UserLayout from './components/user/layout';
import NotFound from './pages/not-found';
import CheckAuth from './components/common/check-auth';
import UnauthPage from './pages/unauth-page';
import { Skeleton } from './components/ui/skeleton';
import './App.css';
import Simulator from './pages/admin/Simulator';
import Blog from './pages/admin/Blog'
import BlogPost from './pages/admin/BlogPost';
import Community from './pages/admin/Community';
import CommunityGroup from './pages/admin/CommunityGroup';
import Default from './DefaultPage/Default';
import LearnPage from './pages/user/Components/LearnPage/LearnPage';
import { DatasetPage } from './pages/user/Components/DatasetPage/DatasetPage';
import ModelPage from './pages/user/Components/ModelPage/ModelPage';
import ChatPage from './DefaultPage/ChatPage';


function App() {
  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[100px] bg-gray-100 h-[20px] rounded-full" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/" element={<Default />} />
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<AdminHome />} />
          <Route path='simulator' element={<Simulator />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/:id' element={<BlogPost />} />
          <Route path='community' element={<Community />} />
          <Route path='community/:id' element={<CommunityGroup />} />
        </Route>

        <Route
          path="/user"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <UserLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<UserHome />} />
          <Route path="docs" element={<NotFound />} />
          <Route path="dataset" element={<DatasetPage />} />
          <Route path="models" element={<ModelPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="chat" element={<ChatPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
}

export default App;
