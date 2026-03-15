import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import './ProductPage.css';

const ProductPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, toggleWishlist, wishlist } = useStore();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setProduct(data);
                } else {
                    console.error('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
        window.scrollTo(0, 0);
    }, [id]);

    const isWishlisted = React.useMemo(() => {
        if (!wishlist || !Array.isArray(wishlist)) return false;
        const currentId = id?.toString();
        return wishlist.some(item => (item._id || item)?.toString() === currentId);
    }, [wishlist, id]);

    if (loading) return <div className="loading-container">Loading product details...</div>;
    if (!product) return <div className="error-container">Product not found.</div>;

    return (
        <div className="product-page container">
            <button className="back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={18} /> Back
            </button>

            <div className="product-detail-grid">
                <motion.div 
                    className="product-visuals"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="main-image-wrapper">
                        <img src={product.image} alt={product.name} className="main-product-image" />
                        {product.isNewProduct && <span className="detail-badge-new">New Arrival</span>}
                    </div>
                </motion.div>

                <motion.div 
                    className="product-actions-info"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="detail-category">{product.category}</span>
                    <h1 className="detail-name">{product.name}</h1>
                    
                    <div className="detail-price-row">
                        <span className="detail-price">₹{product.price.toFixed(2)}</span>
                        {product.oldPrice && <span className="detail-old-price">₹{product.oldPrice.toFixed(2)}</span>}
                    </div>

                    <p className="detail-description">{product.description}</p>

                    <div className="purchase-controls">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        
                        <div className="main-btns">
                            <button 
                                className="btn-add-cart"
                                onClick={() => addToCart(product._id, quantity)}
                            >
                                <ShoppingBag size={20} /> Add to Cart
                            </button>
                            <button 
                                className={`btn-wishlist-large ${isWishlisted ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product._id)}
                            >
                                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                            </button>
                        </div>
                    </div>

                    <div className="product-features">
                        <div className="feature-item">
                            <Truck size={20} />
                            <div>
                                <h4>Free Shipping</h4>
                                <p>On orders over ₹1500</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <RefreshCcw size={20} />
                            <div>
                                <h4>30-Day Returns</h4>
                                <p>Hassle-free exchange</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <ShieldCheck size={20} />
                            <div>
                                <h4>Authentic Guarantee</h4>
                                <p>Curated minimalist quality</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductPage;
