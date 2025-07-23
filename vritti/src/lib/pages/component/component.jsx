import React from 'react';
import { motion } from 'framer-motion';
import './component.css';

const GlassmorphismDiv = () => {
  return (
    <div className="glassmorphism-container">
      <motion.div
        className="glassmorphism-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="image-section">
          <motion.div
            className="image-placeholder"
            style={{ backgroundImage: 'ur[](https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg)' }} // Placeholder for man image
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <motion.div
            className="image-placeholder"
            style={{ backgroundImage: 'ur[](https://images.pexels.com/photos/2033343/pexels-photo-2033343.jpeg)' }} // Placeholder for jet image
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>
        <div className="text-section">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Why Choose JetStratix?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            We Make Private Jet Travel Effortless, Luxurious, and Tailored to Your Needs.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Here's Why JetStratix Is The Preferred Choice for Elite Travelers Worldwide:
          </motion.p>
          <div className="features">
            {['Exclusive Jet Options', 'Personalized Service', 'Global Reach', 'Safety & Trust'].map((feature, index) => (
              <motion.div
                key={feature}
                className="feature"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
              >
                <h3>{feature}</h3>
                <p>
                  {feature === 'Exclusive Jet Options' && 'Gain Access to a Premium Fleet of Private Jets, from Light Jets for Short Trips to Ultra-Long-Range.'}
                  {feature === 'Personalized Service' && 'Gain Access to a Premium Fleet of Private Jets, from Your Journey Should Be Seamless As...'}
                  {feature === 'Global Reach' && 'Your Charter Is Our Top Priority With...'}
                  {feature === 'Safety & Trust' && 'Your Safety Is Our Top Priority With...'}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassmorphismDiv;