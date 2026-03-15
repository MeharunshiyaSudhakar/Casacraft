import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import CartPage from './pages/CartPage/CartPage';
import WishlistPage from './pages/WishlistPage/WishlistPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ProductPage from './pages/ProductPage/ProductPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const Placeholder = ({ title }) => (
  <div style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
    <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>{title}</h1>
    <p style={{ color: 'var(--text-secondary)' }}>Coming soon...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="*" element={<Placeholder title="404 Not Found" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
