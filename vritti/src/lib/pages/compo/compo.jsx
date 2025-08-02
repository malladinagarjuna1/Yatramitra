import React from 'react';
import { motion } from 'framer-motion';
import './compo.css';

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
              style={{
                backgroundImage: 'url("https://images.pexels.com/photos/1391486/pexels-photo-1391486.jpeg")',
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.div
              className="image-placeholder second-image"
              style={{
                backgroundImage: 'url("https://images.pexels.com/photos/6765302/pexels-photo-6765302.jpeg")',
              }}
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
              Why Choose Our Buses?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              Experience Comfortable, Safe, and Affordable Bus Travel.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Here's why thousands of travelers choose our bus services every day:
            </motion.p>
            <div className="features">
              {[
                'Comfortable Seating',
                'Timely Departures & Arrivals',
                'Affordable Ticket Prices',
                'Real-Time Bus Tracking',
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
                    {feature === 'Comfortable Seating' &&
                      'Enjoy spacious, reclining seats and air-conditioned coaches for a relaxing journey.'}
                    {feature === 'Timely Departures & Arrivals' &&
                      'We value your time – our buses run on accurate schedules with minimal delays.'}
                    {feature === 'Affordable Ticket Prices' &&
                      'Travel across cities without breaking your budget. We offer the best fares guaranteed.'}
                    {feature === 'Real-Time Bus Tracking' &&
                      'Know your bus location at all times with GPS-enabled live tracking on our app.'}
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
