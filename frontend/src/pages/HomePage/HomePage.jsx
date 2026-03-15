import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import CategoryBanner from '../../components/CategoryBanner/CategoryBanner';
import ProductCard from '../../components/ProductCard/ProductCard';
import './HomePage.css';
import { motion } from 'framer-motion';

const HomePage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                const data = await response.json();
                setProducts(data.slice(0, 4));
            } catch (error) {
                console.error('Error fetching featured products:', error);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <div className="home-page">
            <Hero />
            <CategoryBanner />

            <section className="featured-section container">
                <div className="section-header">
                    <h2 className="section-title">New Arrivals</h2>
                    <motion.a
                        href="/shop"
                        className="view-all-link"
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400 }}
                    >
                        View All Products
                    </motion.a>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <ProductCard key={product._id} product={product} index={index} />
                    ))}
                </div>
            </section>

            <section className="story-section container">
                <motion.div
                    className="story-content"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="story-subtitle">Our Philosophy</span>
                    <h2 className="story-title">Curated for the intentional home</h2>
                    <p className="story-text">
                        We believe that the objects we surround ourselves with matter. Every item in our collection is thoughtfully
                        selected for its timeless design, sustainable materials, and ability to bring a sense of calm to your daily life.
                    </p>
                    <a href="/about" className="btn-secondary">Read Our Story</a>
                </motion.div>
            </section>
        </div>
    );
};

export default HomePage;
