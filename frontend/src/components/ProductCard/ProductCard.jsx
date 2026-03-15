import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import './ProductCard.css';
import { useStore } from '../../context/StoreContext';

const ProductCard = ({ product, index }) => {
    const { addToCart, toggleWishlist, wishlist } = useStore();
    const isWishlisted = React.useMemo(() => {
        if (!wishlist || !Array.isArray(wishlist)) return false;
        const currentId = (product._id || product.id)?.toString();
        if (!currentId) return false;
        return wishlist.some(item => {
            const itemId = (item?._id || item)?.toString();
            return itemId === currentId;
        });
    }, [wishlist, product]);

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product._id || product.id);
    };

    const handleToggleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product._id || product.id);
    };

    return (
        <motion.div
            className="product-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <Link to={`/product/${product._id || product.id}`} className="product-card-link">
                <div className="product-image-container">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-actions">
                        <button 
                            className={`icon-btn-circle ${isWishlisted ? 'active' : ''}`} 
                            title="Add to Wishlist" 
                            onClick={handleToggleWishlist}
                        >
                            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                        <button 
                            className="icon-btn-circle" 
                            title="Add to Cart" 
                            onClick={handleAddToCart}
                        >
                            <ShoppingBag size={18} />
                        </button>
                    </div>
                    {product.isNewProduct && <span className="badge badge-new">New</span>}
                    {product.discount && <span className="badge badge-discount">-{product.discount}%</span>}
                </div>

                <div className="product-info">
                    <h3 className="product-category">{product.category}</h3>
                    <h2 className="product-name">{product.name}</h2>
                    <div className="product-price-row">
                        <span className="product-price">₹{product.price.toFixed(2)}</span>
                        {product.oldPrice && <span className="product-old-price">₹{product.oldPrice.toFixed(2)}</span>}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;
