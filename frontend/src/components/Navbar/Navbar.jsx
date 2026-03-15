import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Search, Menu, X, User, Heart, LogOut, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { cartCount } = useStore();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length > 2) {
                setIsSearching(true);
                try {
                    const response = await fetch(`http://localhost:5000/api/products/search/${searchQuery}`);
                    const data = await response.json();
                    setSearchResults(data.slice(0, 5));
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setIsSearching(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <motion.header
            className={`navbar ${isScrolled ? 'scrolled shadow-header' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <div className="navbar-container container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    Casa<span>craft</span>
                </Link>

                {/* Desktop Nav */}
                <nav className="desktop-nav">
                    <Link to="/" className="nav-link">Home</Link>
                    <Link to="/shop" className="nav-link">Shop</Link>
                    <Link to="/about" className="nav-link">About Us</Link>
                </nav>

                {/* Icons & Auth */}
                <div className="navbar-actions">
                    <div className="navbar-icons">
                        <button className="icon-btn search-btn" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search size={20} />
                        </button>
                        <Link to="/wishlist" className="icon-btn" title="Wishlist">
                            <Heart size={20} />
                        </Link>
                        <Link to="/cart" className="icon-btn cart-btn">
                            <ShoppingCart size={20} />
                            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                        </Link>
                    </div>

                    <div className="auth-buttons">
                        {user ? (
                            <div className="user-profile">
                                <span className="user-greeting">Hi, {user.name.split(' ')[0]}</span>
                                <button onClick={handleLogout} className="btn-logout" title="Logout">
                                    <LogOut size={18} /> Logout
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-auth login">Login</Link>
                                <Link to="/signup" className="btn-auth signup">Sign Up</Link>
                            </>
                        )}
                    </div>

                    <button className="icon-btn mobile-menu-btn" onClick={() => setMobileMenuOpen(true)}>
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Search Overlay */}
            <AnimatePresence>
                {isSearchOpen && (
                    <motion.div 
                        className="search-overlay glass-effect"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                    >
                        <div className="search-container container">
                            <div className="search-input-wrap">
                                <Search size={22} className="search-icon-inner" />
                                <input 
                                    type="text" 
                                    placeholder="Search for furniture, decor, art..." 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                                <button className="close-search" onClick={() => setIsSearchOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            {searchResults.length > 0 && (
                                <div className="search-results">
                                    {searchResults.map((product) => (
                                        <Link 
                                            to={`/product/${product._id}`} 
                                            key={product._id} 
                                            className="search-result-item"
                                            onClick={() => setIsSearchOpen(false)}
                                        >
                                            <img src={product.image} alt={product.name} />
                                            <div className="result-info">
                                                <h4>{product.name}</h4>
                                                <p>{product.category} • ₹{product.price}</p>
                                            </div>
                                        </Link>
                                    ))}
                                    <Link to="/shop" className="view-all-results" onClick={() => setIsSearchOpen(false)}>
                                        View All Products <ArrowRight size={16} />
                                    </Link>
                                </div>
                            )}
                            {searchQuery.length > 2 && searchResults.length === 0 && !isSearching && (
                                <div className="no-results">No products found for "{searchQuery}"</div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="mobile-menu-overlay glass-effect"
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'tween', duration: 0.3 }}
                    >
                        <div className="mobile-menu-header">
                            <span className="navbar-logo">Casa<span>craft</span></span>
                            <button className="icon-btn" onClick={() => setMobileMenuOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="mobile-nav">
                            <Link to="/" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                            <Link to="/shop" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
                            <Link to="/about" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
                            <div className="mobile-auth">
                                {user ? (
                                    <>
                                        <p className="mobile-greeting">Welcome, {user.name}!</p>
                                        <Link to="/cart" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>My Cart ({cartCount})</Link>
                                        <Link to="/wishlist" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Wishlist</Link>
                                        <button className="mobile-link logout-btn" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>Logout</button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/login" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                                        <Link to="/signup" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Sign Up</Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
};

export default Navbar;
