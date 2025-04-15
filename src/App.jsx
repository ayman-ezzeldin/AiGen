import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkAuth } from './store/auth-slice';

import AuthLayout from './components/auth/layout';
import AuthRegister from './pages/auth/register';
import VerifyMailPage from './pages/auth/VerifyMail';
import AuthLogin from './pages/auth/login';
import UserHome from './pages/user/Home';
import UserLayout from './components/user/layout';
import NotFound from './pages/not-found';
import CheckAuth from './components/common/check-auth';
import { Skeleton } from './components/ui/skeleton';
import Simulator from './pages/user/Simulator';
import Blog from './pages/user/Blog'
import BlogPost from './pages/user/BlogPost';
import Community from './pages/user/Community';
import CommunityGroup from './pages/user/CommunityGroup';
import Default from './DefaultPage/Default';
import LearnPage from './pages/user/Components/LearnPage/LearnPage';
import { DatasetPage } from './pages/user/Components/DatasetPage/DatasetPage';
import ModelPage from './pages/user/Components/ModelPage/ModelPage';
import ChatBotpage from './DefaultPage/ChatPage';
import ChatRoom from './pages/user/ChatRoom';


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
          <Route path="verify" element={<VerifyMailPage />} />
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
          <Route path="chatbot" element={<ChatBotpage />} />
          <Route path='simulator' element={<Simulator />} />
          <Route path='community' element={<Community />} />
          <Route path='community/:id' element={<CommunityGroup />} />
          <Route path='blog' element={<Blog />} />
          <Route path='blog/:id' element={<BlogPost />} />
          <Route path='chat' element={<ChatRoom />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
