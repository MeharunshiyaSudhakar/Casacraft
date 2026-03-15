import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    } else {
      setCart([]);
      setWishlist([]);
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data.cart || []);
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/users/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCart(data);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const toggleWishlist = async (productId) => {
    if (!user) {
      alert('Please login to add items to wishlist');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/users/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ productId }),
      });
      const data = await response.json();
      if (response.ok) {
        setWishlist(data);
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const cartCount = (cart || []).reduce((total, item) => total + (item.quantity || 0), 0);
  const cartTotal = (cart || []).reduce((total, item) => total + ((item.product?.price || 0) * (item.quantity || 0)), 0);

  return (
    <StoreContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWishlist, cartCount, cartTotal }}>
      {children}
    </StoreContext.Provider>
  );
};
