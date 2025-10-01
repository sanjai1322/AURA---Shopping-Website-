import React, { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CategoryNav from './components/CategoryNav';
import { CartProvider } from './hooks/useCart';
import { WishlistProvider } from './hooks/useWishlist';
import { ThemeProvider } from './hooks/useTheme';
import { ToastProvider } from './hooks/useToast';
import ToastContainer from './components/ToastContainer';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'));
const OrderTracking = lazy(() => import('./pages/OrderTracking'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));


const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-[var(--focus-ring-color)]"></div>
  </div>
);

const PageLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const showCategoryNav = location.pathname.startsWith('/shop') || location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
            <Navbar />
            {showCategoryNav && <CategoryNav />}
            <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
                 <Suspense fallback={<LoadingFallback />}>
                    {children}
                </Suspense>
            </main>
            <Footer />
            <ToastContainer />
        </div>
    );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <WishlistProvider>
          <CartProvider>
            <Router>
              <PageLayout>
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/shop" element={<Shop />} />
                      <Route path="/shop/:category" element={<Shop />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/order-success" element={<OrderSuccess />} />
                      <Route path="/track-order" element={<OrderTracking />} />
                      <Route path="/track-order/:orderId" element={<OrderTracking />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                  </Routes>
               </PageLayout>
            </Router>
          </CartProvider>
        </WishlistProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;