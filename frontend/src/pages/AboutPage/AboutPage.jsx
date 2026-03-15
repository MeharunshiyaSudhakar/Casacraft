import React from 'react';
import { motion } from 'framer-motion';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page container">
      <motion.div 
        className="about-hero"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Our Studio" className="about-hero-img" />
        <div className="about-hero-overlay">
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Design with Intention
          </motion.h1>
        </div>
      </motion.div>

      <section className="about-content">
        <div className="about-section">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Story</h2>
            <p>Founded in 2026, Casacraft began with a simple observation: our homes are reflections of our inner peace. We set out to curate a collection of objects that don't just fill a space, but enhance it.</p>
            <p>Our philosophy is rooted in minimalism, sustainability, and the believe that fewer, better things lead to a more fulfilling life. We partner with independent artisans and ethical manufacturers to bring you pieces that are as durable as they are beautiful.</p>
          </motion.div>
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1507473885765-e6ed04393482?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Craftsmanship" />
          </motion.div>
        </div>

        <div className="about-section reverse">
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2>Our Commitment</h2>
            <p>Every product in our catalog undergoes a rigorous selection process. We look for timeless design, natural materials, and fair labor practices. When you buy from Casacraft, you're not just buying a product; you're supporting a movement towards conscious consumption.</p>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>100%</h3>
                <p>Sustainable Materials</p>
              </div>
              <div className="stat-item">
                <h3>50+</h3>
                <p>Artisan Partners</p>
              </div>
              <div className="stat-item">
                <h3>24/7</h3>
                <p>Dedicated Support</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Sustainable Living" />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
