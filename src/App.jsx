import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import GrainOverlay from './components/GrainOverlay'
import ErrorBoundary from './components/ErrorBoundary'
import MainLayout from './components/MainLayout'
import AdminLayout from './components/AdminLayout'

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'))
const Perfumes = lazy(() => import('./pages/Perfumes'))
const Brand = lazy(() => import('./pages/Brand'))
const Contact = lazy(() => import('./pages/Contact'))
const PerfumeDetail = lazy(() => import('./pages/PerfumeDetail'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Login = lazy(() => import('./pages/Login'))
const Favorites = lazy(() => import('./pages/Favorites'))
const Cart = lazy(() => import('./pages/Cart'))
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'))
const Profile = lazy(() => import('./pages/Profile'))
const MyOrders = lazy(() => import('./pages/MyOrders'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const AdminProducts = lazy(() => import('./pages/admin/AdminProducts'))
const AdminOrders = lazy(() => import('./pages/admin/AdminOrders'))
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading component for suspense fallback
const PageLoader = () => (
  <div className='w-full h-screen flex items-center justify-center bg-[#0a0a0a]'>
    <div className='text-center'>
      <div className='w-12 h-12 border-4 border-white/20 border-t-[var(--color-gold)] rounded-full animate-spin mx-auto mb-4'></div>
      <p id='font3' className='text-gray-400'>Loading...</p>
    </div>
  </div>
)

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[var(--color-black-primary)]">
          <GrainOverlay />
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <Routes>
              {/* Layout wrapper routes */}
              <Route element={<MainLayout />}>
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

                {/* 404 Not Found - Matches any unmatched route within MainLayout */}
                <Route path='*' element={<NotFound />} />
              </Route>

              {/* Admin Layout Routes */}
              <Route path='/admin' element={
                <ProtectedRoute requireAdmin={true}>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path='products' element={<AdminProducts />} />
                <Route path='orders' element={<AdminOrders />} />
                <Route path='users' element={<AdminUsers />} />
              </Route>
            </Routes>
            </Suspense>
          </ErrorBoundary>
        </div>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
