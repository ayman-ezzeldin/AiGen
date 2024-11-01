import { Routes, Route } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthRegister from './pages/auth/register'
import AuthLogin from './pages/auth/login'
import './App.css'

import NotFound from './pages/not-found'
import CheckAuth from './components/common/check-auth'
import UnauthPage from './pages/unauth-page'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'
import {Skeleton} from './components/ui/skeleton'
function App() {
  
  const {user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(checkAuth())
  },[dispatch])

  if (isLoading) return <Skeleton className="w-[100px] bg-gray-100 h-[20px] rounded-full" />


  return (
    <>
      <div className="flex flex-col overflow-hidden bg-white" >
        <Routes>
          <Route path="/" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              {/* Will add Home page here */}
            </CheckAuth>
          } />

          <Route path="/auth" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
              <AuthLayout />
            </CheckAuth>
          } >
            <Route path="login" element={<AuthLogin />} />
            <Route path="register" element={<AuthRegister />} />
          </Route>

          <Route path="/admin" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            </CheckAuth>
          } 
          >
          
          </Route>

          <Route path="/shop" element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user} >
            </CheckAuth>
          } 
          >


          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/unauth-page" element={<UnauthPage />} />
        </Routes>
      </div>
    </>
  )
}

export default App
