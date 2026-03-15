const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');
const protect = require('../middleware/authMiddleware');

// Get user profile (includes cart and wishlist)
router.get('/profile', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).populate('cart.product wishlist');
    if (user) {
      user.cart = user.cart.filter(item => item.product !== null);
      user.wishlist = user.wishlist.filter(item => item !== null);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/cart', protect, async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const cartItem = user.cart.find(item => item.product && item.product.toString() === productId);

    if (cartItem) {
      cartItem.quantity += (Number(quantity) || 1);
    } else {
      user.cart.push({ product: productId, quantity: Number(quantity) || 1 });
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    const validCart = (updatedUser.cart || []).filter(item => item.product !== null);
    res.json(validCart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/cart/:id', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(item => item.product && item.product.toString() !== req.params.id);
    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('cart.product');
    const validCart = (updatedUser.cart || []).filter(item => item.product !== null);
    res.json(validCart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Toggle wishlist
router.post('/wishlist', protect, async (req, res, next) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const index = user.wishlist.findIndex(id => id && id.toString() === productId);
    console.log(`Toggling wishlist for product: ${productId}. Found at index: ${index}`);
    
    if (index > -1) {
      user.wishlist.splice(index, 1);
    } else {
      user.wishlist.push(productId);
    }

    await user.save();
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    const validWishlist = (updatedUser.wishlist || []).filter(item => item !== null);
    console.log(`Wishlist updated. Valid count: ${validWishlist.length}`);
    res.json(validWishlist);
  } catch (error) {
    console.error('Wishlist error:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
