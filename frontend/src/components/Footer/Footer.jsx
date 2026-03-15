import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <motion.div
                        className="footer-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3 className="footer-logo">Casa<span>craft</span></h3>
                        <p className="footer-desc">
                            Your destination for minimalist essentials, blending beautiful earth aesthetics with everyday practicality.
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-icon"><Facebook size={20} /></a>
                            <a href="#" className="social-icon"><Twitter size={20} /></a>
                            <a href="#" className="social-icon"><Instagram size={20} /></a>
                        </div>
                    </motion.div>

                    <motion.div
                        className="footer-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="footer-title">Quick Links</h4>
                        <ul className="footer-links">
                            <li><a href="/">Home</a></li>
                            <li><a href="/shop">Shop</a></li>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/contact">Contact</a></li>
                            <li><a href="/faq">FAQ</a></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="footer-title">Legal</h4>
                        <ul className="footer-links">
                            <li><a href="/terms">Terms of Service</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/returns">Returns Policy</a></li>
                            <li><a href="/shipping">Shipping Info</a></li>
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-col"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <h4 className="footer-title">Contact Us</h4>
                        <ul className="footer-contact">
                            <li><MapPin size={18} /> <span>Kongu Engineering College</span></li>
                            <li><Phone size={18} /> <span>8973016298</span></li>
                            <li><Mail size={18} /> <span>meharunshiyas26@gmail.com</span></li>
                        </ul>
                    </motion.div>
                </div>

                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                >
                    <p>&copy; {new Date().getFullYear()} Casacraft. All rights reserved.</p>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;
