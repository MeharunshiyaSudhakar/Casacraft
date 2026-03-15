import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../context/StoreContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cart, removeFromCart, addToCart, cartTotal } = useStore();

  if (cart.length === 0) {
    return (
      <div className="empty-cart container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="empty-cart-content"
        >
          <ShoppingBag size={64} className="empty-icon" />
          <h2>Your cart is empty</h2>
          <p>Go to the shop to find something beautiful for your home.</p>
          <Link to="/shop" className="btn-primary">
            Start Shopping <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <h1 className="page-title">Shopping Cart</h1>
      
      <div className="cart-layout">
        <div className="cart-items">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div 
                key={item.product._id} 
                className="cart-item glass-effect"
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="item-image">
                  <img src={item.product.image} alt={item.product.name} />
                </div>
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p className="item-category">{item.product.category}</p>
                  <p className="item-price">₹{item.product.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => addToCart(item.product._id, -1)} disabled={item.quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => addToCart(item.product._id, 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <div className="item-total">
                  <p>₹{(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
                <button 
                  className="remove-btn" 
                  onClick={() => removeFromCart(item.product._id)}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div 
          className="cart-summary glass-effect"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{cartTotal.toFixed(2)}</span>
          </div>
          <button className="btn-primary checkout-btn" onClick={() => alert('Checkout functionality coming soon!')}>
            Proceed to Checkout
          </button>
          <Link to="/shop" className="continue-link">
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;
