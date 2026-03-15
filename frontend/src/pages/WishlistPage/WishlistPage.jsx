import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import './WishlistPage.css';

const WishlistPage = () => {
  const { wishlist } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="empty-wishlist-content"
        >
          <Heart size={64} className="empty-icon" />
          <h2>Your wishlist is empty</h2>
          <p>Save items you love to find them easily later.</p>
          <Link to="/shop" className="btn-primary">
            Start Exploring <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="wishlist-page container">
      <h1 className="page-title">My Wishlist</h1>
      
      <div className="wishlist-grid">
        <AnimatePresence>
          {wishlist.filter(p => p !== null).map((product, index) => (
            <ProductCard key={product._id || index} product={product} index={index} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WishlistPage;
