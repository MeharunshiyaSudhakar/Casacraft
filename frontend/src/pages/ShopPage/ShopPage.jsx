import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Filter, ChevronDown, Check } from 'lucide-react';
import './ShopPage.css';

const ShopPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filters
    const [activeCategory, setActiveCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        // Fetch products from backend
        const fetchProducts = async () => {
            try {
                setLoading(true);
                // Using localhost:5000 temporarily. Will need a proxy or env var for production.
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (err) {
                console.error("Error fetching products:", err.message);
                setError('Failed to connect to the store database. Please check your connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const categories = ['All', 'Decor', 'Textiles', 'Furniture', 'Home Fragrance', 'Art', 'Storage', 'Lighting', 'Kitchen'];

    // Filter products
    const filteredProducts = products.filter(product => {
        if (activeCategory === 'All') return true;
        return product.category === activeCategory;
    });

    // Sort products
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case 'price-low': return a.price - b.price;
            case 'price-high': return b.price - a.price;
            case 'newest': return (a.isNewProduct ? -1 : 1);
            default: return 0;
        }
    });

    const handleSeedData = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/products/seed', { method: 'POST' });
            const data = await res.json();
            alert(data.message);
            window.location.reload();
        } catch (err) {
            alert('Failed to seed data. Make sure backend and mongodb are running.');
        }
    }

    return (
        <div className="shop-page">
            {/* Shop Header */}
            <div className="shop-header">
                <div className="container">
                    <motion.h1
                        className="shop-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        The Collection
                    </motion.h1>
                    <motion.p
                        className="shop-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Curated essentials for a minimalist lifestyle.
                    </motion.p>
                </div>
            </div>

            <div className="shop-container container">
                {error && (
                    <div className="system-notice">
                        {error}
                        <button onClick={handleSeedData} className="btn-secondary" style={{ padding: '5px 10px', fontSize: '0.8rem', marginLeft: '10px' }}>Force Seed DB</button>
                    </div>
                )}

                <div className="shop-layout">
                    {/* Sidebar */}
                    <aside className="shop-sidebar">
                        <div className="sidebar-section">
                            <h3 className="sidebar-title">Categories</h3>
                            <ul className="category-list">
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                            onClick={() => setActiveCategory(cat)}
                                        >
                                            {cat}
                                            {activeCategory === cat && <Check size={16} />}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="shop-content">
                        {/* Toolbar */}
                        <div className="shop-toolbar">
                            <div className="results-count">
                                Showing {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'}
                            </div>

                            <div className="sort-dropdown">
                                <span className="sort-label">Sort by:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="sort-select"
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                </select>
                                <ChevronDown size={16} className="sort-icon" />
                            </div>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="loading-state">Loading beautiful things...</div>
                        ) : sortedProducts.length === 0 ? (
                            <div className="empty-state">
                                <p>No products found in this category.</p>
                                <button className="btn-secondary" onClick={() => setActiveCategory('All')}>
                                    Clear Filters
                                </button>
                            </div>
                        ) : (
                            <div className="shop-products-grid">
                                {sortedProducts.map((product, index) => (
                                    <ProductCard
                                        key={product._id || product.id}
                                        product={{ ...product, id: product._id }}
                                        index={index}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;
