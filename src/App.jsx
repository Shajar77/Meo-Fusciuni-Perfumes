import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Perfumes from './pages/Perfumes'
import Brand from './pages/Brand'
import Contact from './pages/Contact'
import PerfumeDetail from './pages/PerfumeDetail'
import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import OrderConfirmation from './pages/OrderConfirmation'
import Profile from './pages/Profile'
import MyOrders from './pages/MyOrders'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProducts from './pages/admin/AdminProducts'
import AdminOrders from './pages/admin/AdminOrders'
import AdminUsers from './pages/admin/AdminUsers'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path='/' element={<Home />} />
            <Route path='/Perfumes' element={<Perfumes />} />
            <Route path='/Brand' element={<Brand />} />
            <Route path='/Contact' element={<Contact />} />
            <Route path='/perfume/:id' element={<PerfumeDetail />} />
            <Route path='/checkout/:id' element={<Checkout />} />
            <Route path='/login' element={<Login />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order-confirmation' element={<OrderConfirmation />} />

            {/* User Protected Routes */}
            <Route path='/profile' element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path='/orders' element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            } />

            {/* Admin Routes (Protected) */}
            <Route path='/admin' element={
              <ProtectedRoute requireAdmin={true}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path='/admin/products' element={
              <ProtectedRoute requireAdmin={true}>
                <AdminProducts />
              </ProtectedRoute>
            } />
            <Route path='/admin/orders' element={
              <ProtectedRoute requireAdmin={true}>
                <AdminOrders />
              </ProtectedRoute>
            } />
            <Route path='/admin/users' element={
              <ProtectedRoute requireAdmin={true}>
                <AdminUsers />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
