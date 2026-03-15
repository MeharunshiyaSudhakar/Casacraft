import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './CategoryBanner.css';

const categories = [
    {
        title: 'Premium Furniture',
        image: '/images/categories/furniture.png',
        link: '/shop'
    },
    {
        title: 'Earthy Textiles',
        image: '/images/categories/textiles.png',
        link: '/shop'
    },
    {
        title: 'Wall Art',
        image: '/images/categories/art.png',
        link: '/shop'
    }
];

const CategoryBanner = () => {
    return (
        <section className="categories-section container">
            <h2 className="section-title">Shop by Category</h2>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <Link to={category.link} key={index}>
                        <motion.div
                            className="category-card"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                        >
                            <div className="category-image-wrap">
                                <img src={category.image} alt={category.title} className="category-img" />
                                <div className="category-overlay"></div>
                            </div>
                            <div className="category-content">
                                <h3 className="category-title">{category.title}</h3>
                                <span className="category-link">Explore Collection</span>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryBanner;
