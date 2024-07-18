import { Route, Routes, Link } from 'react-router-dom'
import NotFound from './404'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Bikes from './pages/bikes'
import USer from './pages/user'
import Rentals from './pages/rentals'
import Payments from './pages/payments'
import Notifications from './pages/notifications'
import Settings from './pages/settings'
import AuthProvider from './utils/Context'

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
            <Route element={<Login/>} path='/'/>
            <Route element={<Dashboard/>} path='/admin-panel'/>
            <Route element={<Bikes/>} path='/bike-inventory'/>
            <Route element={<Rentals/>} path='/bike-rentals'/>
            <Route element={<USer/>} path='/user-management'/>
            <Route element={<Payments/>} path='/payments'/>
            <Route element={<Notifications/>} path='/notifications'/>
            <Route element={<Settings/>} path='/settings'/>
            <Route element={<NotFound/>} path="*"/>
          </Routes>
      </AuthProvider>
    </>
  )
}

export default App
