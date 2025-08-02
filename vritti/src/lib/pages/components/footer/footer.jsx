import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './footer.css';

const Footer = () => {
  const [openSection, setOpenSection] = useState(null);

  const sections = [
    {
      title: 'Product Information',
      content: 'Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance, advanced processing capabilities, and an intuitive user interface designed for both beginners and experts. Available in multiple colors and configurations.',
    },
    {
      title: 'Shipping Details',
      content: 'Shipping is available worldwide. Standard delivery takes 5-7 business days, while express shipping takes 1-3 business days. Free shipping on orders over $50. Track your order with our real-time tracking system. Contact support for international rates.',
    },
    {
      title: 'Return Policy',
      content: 'Returns are accepted within 30 days of purchase. Items must be unused and in original packaging. Contact support at support@yatramitra.com for a return authorization. Refunds are processed within 7-10 business days. Exclusions apply to custom orders.',
    },
  ];

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Inline SVG for the arrow
  const ArrowIcon = ({ isOpen }) => (
    <svg
      style={{
        width: '20px',
        height: '20px',
        transform: isOpen ? 'rotate(180deg)' : 'none',
        transition: 'transform 0.3s ease',
        fill: 'none',
        stroke: 'currentColor',
      }}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  );

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-sections">
          {sections.map((section, index) => (
            <div key={index} className="footer-section">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleSection(index)}
                className={`accordion-title ${openSection === index ? 'active' : ''}`}
                aria-expanded={openSection === index}
                aria-controls={`footer-content-${index}`}
              >
                <span>{section.title}</span>
                <ArrowIcon isOpen={openSection === index} />
              </motion.button>
              <AnimatePresence>
                {openSection === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="accordion-content"
                    id={`footer-content-${index}`}
                  >
                    <p>{section.content}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
        <div className="footer-extra">
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email: support@yatramitra.com</p>
            <p>Phone: +1-800-555-1234</p>
            <p>Address: 456 Travel Plaza, Horizon City, CA 90210</p>
          </div>
          <div className="footer-section social">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="footer-section newsletter">
            <h3>Subscribe to Newsletter</h3>
            <p>Stay updated with our latest offers and travel tips.</p>
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
        >
          <p>© {new Date().getFullYear()} Yatramitra. All rights reserved.</p>
          <p>Designed with ❤️ by xAI Team</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;