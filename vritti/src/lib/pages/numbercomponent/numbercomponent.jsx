import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './numbercomponent.css';

const StatsComponent = () => {
  const [stats, setStats] = useState({
    dailyVisitors: 0,
    passengers: 0,
    trustedCompanies: 0,
  });

  useEffect(() => {
    // Simulate incrementing numbers with animation
    const animateStats = () => {
      setStats({
        dailyVisitors: 1250,
        passengers: 45000,
        trustedCompanies: 35,
      });
    };

    animateStats();
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <div className="stats-container">
      <motion.div
        className="stats-box"
        initial="hidden"
        animate="visible"
        variants={statVariants}
      >
        <div className="stat-item">
          <motion.h3 variants={statVariants}>Daily Visitors</motion.h3>
          <motion.p variants={statVariants}>{stats.dailyVisitors.toLocaleString()}</motion.p>
        </div>
        <div className="stat-item">
          <motion.h3 variants={statVariants}>Passengers</motion.h3>
          <motion.p variants={statVariants}>{stats.passengers.toLocaleString()}</motion.p>
        </div>
        <div className="stat-item">
          <motion.h3 variants={statVariants}>Trusted Companies</motion.h3>
          <motion.p variants={statVariants}>{stats.trustedCompanies}</motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsComponent;