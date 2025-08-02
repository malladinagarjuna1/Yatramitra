import React from 'react';
import { motion } from 'framer-motion';
import './componenz.css';

const GlassmorphismDiv = () => {
  return (
    <div className="glassmorphism-container">
      <motion.div
        className="glassmorphism-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="layout-section">
          <div className="image-section">
            <motion.div
              className="image-placeholder first-image"
              style={{ backgroundImage: 'url("https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg")' }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              className="image-placeholder second-image"
              style={{ backgroundImage: 'url("https://images.pexels.com/photos/59523/pexels-photo-59523.jpeg")' }}
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
              Why Choose Our Trains?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              We Make Train Travel Comfortable, Economical, and Convenient.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Here’s Why Millions Prefer Booking Trains With Us:
            </motion.p>
            <div className="features">
              {[
                'Multiple Class Options',
                'Real-Time Availability',
                'Pan-India Connectivity',
                'Seamless Booking Experience'
              ].map((feature, index) => (
                <motion.div
                  key={feature}
                  className="feature"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                >
                  <h3>{feature}</h3>
                  <p>
                    {feature === 'Multiple Class Options' && 'Choose from General, Sleeper, AC, and Executive Classes based on your comfort and budget.'}
                    {feature === 'Real-Time Availability' && 'Check seat availability, train timings, and live PNR status in real-time.'}
                    {feature === 'Pan-India Connectivity' && 'Book trains to 7000+ destinations across India with regional and national coverage.'}
                    {feature === 'Seamless Booking Experience' && 'Enjoy an easy-to-use interface, secure payment, and instant confirmation.'}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default GlassmorphismDiv;
